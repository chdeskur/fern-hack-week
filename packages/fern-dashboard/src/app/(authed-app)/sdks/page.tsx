import { FeatureFlagged } from "@/components/posthog/FeatureFlagged";
import { PosthogFeatureFlag } from "@/components/posthog/featureFlags";

export default async function Page() {
  return (
    <FeatureFlagged
      flag={PosthogFeatureFlag.ENABLE_SDKS_PAGE}
      redirectWhenDisabled
    >
      <div>sdks!</div>
    </FeatureFlagged>
  );
}
