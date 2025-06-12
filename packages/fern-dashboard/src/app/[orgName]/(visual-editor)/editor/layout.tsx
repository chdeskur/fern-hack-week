import { Auth0OrgName } from "@/app/services/auth0/types";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { VisualEditorLayout } from "@/components/layout/VisualEditorLayout";

export default async function AuthedLayout({
  params,
  children,
  headertabs,
  versionSelect,
  productSelect,
  sidebar,
  logo,
}: Readonly<{
  params: Promise<{ orgName: Auth0OrgName }>;
  children: React.JSX.Element;
  headertabs: React.ReactNode;
  versionSelect: React.ReactNode;
  productSelect: React.ReactNode;
  sidebar: React.ReactNode;
  logo: React.ReactNode;
}>) {
  const { orgName } = await params;

  return (
    <ProtectedRoute orgName={orgName}>
      <VisualEditorLayout
        logo={logo}
        headertabs={headertabs}
        versionSelect={versionSelect}
        productSelect={productSelect}
        sidebar={sidebar}
      >
        {children}
      </VisualEditorLayout>
    </ProtectedRoute>
  );
}
