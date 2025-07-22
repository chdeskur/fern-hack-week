import { Auth0OrgName } from "@/app/services/auth0/types";
import { DocsSiteLayout } from "@/components/docs-page/DocsSiteLayout";
import { parseDocsUrlParam } from "@/utils/parseDocsUrlParam";
import { EncodedDocsUrl } from "@/utils/types";

export default async function Layout({
  params,
  children,
}: Readonly<{
  params: Promise<{ orgName: Auth0OrgName; docsUrl: EncodedDocsUrl }>;
  children: React.JSX.Element;
}>) {
  const { orgName, ..._params } = await params;
  const docsUrl = parseDocsUrlParam(_params);

  return (
    <DocsSiteLayout docsUrl={docsUrl} orgName={orgName}>
      <>{children}</>
    </DocsSiteLayout>
  );
}
