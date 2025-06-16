import { Auth0OrgName } from "@/app/services/auth0/types";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { HeaderToolbar } from "@/components/editor/HeaderToolbar";

export default async function AuthedLayout({
  params,
  children,
}: Readonly<{
  params: Promise<{ orgName: Auth0OrgName }>;
  children: React.JSX.Element;
}>) {
  const { orgName } = await params;

  return (
    <ProtectedRoute orgName={orgName}>
      <div className="flex w-full flex-col">
        <HeaderToolbar />
        {children}
      </div>
    </ProtectedRoute>
  );
}
