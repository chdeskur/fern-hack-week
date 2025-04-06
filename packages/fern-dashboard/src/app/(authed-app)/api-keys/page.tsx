import { FeatureFlagged } from "@/components/posthog/FeatureFlagged";
import { PosthogFeatureFlag } from "@/components/posthog/featureFlags";

export default async function Page() {
  return (
    <FeatureFlagged
      flag={PosthogFeatureFlag.ENABLE_API_KEYS_PAGE}
      redirectWhenDisabled
    >
      <div>api keys!</div>
    </FeatureFlagged>
  );
}
