import { Auth0OrgName } from "@/app/services/auth0/types";

import { PosthogFeatureFlag } from "../posthog/feature-flags/flags";
import { FeatureFlaggedServerSide } from "../posthog/feature-flags/server-side";
import { DocsSiteNavBarItem } from "./DocsSiteNavBarItem";

export declare namespace DocsSiteNavBar {
  export interface Props {
    orgName: Auth0OrgName;
  }
}

export async function DocsSiteNavBar({ orgName }: DocsSiteNavBar.Props) {
  return (
    <div className="flex">
      <DocsSiteNavBarItem title="Overview" href="" />
      <FeatureFlaggedServerSide
        flag={PosthogFeatureFlag.ENABLE_DOCS_ANALYTICS_TAB}
        orgName={orgName}
      >
        <DocsSiteNavBarItem title="Analytics" href="analytics" />
      </FeatureFlaggedServerSide>
      <FeatureFlaggedServerSide
        flag={PosthogFeatureFlag.ENABLE_DOCS_AI_SEARCH_TAB}
        orgName={orgName}
      >
        <DocsSiteNavBarItem title="AI Search" href="ai-search" />
      </FeatureFlaggedServerSide>
      <DocsSiteNavBarItem title="Settings" href="settings" />
    </div>
  );
}
