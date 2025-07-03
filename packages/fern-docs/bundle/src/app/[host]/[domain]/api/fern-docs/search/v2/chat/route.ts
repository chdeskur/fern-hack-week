import { NextRequest, NextResponse } from "next/server";

import { createOpenAI } from "@ai-sdk/openai";
import { UIMessage } from "ai";
import { initLogger } from "braintrust";

import { createCachedDocsLoader } from "@fern-api/docs-loader";
import { openaiApiKey } from "@fern-api/docs-server/env-variables";
import { isLocal } from "@fern-api/docs-server/isLocal";
import { isSelfHosted } from "@fern-api/docs-server/isSelfHosted";
import { getDocsDomainEdge } from "@fern-api/docs-server/xfernhost/edge";
import { getAuthEdgeConfig, getEdgeFlags } from "@fern-docs/edge-config";
import {
  getLanguageModel,
  getTurbopufferNamespace,
  runRouteForAnthropic,
  runRouteForCohere,
} from "@fern-docs/search-ask-fern";

import { ModelProvider } from "@/app/utils";

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

  const [_, edgeFlags] = await Promise.all([
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

  const {
    messages,
    source,
    conversationId,
  }: {
    url: string;
    messages: UIMessage[];
    source: string;
    conversationId: string;
  } = await req.json();

  const config = await loader.getConfig();
  const chatSource = source ?? "chat"; // distinguish between chat and mcp server request

  const modelId = config.aiChatConfig?.model ?? "claude-3.5";
  let modelProvider: ModelProvider = "anthropic";
  if (modelId === "claude-4" || modelId === "claude-3.5")
    modelProvider = "anthropic";
  if (modelId === "command-a") modelProvider = "cohere";
  const languageModel = getLanguageModel(modelId);

  const openai = createOpenAI({ apiKey: openaiApiKey() });
  const embeddingModel = openai.embedding("text-embedding-3-large");

  if (modelProvider === "anthropic") {
    return runRouteForAnthropic({
      domain,
      chatSource,
      promptTemplate: config.aiChatConfig?.systemPrompt,
      conversationId,
      lastUserMessage: getLastUserMessage(messages),
      messages,
      embeddingModel,
      turbopufferNamespace: getTurbopufferNamespace(domain, embeddingModel),
      languageModel,
    });
  } else if (modelProvider === "cohere") {
    return runRouteForCohere({
      domain,
      chatSource,
      promptTemplate: config.aiChatConfig?.systemPrompt,
      conversationId,
      lastUserMessage: getLastUserMessage(messages),
      messages,
      embeddingModel,
      turbopufferNamespace: getTurbopufferNamespace(domain, embeddingModel),
      languageModel,
    });
  } else {
    return NextResponse.json(`Invalid model provider: ${modelProvider}`, {
      status: 400,
    });
  }
}

function getLastUserMessage(messages: UIMessage[]): string {
  let lastUserMessageText = "";
  const lastUserMessage = messages.findLast((message: UIMessage, _: number) => {
    return message.role === "user";
  });

  if (lastUserMessage == null) {
    return "";
  }

  for (const part of lastUserMessage.parts) {
    if (part.type === "text") {
      lastUserMessageText += part.text;
    }
  }
  return lastUserMessageText;
}
