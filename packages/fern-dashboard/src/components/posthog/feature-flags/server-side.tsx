import { redirect } from "next/navigation";

import { getCurrentSessionOrThrow } from "@/app/services/auth0/getCurrentSession";
import { Auth0UserID } from "@/app/services/auth0/types";

import { getServerSidePosthog } from "../getServerSidePosthog";
import { PosthogFeatureFlag, PosthogFeatureFlags } from "./flags";

export declare namespace FeatureFlaggedServerSide {
  export interface Props {
    flag: PosthogFeatureFlag;
    redirectWhenDisabled?: boolean;
    children: React.JSX.Element;
  }
}

export async function FeatureFlaggedServerSide({
  flag,
  redirectWhenDisabled = false,
  children,
}: FeatureFlaggedServerSide.Props) {
  const session = await getCurrentSessionOrThrow();
  const isEnabled = await isFeatureFlagEnabledForUser(flag, session.user.sub);

  if (isEnabled) {
    return children;
  }

  if (redirectWhenDisabled) {
    redirect("/");
  }

  return null;
}

export async function isFeatureFlagEnabledForUser(
  featureFlag: PosthogFeatureFlag,
  userId: Auth0UserID
) {
  const posthog = getServerSidePosthog();
  return await posthog.isFeatureEnabled(featureFlag, userId);
}

export async function getAllFeatureFlags(userId: Auth0UserID) {
  const posthog = getServerSidePosthog();
  const flags = await posthog.getAllFlags(userId);
  return flags as PosthogFeatureFlags;
}
