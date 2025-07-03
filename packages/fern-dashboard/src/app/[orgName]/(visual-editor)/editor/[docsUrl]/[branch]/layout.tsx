import { redirect } from "next/navigation";

import { getCurrentSession } from "@/app/services/auth0/getCurrentSession";
import { Auth0OrgName } from "@/app/services/auth0/types";
import { GithubExtendedAccessProtectedRoute } from "@/components/auth/GithubExtendedAccessProtectedRoute";
import { HeaderToolbar } from "@/components/editor/HeaderToolbar";
import { BranchProvider } from "@/providers/BranchContext";
import { MdxStateProvider } from "@/providers/MdxStateContext";
import { DocsUrl } from "@/utils/types";

export default async function AuthedLayout({
  params,
  children,
}: Readonly<{
  params: Promise<{
    orgName: Auth0OrgName;
    docsUrl: DocsUrl;
    branch: string;
  }>;
  children: React.JSX.Element;
}>) {
  const { orgName, docsUrl, branch } = await params;
  const session = await getCurrentSession();

  if (!session) {
    redirect("/");
  }

  return (
    <GithubExtendedAccessProtectedRoute orgName={orgName}>
      <MdxStateProvider>
        <BranchProvider branch={branch}>
          <div className="bg-background flex w-full flex-col overflow-hidden">
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
