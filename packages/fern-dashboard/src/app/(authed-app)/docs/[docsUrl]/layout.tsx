import { getCurrentSessionOrThrow } from "@/app/services/auth0/getCurrentSession";
import { DocsSiteLayout } from "@/components/docs-page/DocsSiteLayout";
import { getAllFeatureFlags } from "@/components/posthog/feature-flags/server-side";
import { parseDocsUrlParam } from "@/utils/parseDocsUrlParam";

export default async function Layout({
  params,
  children,
}: Readonly<{
  params: Promise<{ docsUrl: string }>;
  children: React.JSX.Element;
}>) {
  const docsUrl = parseDocsUrlParam(await params);
  const { userId, orgId } = await getCurrentSessionOrThrow();

  return (
    <DocsSiteLayout
      docsUrl={docsUrl}
      orgId={orgId}
      featureFlags={await getAllFeatureFlags(userId)}
    >
      {children}
    </DocsSiteLayout>
  );
}
