import React from "react";

import { usePostHog } from "posthog-js/react";

import { Auth0OrgName } from "@/app/services/auth0/types";

import { PosthogFeatureFlag, PosthogFeatureFlags } from "./flags";

export declare namespace FeatureFlaggedClientSide {
  export interface Props {
    flag: PosthogFeatureFlag;
    featureFlags: PosthogFeatureFlags;
    orgName: Auth0OrgName;
    fallback?: React.JSX.Element;
    children: React.JSX.Element;
  }
}

export function FeatureFlaggedClientSide({
  flag,
  featureFlags,
  orgName,
  fallback,
  children,
}: FeatureFlaggedClientSide.Props) {
  const isEnabled = useFeatureFlagClientSide(flag, featureFlags, orgName);
  if (isEnabled) {
    return children;
  }
  return fallback ?? null;
}

export function useFeatureFlagClientSide(
  flag: PosthogFeatureFlag,
  allFlags: PosthogFeatureFlags,
  orgName?: Auth0OrgName
) {
  const posthog = usePostHog();

  React.useEffect(() => {
    if (orgName && posthog) {
      posthog.setPersonProperties({
        orgName: orgName,
      });
    }
  }, [posthog, orgName]);

  const isEnabled = posthog.isFeatureEnabled(flag);

  return isEnabled ?? allFlags[flag];
}
