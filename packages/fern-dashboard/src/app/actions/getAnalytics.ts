"use server";

import { FernFai } from "@fern-api/fai-sdk";

import {
  TimeRange,
  getRequestParams,
} from "@/components/analytics/get-request-params";

import { getCurrentSessionOrThrow } from "../services/auth0/getCurrentSession";
import { getFaiClient } from "../services/fai/getFaiClient";

export async function getDomainAnalytics({
  docsUrl,
  timeRange,
}: {
  docsUrl: string;
  timeRange: TimeRange;
}): Promise<FernFai.HistogramAnalytics> {
  const session = await getCurrentSessionOrThrow();
  const faiClient = getFaiClient({ token: session.accessToken });
  return await faiClient.analytics.getHistogramAnalytics(
    docsUrl,
    getRequestParams(timeRange)
  );
}
