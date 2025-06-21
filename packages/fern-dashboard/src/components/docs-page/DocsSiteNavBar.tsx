"use client";

import { FeatureFlaggedClientSide } from "../posthog/feature-flags/client-side";
import {
  PosthogFeatureFlag,
  PosthogFeatureFlags,
} from "../posthog/feature-flags/flags";
import { DocsSiteNavBarItem } from "./DocsSiteNavBarItem";

export declare namespace DocsSiteNavBar {
  export interface Props {
    orgName: string;
    featureFlags: PosthogFeatureFlags;
  }
}

export function DocsSiteNavBar({
  orgName,
  featureFlags,
}: DocsSiteNavBar.Props) {
  return (
    <div className="flex">
      <DocsSiteNavBarItem title="Overview" href="" />
      {/* TEMP: shortcut to editor */}
      <DocsSiteNavBarItem
        title="Editor"
        href={`../../../${orgName}/editor/learn`}
      />
      <FeatureFlaggedClientSide
        flag={PosthogFeatureFlag.ENABLE_DOCS_ANALYTICS_TAB}
        featureFlags={featureFlags}
      >
        <DocsSiteNavBarItem title="Analytics" href="analytics" />
      </FeatureFlaggedClientSide>
      <FeatureFlaggedClientSide
        flag={PosthogFeatureFlag.ENABLE_DOCS_AI_SEARCH_TAB}
        featureFlags={featureFlags}
      >
        <DocsSiteNavBarItem title="AI Search" href="ai-search" />
      </FeatureFlaggedClientSide>
      <DocsSiteNavBarItem title="Settings" href="settings" />
    </div>
  );
}
