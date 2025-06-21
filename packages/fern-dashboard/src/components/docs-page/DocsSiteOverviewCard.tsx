"use client";

import { useEffect } from "react";

import { PencilSquareIcon } from "@heroicons/react/24/outline";

import { getLoadableValue } from "@fern-ui/loadable";

import { useDocsSite } from "@/state/useMyDocsSites";
import { useUserGithubRepos } from "@/state/useUserGithubRepos";
import { DocsUrl } from "@/utils/types";

import { Button } from "../ui/button";
import Card from "../ui/card";
import { DocsSiteInfo } from "./DocsSiteInfo";
import { DocsSiteImage } from "./docs-site-image/DocsSiteImage";
import { SkeletonDocsSiteImage } from "./docs-site-image/SkeletonDocsSiteImage";

export declare namespace DocsSiteOverviewCard {
  export interface Props {
    docsUrl: DocsUrl;
  }
}

export function DocsSiteOverviewCard({ docsUrl }: DocsSiteOverviewCard.Props) {
  const docsSite = getLoadableValue(useDocsSite(docsUrl));
  const repos = getLoadableValue(useUserGithubRepos());

  useEffect(() => {
    console.log("repos", repos);
  }, [repos]);

  const createBranch = () => {
    // TODO: Implement this.
    console.log("create branch");
  };

  return (
    <div className="flex w-full flex-col gap-4">
      <Card className="flex flex-col md:flex-row">
        {docsSite != null ? (
          <DocsSiteImage docsSite={docsSite} />
        ) : (
          <SkeletonDocsSiteImage />
        )}
        {docsSite != null && <DocsSiteInfo docsSite={docsSite} />}
      </Card>

      <Card className="flex flex-col gap-2">
        <div className="flex flex-row items-center justify-between">
          <p>
            <b>Open Pull Requests</b>
          </p>
          <Button
            variant="outline"
            size="sm"
            className="text-primary hover:text-primary"
            onClick={createBranch}
          >
            <PencilSquareIcon className="text-primary" />
            Create a PR
          </Button>
        </div>
        <p className="text-gray-1100 text-sm">TODO: List PRs</p>
      </Card>
    </div>
  );
}
