import AnalyticsPage from "@/components/analytics/AnalyticsPage";
import { PosthogFeatureFlag } from "@/components/posthog/feature-flags/flags";
import { FeatureFlaggedServerSide } from "@/components/posthog/feature-flags/server-side";

export default async function Page(_props: {
  params: Promise<{ docsUrl: string }>;
}) {
  const params = await _props.params;
  return (
    <FeatureFlaggedServerSide
      flag={PosthogFeatureFlag.ENABLE_DOCS_ANALYTICS_TAB}
      redirectWhenDisabled
    >
      <AnalyticsPage docsUrl={params.docsUrl} />
    </FeatureFlaggedServerSide>
  );
}
