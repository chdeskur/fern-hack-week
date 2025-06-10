import { NextRequest, NextResponse } from "next/server";

import { createAmazonBedrock } from "@ai-sdk/amazon-bedrock";
import { createAnthropic } from "@ai-sdk/anthropic";
import { createCohere } from "@ai-sdk/cohere";
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
import { initLogger, traced, wrapAISDKModel } from "braintrust";
import { z } from "zod";

import { getAuthEdgeConfig, getEdgeFlags } from "@fern-docs/edge-config";
import {
  createCohereSystemPrompt,
  createDefaultSystemPrompt,
} from "@fern-docs/search-server";
import {
  queryTurbopuffer,
  toDocuments,
} from "@fern-docs/search-server/turbopuffer";
import { withoutStaging } from "@fern-docs/utils";

import { getFernToken } from "@/app/fern-token";
import { track } from "@/server/analytics/posthog";
import { safeVerifyFernJWTConfig } from "@/server/auth/FernJWT";
import { createCachedDocsLoader } from "@/server/docs-loader";
import {
  anthropicApiKey,
  cohereApiKey,
  openaiApiKey,
  turbopufferApiKey,
} from "@/server/env-variables";
import { isLocal } from "@/server/isLocal";
import { isSelfHosted } from "@/server/isSelfHosted";
import { postToSlack } from "@/server/slack";
import { getDocsDomainEdge } from "@/server/xfernhost/edge";

export const maxDuration = 60;
export const revalidate = 0;

const modelMap: Record<string, { modelId: string; region: string }> = {
  "claude-3.5": {
    modelId: "us.anthropic.claude-3-5-sonnet-20241022-v2:0",
    region: "us-west-2",
  },
  "claude-3.7": {
    modelId: "us.anthropic.claude-3-7-sonnet-20250219-v1:0",
    region: "us-east-1",
  },
  // command-a is not supported by bedrock
};

export async function POST(req: NextRequest) {
  if (isLocal() || isSelfHosted()) {
    return NextResponse.json(
      "ai chat is not accessible in local preview mode",
      { status: 400 }
    );
  }

  initLogger({
    projectName: "Braintrust Evaluation",
    apiKey: process.env.BRAINTRUST_API_KEY,
  });

  const host = req.nextUrl.host;
  const domain = getDocsDomainEdge(req);
  const loader = await createCachedDocsLoader(host, domain);
  const metadata = await loader.getMetadata();
  const config = await loader.getConfig();

  const { messages, url, source, conversationId } = await req.json();

  const isCohere = url.includes("cohere");
  const chatSource = source ?? "chat"; // distinguish between chat and mcp server request

  const model: string = config.aiChatConfig?.model || "claude-3.5";
  let languageModel;
  if (model === "command-a" || model === "command-r-plus") {
    // TODO: remove command-r-plus once fern generate change is resolved
    const cohere = createCohere({ apiKey: cohereApiKey() });
    languageModel = wrapAISDKModel(cohere("command-a-03-2025"));
  } else if (model === "claude-4") {
    // claude-4 goes through anthropic directly
    const anthropic = createAnthropic({ apiKey: anthropicApiKey() });
    languageModel = wrapAISDKModel(anthropic("claude-4-sonnet-20250514"));
  } else {
    let modelId = modelMap["claude-3.5"]?.modelId || ""; // defaults for improper docs.yml entries
    let region = modelMap["claude-3.5"]?.region || "";
    if (modelMap[model] != null) {
      // fallback
      ({ modelId, region } = modelMap[model]);
    }
    const bedrock = createAmazonBedrock({
      region: region,
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });

    languageModel = wrapAISDKModel(bedrock(modelId));
  }

  const openai = createOpenAI({ apiKey: openaiApiKey() });
  const embeddingModel = openai.embedding("text-embedding-3-large");
  const namespace = `${withoutStaging(domain)}_${embeddingModel.modelId}`;

  const promptTemplate = config.aiChatConfig?.systemPrompt;
  if (metadata == null) {
    return NextResponse.json("Not found", { status: 404 });
  }

  if (metadata.isPreview) {
    return NextResponse.json("Chat is not enabled for preview environments", {
      status: 404,
    });
  }

  const start = Date.now();
  const [authEdgeConfig, edgeFlags] = await Promise.all([
    getAuthEdgeConfig(domain),
    getEdgeFlags(domain),
  ]);

  if (!edgeFlags.isAskAiEnabled) {
    throw new Error(`Ask AI is not enabled for ${domain}`);
  }

  const fern_token = await getFernToken();
  const user = await safeVerifyFernJWTConfig(fern_token, authEdgeConfig);

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
  const documents = toDocuments(searchResults).join("\n\n");
  const system = isCohere
    ? createCohereSystemPrompt({
        domain,
        date: new Date().toDateString(),
        documents,
        promptTemplate,
      })
    : createDefaultSystemPrompt({
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
      system,
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
