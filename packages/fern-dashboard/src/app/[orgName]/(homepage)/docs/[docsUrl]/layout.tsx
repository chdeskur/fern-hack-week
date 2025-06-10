import { getCurrentSessionOrThrow } from "@/app/services/auth0/getCurrentSession";
import { DocsSiteLayout } from "@/components/docs-page/DocsSiteLayout";
import { getAllFeatureFlags } from "@/components/posthog/feature-flags/server-side";
import { parseDocsUrlParam } from "@/utils/parseDocsUrlParam";

export default async function Layout({
  params,
  children,
}: Readonly<{
  params: Promise<{ orgName: string; docsUrl: string }>;
  children: React.JSX.Element;
}>) {
  const { orgName, ..._params } = await params;
  const docsUrl = parseDocsUrlParam(_params);
  const session = await getCurrentSessionOrThrow();

  return (
    <DocsSiteLayout
      docsUrl={docsUrl}
      orgName={orgName}
      featureFlags={await getAllFeatureFlags(session.user.sub)}
    >
      <>{children}</>
    </DocsSiteLayout>
  );
}
