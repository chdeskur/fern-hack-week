"use client";

import { useEffect } from "react";
import { useState } from "react";

import { Cog } from "lucide-react";

import { getLoadableValue } from "@fern-ui/loadable";

import { Auth0SessionData } from "@/app/services/auth0/getCurrentSession";
import { Auth0OrgName } from "@/app/services/auth0/types";
import { useGithubSourceRepo } from "@/state/useGithubSourceRepo";
import { DocsUrl } from "@/utils/types";

import { GithubLogo } from "../auth/GithubLogo";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { useGithubPermissions } from "./GithubPermissionsContext";
import { GoToEditorButton } from "./GoToEditorButton";
import { SetGithubSourcePopover } from "./SetGithubSource";

export function GithubSource({
  docsUrl,
  orgName,
  session,
}: {
  docsUrl: DocsUrl;
  orgName: Auth0OrgName;
  session: Auth0SessionData;
}) {
  const [githubUrl, setGithubUrl] = useState<string | undefined>(undefined);
  const [repoName, setRepoName] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const githubSource = getLoadableValue(useGithubSourceRepo(docsUrl));
  const { writePermission } = useGithubPermissions();

  useEffect(() => {
    if (!githubSource) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
      setGithubUrl(githubSource.githubUrl);
      setRepoName(githubSource.repoName);
    }
  }, [docsUrl, githubSource]);

  const [isDomainHovered, setIsDomainHovered] = useState(false);

  return (
    <>
      {isLoading ? (
        <Skeleton className="h-4 w-24" />
      ) : (
        <>
          <div
            className="flex flex-wrap items-center gap-2"
            onMouseEnter={() => setIsDomainHovered(true)}
            onMouseLeave={() =>
              // Added delay to make the Edit button visible for a bit longer (easier UX to click)
              setTimeout(() => setIsDomainHovered(false), 500)
            }
          >
            {!!githubUrl && (
              <div className="flex items-center gap-2">
                <GithubLogo />
                <a href={githubUrl} className="dashboard-link">
                  <span className="truncate">{repoName}</span>
                </a>
              </div>
            )}
            {isDomainHovered && (
              <SetGithubSourcePopover
                docsUrl={docsUrl}
                setIsSaving={setIsSaving}
              >
                {githubUrl ? (
                  <Button
                    size="iconSm"
                    variant="ghost"
                    disabled={isSaving}
                    className="size-4 p-0"
                  >
                    <Cog />
                  </Button>
                ) : (
                  <Button size="sm" className="w-fit" disabled={isSaving}>
                    <GithubLogo />
                    {isSaving ? "Saving..." : "Connect Repo"}
                  </Button>
                )}
              </SetGithubSourcePopover>
            )}
          </div>
          {!!githubUrl && githubSource && (
            <GoToEditorButton
              orgName={orgName}
              docsUrl={docsUrl}
              session={session}
              sourceRepo={githubSource}
              disabled={writePermission === false}
              disabledReason={
                writePermission === false
                  ? "You don't have write access to this repo"
                  : undefined
              }
            />
          )}
        </>
      )}
    </>
  );
}
