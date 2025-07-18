import { Auth0OrgName } from "@/app/services/auth0/types";
import AnalyticsPage from "@/components/analytics/AnalyticsPage";
import { PosthogFeatureFlag } from "@/components/posthog/feature-flags/flags";
import { FeatureFlaggedServerSide } from "@/components/posthog/feature-flags/server-side";

export default async function Page(props: {
  params: Promise<{ orgName: Auth0OrgName; docsUrl: string }>;
}) {
  const params = await props.params;
  return (
    <FeatureFlaggedServerSide
      flag={PosthogFeatureFlag.ENABLE_DOCS_ANALYTICS_TAB}
      redirectWhenDisabled
      orgName={params.orgName}
    >
      <AnalyticsPage docsUrl={params.docsUrl} />
    </FeatureFlaggedServerSide>
  );
}
