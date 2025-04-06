import { Auth0UserID } from "@/app/services/auth0/types";

import { getServerSidePosthog } from "./getServerSidePosthog";

export const PosthogFeatureFlag = {
  ENABLE_SDKS_PAGE: "dashboard-enable-sdks-page",
  ENABLE_API_KEYS_PAGE: "dashboard-enable-api-keys-page",
  ENABLE_BILLING_PAGE: "dashboard-enable-billing-page",
} as const;

export type PosthogFeatureFlag =
  (typeof PosthogFeatureFlag)[keyof typeof PosthogFeatureFlag];

export async function isFeatureFlagEnabledForUser(
  featureFlag: PosthogFeatureFlag,
  userId: Auth0UserID
) {
  const posthog = getServerSidePosthog();
  return await posthog.isFeatureEnabled(featureFlag, userId);
}
