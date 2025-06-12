import { NextRequest, NextResponse } from "next/server";

import { algoliasearch } from "algoliasearch";

import { algoliaAppId } from "@fern-api/docs-server/env-variables";
import { isLocal } from "@fern-api/docs-server/isLocal";
import { isSelfHosted } from "@fern-api/docs-server/isSelfHosted";
import { selectFirst } from "@fern-api/docs-server/utils/selectFirst";
import { toArray } from "@fern-api/docs-server/utils/toArray";
import { fetchFacetValues } from "@fern-docs/search-keyword";

export const maxDuration = 10;

export async function GET(req: NextRequest): Promise<NextResponse> {
  if (isLocal() || isSelfHosted()) {
    return NextResponse.json(
      "search facet is not accessible in local preview mode",
      { status: 400 }
    );
  }

  const filters = toArray(req.nextUrl.searchParams.getAll("filters"));
  const apiKey = selectFirst(req.nextUrl.searchParams.get("apiKey"));

  if (!apiKey) {
    return NextResponse.json("apiKey is required", { status: 400 });
  }

  const facetValues = await fetchFacetValues({
    filters,
    client: algoliasearch(algoliaAppId(), apiKey),
  });

  return NextResponse.json(facetValues);
}
