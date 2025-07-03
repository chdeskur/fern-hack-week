"use client";

import { redirect } from "next/navigation";
import { useState } from "react";

import {
  ArrowUturnLeftIcon,
  ArrowUturnRightIcon,
} from "@heroicons/react/24/outline";
import { ArrowLeftIcon, Globe, SettingsIcon } from "lucide-react";

import { getLoadableValue } from "@fern-ui/loadable";

import { Auth0SessionData } from "@/app/services/auth0/getCurrentSession";
import { DashboardApiClient } from "@/app/services/dashboard-api/client";
import { handleCreatePr } from "@/app/services/github/github";
import { useBranch } from "@/providers/BranchContext";
import { useMdxState } from "@/providers/MdxStateContext";
import { useGithubSourceRepo } from "@/state/useGithubSourceRepo";
import { DocsUrl } from "@/utils/types";

import { GithubLogo } from "../auth/GithubLogo";
import { ProfileImage } from "../layout/ProfileImage";
import { Button } from "../ui/button";

export function HeaderToolbar({
  orgName,
  session,
  docsUrl,
}: {
  orgName: string;
  session: Auth0SessionData;
  docsUrl: DocsUrl;
}) {
  const { name, picture } = session.user;
  const { changedMdxFiles } = useMdxState();
  const { branch } = useBranch();
  const githubSource = getLoadableValue(useGithubSourceRepo(docsUrl));

  // If the github source is not found, redirect to the docs page.
  if (!!githubSource && githubSource.githubUrl == null) {
    redirect(`/${orgName}/docs/${docsUrl}`);
  }

  const [isCommitting, setIsCommitting] = useState(false);

  async function handleCommitPress() {
    console.log("handleCommitPress", branch, githubSource);
    if (githubSource?.owner == null || githubSource.repo == null) {
      console.log("No github source found");
      return;
    }
    if (branch == null) {
      console.log("No branch found");
      return;
    }
    if (Object.keys(changedMdxFiles).length === 0) {
      console.log("No changes to commit");
      return;
    }
    setIsCommitting(true);
    try {
      const response = await DashboardApiClient.postGitCommit({
        owner: githubSource.owner,
        repo: githubSource.repo,
        branch,
        message: "Visual Editor: Update",
        files: Object.entries(changedMdxFiles).map(([filePath, content]) => ({
          path: `fern/${filePath}`,
          content,
          mode: "100644",
        })),
      });
      if (response.success) {
        console.log("Successfully committed changes:", response.commitSha);
      } else {
        console.error("Failed to commit changes:", response.error);
      }
    } catch (error) {
      console.error("Error committing changes:", error);
    } finally {
      setIsCommitting(false);
    }
  }

  async function handleCreatePrPress() {
    if (githubSource?.owner == null || githubSource.repo == null) {
      console.log("No github source found");
      return;
    }
    if (githubSource.baseBranch == null) {
      console.log("No base branch found");
      return;
    }
    await handleCreatePr({
      branch,
      owner: githubSource.owner,
      repo: githubSource.repo,
      baseBranch: githubSource.baseBranch,
    });
  }

  return (
    <div className="bg-background z-50 flex flex-wrap items-center justify-center gap-2 border-b border-gray-500 px-2 py-2 shadow-sm md:py-1">
      <div className="flex flex-1 items-center gap-2 text-left">
        <Button className="px-2" variant="ghost" size="iconSm" asChild>
          <a href={`/${orgName}/docs/${docsUrl}`}>
            <ArrowLeftIcon />
          </a>
        </Button>
        <p className="text-gray-900">{branch}</p>
      </div>
      <div className="flex items-center gap-2">
        <ProfileImage
          picture={picture}
          name={name}
          className="ring-primary border-3 border-white ring-2"
        />
        <div className="bg-(--grayscale-a2) border-border rounded-full border px-3 py-0.5">
          {/* TODO: Add undo button functionality */}
          <Button
            variant="ghost"
            className="cursor-not-allowed"
            size="iconSm"
            onClick={() => console.log("undo")}
          >
            <ArrowUturnLeftIcon />
          </Button>
          {/* TODO: Add redo button functionality */}
          <Button
            variant="ghost"
            className="cursor-not-allowed"
            size="iconSm"
            onClick={() => console.log("redo")}
          >
            <ArrowUturnRightIcon />
          </Button>
          {/* TODO: Add settings button functionality */}
          <Button
            variant="ghost"
            className="cursor-not-allowed"
            size="iconSm"
            onClick={() => console.log("settings")}
          >
            <SettingsIcon />
          </Button>
        </div>
      </div>
      <div className="flex flex-1 shrink-0 items-center justify-between gap-1 lg:justify-end">
        {/* TODO: Add preview button functionality */}
        <Button
          variant="ghost"
          size="sm"
          className="text-(--grayscale-a10) cursor-not-allowed"
        >
          <Globe />
          Preview
        </Button>
        {/* <Button variant="ghost">Files</Button> */}

        <div className="flex">
          <Button
            loading={isCommitting}
            disabled={isCommitting || Object.keys(changedMdxFiles).length === 0}
            className="rounded-r-none border-r-0"
            onClick={() => void handleCommitPress()}
          >
            <GithubLogo />
            Commit
          </Button>
          <Button
            variant="outline"
            className="rounded-l-none border-l-0"
            onClick={() => void handleCreatePrPress()}
          >
            <GithubLogo />
            Publish
          </Button>
        </div>
      </div>
    </div>
  );
}
