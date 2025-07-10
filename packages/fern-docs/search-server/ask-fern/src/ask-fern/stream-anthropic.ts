import {
  EmbeddingModel,
  LanguageModel,
  ModelMessage,
  NoSuchToolError,
  UIDataTypes,
  UIMessage,
  UIMessagePart,
  UITools,
  convertToModelMessages,
  createUIMessageStream,
  createUIMessageStreamResponse,
  embed,
  stepCountIs,
  streamText,
  tool,
} from "ai";
import z from "zod";

import { postToSlack, track } from "@fern-api/docs-server";
import { turbopufferApiKey } from "@fern-api/docs-server/env-variables";
import { postNewQueryToFai } from "@fern-api/docs-server/postNewQueryToFai";

import {
  convertTpufRecordsToDocuments,
  createChatSystemPrompt,
  queryTurbopuffer,
} from "../index";

export const maxDuration = 60;
export const revalidate = 0;

export async function runRouteForAnthropic({
  domain,
  chatSource,
  promptTemplate,
  conversationId,
  lastUserMessage,
  messages,
  embeddingModel,
  turbopufferNamespace,
  languageModel,
}: {
  domain: string;
  chatSource: string;
  promptTemplate?: string;
  conversationId: string;
  lastUserMessage: string;
  messages: UIMessage[];
  embeddingModel: EmbeddingModel<string>;
  turbopufferNamespace: string;
  languageModel: LanguageModel;
}) {
  /*
    Anthropic's API has a bug (see: https://github.com/anthropics/claude-code/issues/473)
    Where tool calls are not formatted properly, breaking messages that contain tool calls.
    This is a manual fix - we simply filter out tool call responses.

    Will file an issue with Vercel to fix this, but for now this is not blocking.
  */
  const cleanedMessages: UIMessage[] = [];
  for (const message of messages) {
    if (message.role === "assistant") {
      message.parts = message.parts.filter(
        (part: UIMessagePart<UIDataTypes, UITools>) => part.type === "text"
      );
    }
    cleanedMessages.push(message);
  }
  const modelMessages: ModelMessage[] = convertToModelMessages(cleanedMessages);

  const start = Date.now();

  const searchResults = await runQueryTurbopuffer(lastUserMessage, {
    embeddingModel,
    namespace: turbopufferNamespace,
    topK: 3,
  });

  const systemPromptDocuments = convertTpufRecordsToDocuments(searchResults);
  const systemPrompt = createChatSystemPrompt({
    modelProvider: "anthropic",
    domain,
    date: new Date().toDateString(),
    documents: systemPromptDocuments.join("\n\n"),
    promptTemplate,
  });

  const documentIdsToIgnore: string[] = [];
  let timeToFirstToken: number | null = null;
  let responseText = "";

  const uiMessageStream = createUIMessageStream({
    execute({ writer }) {
      const result = streamText({
        model: languageModel,
        system: systemPrompt,
        messages: modelMessages,
        maxRetries: 3,
        stopWhen: stepCountIs(10),
        tools: {
          search: tool({
            description:
              "Search the knowledge base for the user's query. Semantic search is enabled.",
            inputSchema: z.object({
              query: z.string(),
            }),
            async execute({ query }) {
              const response = await runQueryTurbopuffer(query, {
                embeddingModel,
                namespace: turbopufferNamespace,
                topK: 5,
                documentIdsToIgnore: documentIdsToIgnore,
              });
              documentIdsToIgnore.push(...response.map((hit) => hit.id));
              return JSON.stringify(
                response.map((hit) => {
                  const { domain, pathname, hash, document } = hit.attributes;
                  const url = `https://${domain}${pathname}${hash ?? ""}`;
                  if (document.length > 20000) {
                    return {
                      ...hit.attributes,
                      url,
                      document: document.slice(0, 20000),
                    };
                  }
                  return { url, ...hit.attributes };
                })
              );
            },
          }),
        },
        onChunk: (chunk) => {
          if (chunk.chunk.type === "text" && chunk.chunk.text.length > 0) {
            if (timeToFirstToken == null) {
              timeToFirstToken = Date.now() - start;
            }
            responseText += chunk.chunk.text;
          }
        },
        onError: (event) => {
          const error = event.error;
          if (error == null) {
            return;
          }

          let errorKind = "UnknownError";
          if (NoSuchToolError.isInstance(error)) {
            errorKind = "NoSuchToolError";
          }

          console.error(
            `Encountered a ${errorKind} for query '${lastUserMessage}: ${JSON.stringify(error)}'`
          );
          let errorString = JSON.stringify(error);
          if (errorString.length > 1000) {
            errorString = errorString.slice(0, 1000) + "...";
          }
          postToSlack(
            "#search-notifs",
            `:rotating_light: [${domain}] \`Ask AI\` encountered a ${errorKind} for query '${lastUserMessage}': \`${errorString}\``
          );
        },
        onFinish: async (e) => {
          const end = Date.now();
          const queryId = crypto.randomUUID();
          await postNewQueryToFai({
            queryId,
            domain,
            conversationId,
            text: responseText,
            role: "ASSISTANT",
            source: chatSource.toUpperCase(),
            createdAt: new Date(end),
            timeToFirstToken,
          });
          track("ask_ai", {
            languageModel: languageModel.valueOf().toString(),
            embeddingModel: embeddingModel.modelId,
            durationMs: end - start,
            domain,
            namespace: turbopufferNamespace,
            numToolCalls: e.toolCalls.length,
            finishReason: e.finishReason,
            ...e.usage,
          });
          e.warnings?.forEach((warning) => {
            console.warn(warning);
          });
        },
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });

      writer.merge(result.toUIMessageStream());
    },
  });

  return createUIMessageStreamResponse({ stream: uiMessageStream });
}

async function runQueryTurbopuffer(
  query: string | null | undefined,
  opts: {
    embeddingModel: EmbeddingModel<string>;
    namespace: string;
    topK?: number;
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
        documentIdsToIgnore: opts.documentIdsToIgnore,
      });
}
