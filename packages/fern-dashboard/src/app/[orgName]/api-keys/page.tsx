import { PosthogFeatureFlag } from "@/components/posthog/feature-flags/flags";
import { FeatureFlaggedServerSide } from "@/components/posthog/feature-flags/server-side";

export default async function Page() {
  return (
    <FeatureFlaggedServerSide
      flag={PosthogFeatureFlag.ENABLE_API_KEYS_PAGE}
      redirectWhenDisabled
    >
      <div>api keys!</div>
    </FeatureFlaggedServerSide>
  );
}
