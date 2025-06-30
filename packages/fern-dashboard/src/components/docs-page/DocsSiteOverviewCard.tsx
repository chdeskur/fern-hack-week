"use client";

import { redirect } from "next/navigation";
import { useCallback } from "react";

import { PencilSquareIcon } from "@heroicons/react/24/outline";

import { getLoadableValue } from "@fern-ui/loadable";

import { Auth0SessionData } from "@/app/services/auth0/getCurrentSession";
import { Auth0OrgName } from "@/app/services/auth0/types";
import { DashboardApiClient } from "@/app/services/dashboard-api/client";
import { useGithubSourceRepo } from "@/state/useGithubSourceRepo";
import { useDocsSite } from "@/state/useMyDocsSites";
import { DocsUrl } from "@/utils/types";

import { Button } from "../ui/button";
import Card from "../ui/card";
import { DocsSiteInfo } from "./DocsSiteInfo";
import { DocsSiteImage } from "./docs-site-image/DocsSiteImage";
import { SkeletonDocsSiteImage } from "./docs-site-image/SkeletonDocsSiteImage";

export declare namespace DocsSiteOverviewCard {
  export interface Props {
    orgName: Auth0OrgName;
    docsUrl: DocsUrl;
    session: Auth0SessionData;
  }
}

export function DocsSiteOverviewCard({
  orgName,
  docsUrl,
  session,
}: DocsSiteOverviewCard.Props) {
  const docsSite = getLoadableValue(useDocsSite(docsUrl));
  const sourceRepo = getLoadableValue(useGithubSourceRepo(docsUrl));

  const createBranch = useCallback(async () => {
    console.log("create branch");
    if (sourceRepo?.owner == null || sourceRepo.repo == null) {
      return;
    }
    const randomHexString = crypto.randomUUID().split("-")[0];

    const branchName =
      new Date().toISOString().split("T")[0] +
      "-" +
      session.user.name?.toLowerCase().replace(" ", "_") +
      "-" +
      randomHexString;
    console.log("branchName", branchName);

    const response = await DashboardApiClient.postCreateBranch({
      owner: sourceRepo.owner,
      repo: sourceRepo.repo,
      branch: branchName,
      baseBranch: "main",
    });
    console.log("response", response);
    redirect(`/${orgName}/editor/${docsUrl}/${branchName}/root`);
  }, [sourceRepo, session.user.name, orgName, docsUrl]);

  return (
    <div className="flex w-full flex-col gap-4">
      <Card className="flex flex-col md:flex-row">
        {docsSite != null ? (
          <DocsSiteImage docsSite={docsSite} />
        ) : (
          <SkeletonDocsSiteImage />
        )}
        {docsSite != null && (
          <DocsSiteInfo docsUrl={docsUrl} docsSite={docsSite} />
        )}
      </Card>

      {sourceRepo?.repoName != null && sourceRepo.owner != null && (
        <Card className="flex flex-col gap-2">
          <div className="flex flex-row items-center justify-between">
            <p>
              <b>Open Pull Requests</b>
            </p>
            <Button
              variant="outline"
              size="sm"
              className="text-primary hover:text-primary"
              onClick={() => void createBranch()}
            >
              <PencilSquareIcon className="text-primary" />
              Create a Branch
            </Button>
          </div>
          <p className="text-gray-1100 text-sm">TODO: List PRs</p>
        </Card>
      )}
    </div>
  );
}
