import { redirect } from "next/navigation";

import getDocsGithubSourceHandler from "@/app/api/get-docs-github-source/handler";
import { getCurrentSession } from "@/app/services/auth0/getCurrentSession";
import { Auth0OrgName } from "@/app/services/auth0/types";
import { GithubExtendedAccessProtectedRoute } from "@/components/auth/GithubExtendedAccessProtectedRoute";
import { HeaderToolbar } from "@/components/editor/HeaderToolbar";
import { BranchProvider } from "@/providers/BranchContext";
import { MdxStateProvider } from "@/providers/MdxStateContext";
import { parseDocsUrlParam } from "@/utils/parseDocsUrlParam";
import { EncodedDocsUrl } from "@/utils/types";

export default async function AuthedLayout({
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

  return (
    <GithubExtendedAccessProtectedRoute
      orgName={orgName}
      owner={sourceRepo.owner}
      repo={sourceRepo.repo}
    >
      <MdxStateProvider>
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
