import { NextRequest, NextResponse } from "next/server";

import { createOpenAI } from "@ai-sdk/openai";
import {
  EmbeddingModel,
  InvalidToolArgumentsError,
  NoSuchToolError,
  ToolExecutionError,
  embed,
  streamText,
  tool,
} from "ai";
import { initLogger, traced } from "braintrust";
import { z } from "zod";

import { createCachedDocsLoader } from "@fern-api/docs-loader";
import { postToSlack } from "@fern-api/docs-server";
import { track } from "@fern-api/docs-server/analytics/posthog";
import { safeVerifyFernJWTConfig } from "@fern-api/docs-server/auth/FernJWT";
import {
  openaiApiKey,
  turbopufferApiKey,
} from "@fern-api/docs-server/env-variables";
import { isLocal } from "@fern-api/docs-server/isLocal";
import { isSelfHosted } from "@fern-api/docs-server/isSelfHosted";
import { getDocsDomainEdge } from "@fern-api/docs-server/xfernhost/edge";
import { withoutStaging } from "@fern-api/docs-utils";
import { getAuthEdgeConfig, getEdgeFlags } from "@fern-docs/edge-config";
import {
  buildCustomConfig,
  convertTpufRecordsToDocuments,
  createChatSystemPrompt,
  getLanguageModel,
  queryTurbopuffer,
} from "@fern-docs/search-ask-fern";

import { getFernToken } from "@/app/fern-token";

export const maxDuration = 60;
export const revalidate = 0;

export async function POST(req: NextRequest) {
  if (isLocal() || isSelfHosted()) {
    return NextResponse.json(
      "Ask Fern is not available in local preview mode or self-hosted mode",
      { status: 400 }
    );
  }
  const host = req.nextUrl.host;
  const domain = getDocsDomainEdge(req);
  const loader = await createCachedDocsLoader(host, domain);
  const metadata = await loader.getMetadata();
  if (metadata == null) {
    return NextResponse.json("Not found", { status: 404 });
  }
  if (metadata.isPreview) {
    return NextResponse.json("Chat is not enabled for preview environments", {
      status: 404,
    });
  }

  const [authEdgeConfig, edgeFlags] = await Promise.all([
    getAuthEdgeConfig(domain),
    getEdgeFlags(domain),
  ]);

  if (!edgeFlags.isAskAiEnabled) {
    return NextResponse.json("Ask AI is not enabled for this domain", {
      status: 404,
    });
  }

  initLogger({
    projectName: "Braintrust Evaluation",
    apiKey: process.env.BRAINTRUST_API_KEY,
  });

  const { messages, url, source, conversationId } = await req.json();
  const config = await loader.getConfig();

  const customConfig = buildCustomConfig(url);
  const chatSource = source ?? "chat"; // distinguish between chat and mcp server request

  const languageModel = getLanguageModel(config.aiChatConfig?.model);
  const openai = createOpenAI({ apiKey: openaiApiKey() });
  const embeddingModel = openai.embedding("text-embedding-3-large");

  const start = Date.now();

  const namespace = `${withoutStaging(domain)}_${embeddingModel.modelId}`;
  const fernToken = await getFernToken();
  const user = await safeVerifyFernJWTConfig(fernToken, authEdgeConfig);
  const lastUserMessage: string | undefined = messages.findLast(
    (message: any) => message.role === "user"
  )?.content;

  const searchResults = await runQueryTurbopuffer(lastUserMessage, {
    embeddingModel,
    namespace,
    authed: user != null,
    roles: user?.roles ?? [],
    topK: 3,
  });
  const documents = convertTpufRecordsToDocuments(searchResults).join("\n\n");

  const promptTemplate = config.aiChatConfig?.systemPrompt;
  const systemPrompt = createChatSystemPrompt({
    customConfig,
    domain,
    date: new Date().toDateString(),
    documents,
    promptTemplate,
  });

  return traced(async (span) => {
    span.log({
      metadata: {
        domain,
        source: chatSource,
        conversationId: conversationId,
      },
    });

    const documentIdsToIgnore: string[] = [];
    const result = streamText({
      model: languageModel,
      system: systemPrompt,
      messages,
      maxSteps: 5,
      maxRetries: 3,
      tools: {
        search: tool({
          description:
            "Search the knowledge base for the user's query. Semantic search is enabled.",
          parameters: z.object({
            query: z.string(),
          }),
          async execute({ query }) {
            const response = await runQueryTurbopuffer(query, {
              embeddingModel,
              namespace,
              authed: user != null,
              roles: user?.roles ?? [],
              topK: 5,
              documentIdsToIgnore: documentIdsToIgnore,
            });
            documentIdsToIgnore.push(...response.map((hit) => hit.id));
            return response.map((hit) => {
              const { domain, pathname, hash, chunk } = hit.attributes;
              const url = `https://${domain}${pathname}${hash ?? ""}`;
              if (chunk.length > 20000) {
                return {
                  url,
                  chunk: chunk.slice(0, 20000),
                  ...(hit.attributes as Omit<typeof hit.attributes, "chunk">),
                };
              }
              return { url, ...hit.attributes };
            });
          },
        }),
      },
      onFinish: async (e) => {
        const end = Date.now();
        track("ask_ai", {
          languageModel: languageModel.modelId,
          embeddingModel: embeddingModel.modelId,
          durationMs: end - start,
          domain,
          namespace,
          numToolCalls: e.toolCalls.length,
          finishReason: e.finishReason,
          ...e.usage,
        });
        e.warnings?.forEach((warning) => {
          console.warn(warning);
        });
      },
    });
    const response = result.toDataStreamResponse({
      getErrorMessage: (error) => {
        if (error == null) {
          return "";
        }

        let errorKind = "UnknownError";
        if (NoSuchToolError.isInstance(error)) {
          errorKind = "NoSuchToolError";
        } else if (InvalidToolArgumentsError.isInstance(error)) {
          errorKind = "InvalidToolArgumentsError";
        } else if (ToolExecutionError.isInstance(error)) {
          errorKind = "ToolExecutionError";
        }

        const msg = `encountered a ${errorKind} for query '${lastUserMessage}: ${error}'`;
        console.error(msg);
        postToSlack(
          "#search-notifs",
          `:rotating_light: [${domain}] \`Ask AI\` encountered a ${errorKind} for query '${lastUserMessage}': \`${error}\``
        );
        return msg;
      },
    });

    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type");
    return response;
  });
}

async function runQueryTurbopuffer(
  query: string | null | undefined,
  opts: {
    embeddingModel: EmbeddingModel<string>;
    namespace: string;
    topK?: number;
    authed?: boolean;
    roles?: string[];
    documentIdsToIgnore?: string[];
  }
) {
  return query == null || query.trimStart().length === 0
    ? []
    : await queryTurbopuffer(query, {
        namespace: opts.namespace,
        apiKey: turbopufferApiKey(),
        topK: opts.topK ?? 5,
        vectorizer: async (text) => {
          const embedding = await embed({
            model: opts.embeddingModel,
            value: text,
          });
          return embedding.embedding;
        },
        authed: opts.authed,
        roles: opts.roles,
        documentIdsToIgnore: opts.documentIdsToIgnore,
      });
}
