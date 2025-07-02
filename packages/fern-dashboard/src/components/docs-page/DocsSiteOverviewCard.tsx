"use client";

import { getLoadableValue } from "@fern-ui/loadable";

import { useDocsSite } from "@/state/useMyDocsSites";
import { DocsUrl } from "@/utils/types";

import Card from "../ui/card";
import { DocsSiteLink } from "./DocsSiteLink";
import { DocsSiteImage } from "./docs-site-image/DocsSiteImage";
import { SkeletonDocsSiteImage } from "./docs-site-image/SkeletonDocsSiteImage";

export declare namespace DocsSiteOverviewCard {
  export interface Props {
    docsUrl: DocsUrl;
    githubProtectedArea: React.ReactNode;
  }
}

export function DocsSiteOverviewCard({
  docsUrl,
  githubProtectedArea,
}: DocsSiteOverviewCard.Props) {
  const docsSite = getLoadableValue(useDocsSite(docsUrl));

  return (
    <div className="flex w-full flex-col gap-4">
      <Card className="flex flex-col md:flex-row">
        {docsSite != null ? (
          <DocsSiteImage docsSite={docsSite} />
        ) : (
          <SkeletonDocsSiteImage />
        )}
        {docsSite != null && (
          <div className="flex min-w-0 flex-col gap-4 text-gray-900">
            <div className="flex flex-col gap-2">
              <p>Domains</p>
              <div className="flex flex-col items-start gap-1">
                {docsSite.urls.map((url) => (
                  <DocsSiteLink
                    key={`${url.domain}${url.path}`}
                    docsSiteUrl={url}
                  />
                ))}
              </div>
            </div>
            {githubProtectedArea}
          </div>
        )}
      </Card>

      {/* 
      TODO: Add open branches here once we have a way to preview branches
      {sourceRepo?.repoName != null && sourceRepo.owner != null && (
        <Card className="flex flex-col gap-2">
          <div className="flex flex-row items-center justify-between">
            <p>
              <b>Open Pull Requests</b>
            </p>
            <GithubProtectedButton
              orgName={orgName}
              docsUrl={docsUrl}
              session={session}
              sourceRepo={sourceRepo}
              hasRepoAccess={hasRepoAccess}
            />
          </div>
          <p className="text-gray-1100 text-sm">TODO: List PRs</p>
        </Card>
      )} */}
    </div>
  );
}
