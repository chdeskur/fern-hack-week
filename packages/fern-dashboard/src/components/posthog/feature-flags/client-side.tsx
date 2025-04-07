import React from "react";

import { usePostHog } from "posthog-js/react";

import { PosthogFeatureFlag, PosthogFeatureFlags } from "./flags";

export declare namespace FeatureFlaggedClientSide {
  export interface Props {
    flag: PosthogFeatureFlag;
    featureFlags: PosthogFeatureFlags;
    fallback?: React.JSX.Element;
    children: React.JSX.Element;
  }
}

export function FeatureFlaggedClientSide({
  flag,
  featureFlags,
  fallback,
  children,
}: FeatureFlaggedClientSide.Props) {
  const isEnabled = useFeatureFlagClientSide(flag, featureFlags);
  if (isEnabled) {
    return children;
  }
  return fallback ?? null;
}

export function useFeatureFlagClientSide(
  flag: PosthogFeatureFlag,
  allFlags: PosthogFeatureFlags
) {
  const posthog = usePostHog();
  return posthog.isFeatureEnabled(flag) ?? allFlags[flag];
}
