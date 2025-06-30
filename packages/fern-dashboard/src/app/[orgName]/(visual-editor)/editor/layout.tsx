import { redirect } from "next/navigation";

import { getCurrentSession } from "@/app/services/auth0/getCurrentSession";
import { Auth0OrgName } from "@/app/services/auth0/types";
import { GithubExtendedAccessProtectedRoute } from "@/components/auth/GithubExtendedAccessProtectedRoute";
import { HeaderToolbar } from "@/components/editor/HeaderToolbar";
import { MdxStateProvider } from "@/providers/MdxStateContext";

export default async function AuthedLayout({
  params,
  children,
}: Readonly<{
  params: Promise<{ orgName: Auth0OrgName }>;
  children: React.JSX.Element;
}>) {
  const { orgName } = await params;
  const session = await getCurrentSession();

  if (!session) {
    redirect("/");
  }

  return (
    <GithubExtendedAccessProtectedRoute orgName={orgName}>
      <MdxStateProvider>
        <div className="flex w-full flex-col">
          <HeaderToolbar orgName={orgName} session={session} />
          {children}
        </div>
      </MdxStateProvider>
    </GithubExtendedAccessProtectedRoute>
  );
}
