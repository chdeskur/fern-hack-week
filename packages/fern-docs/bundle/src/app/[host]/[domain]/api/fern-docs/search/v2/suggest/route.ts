import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import { createAmazonBedrock } from "@ai-sdk/amazon-bedrock";
import { searchClient } from "@algolia/client-search";
import { getEnv } from "@vercel/functions";
import { kv } from "@vercel/kv";
import { streamObject } from "ai";
import { z } from "zod";

import { track } from "@fern-api/docs-server/analytics/posthog";
import { algoliaAppId } from "@fern-api/docs-server/env-variables";
import { isLocal } from "@fern-api/docs-server/isLocal";
import { isSelfHosted } from "@fern-api/docs-server/isSelfHosted";
import { getDocsDomainEdge } from "@fern-api/docs-server/xfernhost/edge";
import { COOKIE_FERN_TOKEN } from "@fern-api/docs-utils";
import { getEdgeFlags } from "@fern-docs/edge-config";
import { SuggestionsSchema } from "@fern-docs/search-ask-fern";
import { type AlgoliaRecord, SEARCH_INDEX } from "@fern-docs/search-keyword";

const DEPLOYMENT_ID = getEnv().VERCEL_DEPLOYMENT_ID ?? "development";
const PREFIX = `docs:${DEPLOYMENT_ID}`;

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

const BodySchema = z.object({
  algoliaSearchKey: z.string(),
});

export async function POST(req: NextRequest): Promise<Response> {
  if (isLocal() || isSelfHosted()) {
    return NextResponse.json(
      "ai suggestions are not accessible in local preview mode",
      { status: 400 }
    );
  }

  const bedrock = createAmazonBedrock({
    region: "us-east-1",
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  });
  const languageModel = bedrock("us.anthropic.claude-3-5-sonnet-20241022-v2:0");

  const start = Date.now();
  const domain = getDocsDomainEdge(req);
  const edgeFlags = await getEdgeFlags(domain);
  const cookieJar = await cookies();

  if (!edgeFlags.isAskAiEnabled) {
    throw new Error(`Ask AI is not enabled for ${domain}`);
  }

  const cacheKey = `${PREFIX}:${domain}:suggestions`;
  if (!cookieJar.has(COOKIE_FERN_TOKEN)) {
    const cachedSuggestions = await kv.get(cacheKey);

    if (cachedSuggestions) {
      return NextResponse.json(cachedSuggestions, {
        status: 200,
        headers: { "Content-Type": "text/plain; charset=utf-8" },
      });
    }
  }

  const body = await req.json();
  const { algoliaSearchKey } = BodySchema.parse(body);

  const client = searchClient(algoliaAppId(), algoliaSearchKey);
  const response = await client.searchSingleIndex<AlgoliaRecord>({
    indexName: SEARCH_INDEX,
    searchParams: {
      query: "",
      hitsPerPage: 20,
      attributesToSnippet: [],
      attributesToHighlight: [],
    },
  });

  const result = streamObject({
    model: languageModel,
    system: `You are a helpful assistant that makes suggestions of questions for the user to ask about the documentation.
The prompt will be a an array of separate search results that are JSON objects.
Generate 5 questions based on the following search results.`,
    prompt: response.hits
      .map(
        (hit) =>
          `# ${hit.title}\n${hit.description ?? ""}\n${hit.type === "changelog" || hit.type === "markdown" ? (hit.content ?? "") : ""}`
      )
      .join("\n\n"),
    maxRetries: 3,
    schema: SuggestionsSchema,
    experimental_telemetry: {
      isEnabled: true,
      recordInputs: true,
      recordOutputs: true,
      functionId: "ask_ai_suggest",
      metadata: {
        domain,
        indexName: SEARCH_INDEX,
        languageModel: languageModel.modelId,
      },
    },
    onFinish: async (e) => {
      const end = Date.now();
      track("ask_ai_suggestions", {
        languageModel: languageModel.modelId,
        durationMs: end - start,
        domain,
        indexName: SEARCH_INDEX,
        ...e.usage,
      });
      e.warnings?.forEach((warning) => {
        console.warn(warning);
      });
      if (e.object && !cookieJar.has(COOKIE_FERN_TOKEN)) {
        await kv.set(cacheKey, e.object);
        await kv.expire(cacheKey, 2 * 86400);
      }
    },
  });

  return result.toTextStreamResponse();
}
