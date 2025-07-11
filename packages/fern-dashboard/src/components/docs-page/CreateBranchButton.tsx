import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCallback } from "react";

import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { ArrowRight, Loader2 } from "lucide-react";

import {
  FernTooltip,
  FernTooltipProvider,
} from "@fern-docs/components/FernTooltip";

import { Auth0SessionData } from "@/app/services/auth0/getCurrentSession";
import { Auth0OrgName } from "@/app/services/auth0/types";
import { DashboardApiClient } from "@/app/services/dashboard-api/client";
import { ROOT_SLUG_ALIAS, constructEditorSlug } from "@/utils/editor-routing";
import { DocsUrl, EncodedDocsUrl } from "@/utils/types";

import {
  ErrorCreateBranchToast,
  ErrorNoBaseBranchToast,
  ErrorNoGithubSourceToast,
} from "../editor/EditorToasts";
import { Button } from "../ui/button";

export function CreateBranchButton({
  orgName,
  docsUrl,
  session,
  sourceRepo,
  disabled = false,
  disabledReason,
}: {
  orgName: Auth0OrgName;
  docsUrl: DocsUrl;
  session: Auth0SessionData;
  sourceRepo: any;
  disabled?: boolean;
  disabledReason?: string;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const createBranch = useCallback(async () => {
    if (sourceRepo?.owner == null || sourceRepo.repo == null) {
      ErrorNoGithubSourceToast();
      return;
    }
    if (sourceRepo.baseBranch == null) {
      ErrorNoBaseBranchToast();
      return;
    }
    const randomHexString = crypto.randomUUID().split("-")[0];

    const branchName =
      new Date().toISOString().split("T")[0] +
      "-" +
      session.user.name?.toLowerCase().replaceAll(" ", "_") +
      "-" +
      randomHexString;

    const response = await DashboardApiClient.postCreateBranch({
      owner: sourceRepo.owner,
      repo: sourceRepo.repo,
      branch: branchName,
      baseBranch: sourceRepo.baseBranch,
    });
    if (response.success === false) {
      ErrorCreateBranchToast();
      setIsLoading(false);
      return;
    }
    router.refresh();
    router.push(
      constructEditorSlug({
        orgName,
        docsUrl: encodeURIComponent(docsUrl) as EncodedDocsUrl,
        branchName,
        slug: ROOT_SLUG_ALIAS,
      })
    );
    setIsLoading(false);
  }, [sourceRepo, session.user.name, orgName, docsUrl, router]);

  return (
    <div className="flex flex-row items-center gap-1">
      <Button
        size="sm"
        className="w-fit"
        onClick={() => {
          setIsLoading(true);
          void createBranch();
        }}
        disabled={isLoading || disabled}
      >
        {isLoading ? (
          <Loader2 className="animate-spin" />
        ) : (
          <>
            Go to Editor
            <ArrowRight />
          </>
        )}
      </Button>
      {disabled && disabledReason && (
        <FernTooltipProvider delayDuration={0}>
          <FernTooltip content={disabledReason}>
            <button
              type="button"
              className="cursor-help border-0 bg-transparent p-0"
              aria-label="More information"
            >
              <ExclamationCircleIcon className="h-4 w-4 text-red-600" />
            </button>
          </FernTooltip>
        </FernTooltipProvider>
      )}
    </div>
    // NOTE: This is the UI we want when we have a way to preview branches.
    // <Button
    //   variant="outline"
    //   size="sm"
    //   className="text-primary hover:text-primary"
    //   onClick={() => {
    //     setIsLoading(true);
    //     void createBranch();
    //   }}
    //   disabled={isLoading}
    // >
    //   <PencilSquareIcon className="text-primary" />
    //   Create a Branch
    // </Button>
  );
}
