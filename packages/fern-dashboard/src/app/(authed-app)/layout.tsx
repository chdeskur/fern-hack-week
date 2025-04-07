import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { AppLayout } from "@/components/layout/AppLayout";
import { ServerSidePylonSetup } from "@/components/pylon/ServerSidePylonSetup";

export default async function AuthedLayout({
  children,
}: Readonly<{
  children: React.JSX.Element;
}>) {
  return (
    <ProtectedRoute>
      <>
        <ServerSidePylonSetup />
        <AppLayout>{children}</AppLayout>
      </>
    </ProtectedRoute>
  );
}
