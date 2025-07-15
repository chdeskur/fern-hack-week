import { FernFai } from "@fern-api/fai-sdk";

import { getFaiClient } from "@/app/services/fai/getFaiClient";

import { AnalyticsHistogram } from "./AnalyticsHistogram";
import { getBaseDocsUrl } from "./get-base-docs-url";
import { TimeRange, getRequestParams } from "./get-request-params";

export default async function AnalyticsPage({ docsUrl }: { docsUrl: string }) {
  const client = getFaiClient({ token: "" });
  const baseDocsUrl = getBaseDocsUrl(docsUrl);

  const analyticsData: FernFai.HistogramAnalytics =
    await client.analytics.getHistogramAnalytics(
      baseDocsUrl,
      getRequestParams(TimeRange.LAST_WEEK)
    );

  const chartConfig = {
    queries: {
      label: "Queries",
      color: "var(--chart-1)",
    },
  };

  const chartData = analyticsData.bars.map((bar) => ({
    label: bar.label,
    queryCount: bar.queryCount,
  }));

  return <AnalyticsHistogram chartData={chartData} chartConfig={chartConfig} />;
}
