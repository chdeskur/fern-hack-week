import { useEffect } from "react";
import { useState } from "react";

import { Edit } from "lucide-react";

import { getLoadableValue } from "@fern-ui/loadable";

import { useGithubSourceRepo } from "@/state/useGithubSourceRepo";
import { DocsUrl } from "@/utils/types";

import { GithubLogo } from "../auth/GithubLogo";
import { ExternalHoverLink } from "../ui/ExternalHoverLink";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { SetGithubSourcePopover } from "./SetGithubSource";

export function GithubSource({ docsUrl }: { docsUrl: DocsUrl }) {
  const [githubUrl, setGithubUrl] = useState<string | undefined>(undefined);
  const [repoName, setRepoName] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const githubSource = getLoadableValue(useGithubSourceRepo(docsUrl));

  useEffect(() => {
    if (!githubSource) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
      setGithubUrl(githubSource.githubUrl);
      setRepoName(githubSource.repoName);
    }
  }, [docsUrl, githubSource]);

  return (
    <div className="flex w-fit flex-col gap-2">
      <p>Source</p>
      {isLoading ? (
        <Skeleton className="h-4 w-24" />
      ) : (
        <div className="flex items-center gap-1">
          {!!githubUrl && (
            <div className="flex items-center gap-2">
              <GithubLogo />
              <ExternalHoverLink href={githubUrl} displayHref={repoName} />
            </div>
          )}
          <SetGithubSourcePopover docsUrl={docsUrl} setIsSaving={setIsSaving}>
            {githubUrl ? (
              <Button size="sm" variant="outline" disabled={isSaving}>
                <Edit />
                Edit
              </Button>
            ) : (
              <Button size="sm" className="w-fit" disabled={isSaving}>
                <GithubLogo />
                {isSaving ? "Saving..." : "Connect Repo"}
              </Button>
            )}
          </SetGithubSourcePopover>
        </div>
      )}
    </div>
  );
}
