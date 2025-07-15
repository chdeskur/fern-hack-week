import { FernFai } from "@fern-api/fai-sdk";

import { getFaiClient } from "@/app/services/fai/getFaiClient";

import { AnalyticsPageClient } from "./AnalyticsPageClient";
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
  const conversationsData =
    await client.conversations.getConversations(baseDocsUrl);

  return (
    <AnalyticsPageClient
      baseDocsUrl={baseDocsUrl}
      initialConversationsData={conversationsData}
      initialHistogramData={analyticsData}
    />
  );
}
