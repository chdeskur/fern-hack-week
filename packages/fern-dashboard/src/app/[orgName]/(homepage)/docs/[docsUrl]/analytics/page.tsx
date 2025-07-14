import { getFaiClient } from "@/app/services/fai/getFaiClient";
import { PosthogFeatureFlag } from "@/components/posthog/feature-flags/flags";
import { FeatureFlaggedServerSide } from "@/components/posthog/feature-flags/server-side";

export default async function Page(_props: {
  params: Promise<{ docsUrl: string }>;
}) {
  const client = getFaiClient({ token: "" });
  const response = await client.conversations.getConversations("123");
  console.log(response);

  const response2 = await client.analytics.getHistogramAnalytics("123", {
    start_date: "2024-01-15T09:30:00Z",
    end_date: "2024-01-15T09:30:00Z",
    groupBy: "DAY",
  });
  console.log(response2);
  return (
    <FeatureFlaggedServerSide
      flag={PosthogFeatureFlag.ENABLE_DOCS_ANALYTICS_TAB}
      redirectWhenDisabled
    >
      <div>analytics</div>
    </FeatureFlaggedServerSide>
  );
}
