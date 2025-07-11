import { redirect } from "next/navigation";

import getDocsGithubSourceHandler from "@/app/api/get-docs-github-source/handler";
import { getCurrentSession } from "@/app/services/auth0/getCurrentSession";
import { Auth0OrgName } from "@/app/services/auth0/types";
import { GithubExtendedAccessProtectedRoute } from "@/components/auth/GithubExtendedAccessProtectedRoute";
import { HeaderToolbar } from "@/components/editor/HeaderToolbar";
import { BranchProvider } from "@/providers/BranchContext";
import { MdxStateProvider } from "@/providers/MdxStateContext";
import { throwDigestibleError } from "@/utils/errors";
import { parseDocsUrlParam } from "@/utils/parseDocsUrlParam";
import { EncodedDocsUrl } from "@/utils/types";

export default async function EditorLayout({
  params,
  children,
}: Readonly<{
  params: Promise<{
    orgName: Auth0OrgName;
    docsUrl: EncodedDocsUrl;
    branch: string;
  }>;
  children: React.JSX.Element;
}>) {
  const { orgName, docsUrl: encodedDocsUrl, branch } = await params;
  const docsUrl = parseDocsUrlParam({ docsUrl: encodedDocsUrl });
  const session = await getCurrentSession();

  if (!session) {
    redirect("/");
  }

  const sourceRepo = await getDocsGithubSourceHandler({
    url: docsUrl,
    token: session.accessToken,
    userId: session.user.sub,
  });

  if (
    sourceRepo.owner == null ||
    sourceRepo.repo == null ||
    sourceRepo.githubUrl == null
  ) {
    throwDigestibleError(
      "We were unable to find the source repo for this domain. Please confirm that you have linked a repo to this domain.",
      "SOURCE_REPO_NOT_FOUND"
    );
  }

  if (sourceRepo.baseBranch == null) {
    throwDigestibleError(
      "Looks like your source repo is not configured correctly. Please set a base branch on your Github repo.",
      "BASE_BRANCH_NOT_SET"
    );
  }

  // TODO: validate branch elsewhere
  // const response = await validateGithubBranchHandler({
  //   owner: sourceRepo.owner,
  //   repo: sourceRepo.repo,
  //   branchName: branch,
  //   userId: session.user.sub,
  // });

  // if (!response.exists) {
  //   throwDigestibleError(
  //     `We were unable to find your working branch. Please confirm that the Github branch "${branch}" exists and has not been deleted.`,
  //     "BRANCH_NOT_FOUND"
  //   );
  // }

  return (
    <GithubExtendedAccessProtectedRoute
      orgName={orgName}
      owner={sourceRepo.owner}
      repo={sourceRepo.repo}
    >
      <MdxStateProvider docsUrl={docsUrl}>
        <BranchProvider branch={branch}>
          <div className="bg-background noise flex w-full flex-col overflow-hidden">
            <HeaderToolbar
              orgName={orgName}
              session={session}
              docsUrl={docsUrl}
            />
            {children}
          </div>
        </BranchProvider>
      </MdxStateProvider>
    </GithubExtendedAccessProtectedRoute>
  );
}
