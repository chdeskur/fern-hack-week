"use client";

import { Auth0OrgID } from "@/app/services/auth0/types";
import { useDocsSite } from "@/state/useMyDocsSites";
import { DocsUrl } from "@/utils/types";

import { Page404 } from "../Page404";
import { PageHeader } from "../layout/PageHeader";
import { PosthogFeatureFlags } from "../posthog/feature-flags/flags";
import { DocsSiteNavBar } from "./DocsSiteNavBar";
import { useMaybeRedirectToOrgForCurrentDocsUrl } from "./useMaybeRedirectToOrgForCurrentDocsUrl";

export declare namespace DocsSiteLayout {
  export interface Props {
    docsUrl: DocsUrl;
    orgId: Auth0OrgID;
    featureFlags: PosthogFeatureFlags;
    children: React.JSX.Element;
  }
}

export function DocsSiteLayout({
  docsUrl,
  orgId,
  featureFlags,
  children,
}: DocsSiteLayout.Props) {
  const { willNotRedirect } = useMaybeRedirectToOrgForCurrentDocsUrl({
    docsUrl,
    currentOrgId: orgId,
  });

  const docsSite = useDocsSite(docsUrl);
  if (docsSite.type === "loaded" && docsSite.value == null && willNotRedirect) {
    return <Page404 />;
  }

  return (
    <div className="flex min-w-0 flex-1 flex-col gap-3">
      <PageHeader
        title={docsUrl}
        titleRightContent={
          <div className="flex items-center gap-2 rounded-full bg-green-300 px-3 py-2">
            <div className="bg-green-1100 size-2 rounded-full" />
            <div className="text-green-1100 mb-0.5 text-sm leading-none">
              Live
            </div>
          </div>
        }
      />
      <div className="flex flex-col gap-4">
        <DocsSiteNavBar featureFlags={featureFlags} />
        <div className="flex">{children}</div>
      </div>
    </div>
  );
}
