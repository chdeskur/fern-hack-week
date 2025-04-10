import { useFeatureFlagClientSide } from "../posthog/feature-flags/client-side";
import {
  PosthogFeatureFlag,
  PosthogFeatureFlags,
} from "../posthog/feature-flags/flags";
import { DocsSiteNavBarItem } from "./DocsSiteNavBarItem";

export declare namespace DocsSiteNavBar {
  export interface Props {
    featureFlags: PosthogFeatureFlags;
  }
}

export function DocsSiteNavBar({ featureFlags }: DocsSiteNavBar.Props) {
  const isAnalyticsTabEnabled = useFeatureFlagClientSide(
    PosthogFeatureFlag.ENABLE_DOCS_ANALYTICS_TAB,
    featureFlags
  );
  const isAiSearchTabEnabled = useFeatureFlagClientSide(
    PosthogFeatureFlag.ENABLE_DOCS_AI_SEARCH_TAB,
    featureFlags
  );

  if (!isAnalyticsTabEnabled && !isAiSearchTabEnabled) {
    return null;
  }

  return (
    <div className="flex">
      <DocsSiteNavBarItem title="Overview" href="" />
      {isAnalyticsTabEnabled && (
        <DocsSiteNavBarItem title="Analytics" href="analytics" />
      )}
      {isAiSearchTabEnabled && (
        <DocsSiteNavBarItem title="AI Search" href="ai-search" />
      )}
      <DocsSiteNavBarItem title="Settings" href="settings" />
    </div>
  );
}
