"use server";

import { FernFai } from "@fern-api/fai-sdk";

import { getCurrentSessionOrThrow } from "../services/auth0/getCurrentSession";
import { getFaiClient } from "../services/fai/getFaiClient";

export async function getQueries({
  domain,
  page,
  limit = 10,
  cutoffTime,
}: {
  domain: string;
  page: number;
  limit: number;
  cutoffTime: string;
}): Promise<FernFai.QueryPage> {
  const session = await getCurrentSessionOrThrow();
  const faiClient = getFaiClient({ token: session.accessToken });
  return await faiClient.queries.getRecentQueries(domain, {
    page,
    limit,
    cutoff_time: cutoffTime,
  });
}
