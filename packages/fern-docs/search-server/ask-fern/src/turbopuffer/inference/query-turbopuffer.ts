import {
  FilterCondition,
  Filters,
  Turbopuffer,
} from "@turbopuffer/turbopuffer";

import { EVERYONE_ROLE } from "@fern-api/docs-utils";
import { createRoleFacet } from "@fern-docs/search-utils";
import { createPermutations } from "@fern-docs/search-utils";

import { TurbopufferRecord } from "../types";
import { reciprocalRankFusion } from "./reciprocal-rank-fusion";

interface SemanticSearchOptions {
  vectorizer: (text: string) => Promise<number[]>;
  namespace: string;
  apiKey: string;
  topK: number;
  filters?: { facet: string; value: string }[];

  /**
   * The search mode to use.
   * @default "semantic"
   */
  mode?: "semantic" | "bm25" | "hybrid";

  authed?: boolean;
  roles?: string[];

  // ignore these document ids; used to avoid tool-calls returning the same document over and over
  documentIdsToIgnore?: string[];
}

export async function queryTurbopuffer(
  query: string,
  {
    vectorizer,
    namespace,
    apiKey,
    topK,
    filters,
    mode = "hybrid",
    authed = false,
    roles = [],
    documentIdsToIgnore = [],
  }: SemanticSearchOptions
): Promise<TurbopufferRecord[]> {
  const tpuf = new Turbopuffer({
    apiKey,
    baseUrl: "https://gcp-us-east4.turbopuffer.com",
  });
  const ns = tpuf.namespace(namespace);

  const vector = await vectorizer(query);

  const authFilter: FilterCondition = authed
    ? ([
        "visible_by",
        "In",
        [
          createRoleFacet([EVERYONE_ROLE]),
          ...createPermutations(roles.filter((r) => r !== EVERYONE_ROLE)).map(
            (perms) => createRoleFacet(perms)
          ),
        ],
      ] as const)
    : ["authed", "NotEq", true];

  const documentIdFilters: FilterCondition[] = documentIdsToIgnore.map((id) => [
    "id",
    "NotEq",
    id,
  ]);

  const versionFilters = filters
    ? filters.filter((f) => f.facet === "version.title")
    : [];
  const queryFilters: Filters =
    versionFilters.length > 0
      ? [
          "And",
          [
            authFilter,
            ...versionFilters.map((f) => {
              const filter: FilterCondition = ["version", "Eq", f.value];
              return filter;
            }),
            ...documentIdFilters,
          ],
        ]
      : authFilter;

  const semanticResults =
    mode !== "bm25"
      ? await ns.query({
          vector,
          distance_metric: "cosine_distance",
          top_k: 1,
          include_attributes: true,
          filters: queryFilters,
        })
      : [];

  const bm25Results =
    mode !== "semantic" && query.length < 1024
      ? await ns.query({
          top_k: topK,
          include_attributes: true,
          filters: queryFilters,
          rank_by: [
            "Sum",
            [
              ["chunk", "BM25", query],
              ["title", "BM25", query],
              ["keywords", "BM25", query],
            ],
          ],
        })
      : [];

  return reciprocalRankFusion(
    semanticResults,
    bm25Results
  ) as unknown as TurbopufferRecord[];
}
