import { redirect } from "next/navigation";

import { createEditableDocsLoader } from "@fern-api/docs-loader";

import getDocsGithubSourceHandler from "@/app/api/get-docs-github-source/handler";
import validateGithubBranchHandler from "@/app/api/get-validate-github-branch/handler";
import { getCurrentSession } from "@/app/services/auth0/getCurrentSession";
import { Auth0OrgName } from "@/app/services/auth0/types";
import { GithubExtendedAccessProtectedRoute } from "@/components/auth/GithubExtendedAccessProtectedRoute";
import { HeaderToolbar } from "@/components/editor/HeaderToolbar";
import { BranchProvider } from "@/providers/BranchContext";
import { MdxStateProvider } from "@/providers/MdxStateContext";
import { getHostFromHeaders } from "@/utils/getHostFromHeaders";
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

  // We create an editable docs loader here to see if it will throw an error. If it does,
  // it will be caught by our error boundary and prevent us from going to the editor.
  const host = await getHostFromHeaders();
  await createEditableDocsLoader(host, docsUrl, session?.accessToken);

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
    throw new Error(
      "We were unable to find the source repo for this domain. Please confirm that you have linked a repo to this domain."
    );
  }

  if (sourceRepo.baseBranch == null) {
    throw new Error(
      "Looks like your source repo is not configured correctly. Please set a base branch on your Github repo."
    );
  }

  const response = await validateGithubBranchHandler({
    owner: sourceRepo.owner,
    repo: sourceRepo.repo,
    branchName: branch,
    userId: session.user.sub,
  });

  if (!response.exists) {
    throw new Error(
      `We were unable to find your working branch. Please confirm that the Github branch "${branch}" exists and has not been deleted.`
    );
  }

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
