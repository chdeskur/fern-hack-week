import { createEditableDocsLoader } from "@fern-api/docs-loader";
import { FernNavigation } from "@fern-api/fdr-sdk";
import { slugjoin } from "@fern-api/fdr-sdk/navigation";

import { getCurrentSession } from "@/app/services/auth0/getCurrentSession";

// import { HeaderTabsList } from "@/components/header/HeaderTabsList";
// import { getHeaderTabs } from "@/components/util/handle-node-fallbacks";

export default async function HeaderTabsPage({
  params,
}: {
  params: Promise<{ orgName: string; slug: string }>;
}) {
  const { orgName, slug } = await params;
  const session = await getCurrentSession();
  const loader = await createEditableDocsLoader(
    "localhost:3000",
    orgName,
    session?.accessToken
  );
  const layout = await loader.getLayout();

  if (layout.tabsPlacement !== "HEADER") {
    return null;
  }

  const root = await loader.getRoot();

  const foundNode = FernNavigation.utils.findNode(root, slugjoin(slug));
  console.log(foundNode);

  return <div>Header Tabs</div>;

  // const tabs = getHeaderTabs(foundNode, root, slug);

  // if (tabs == null) {
  //   return null;
  // }

  // return <HeaderTabsList tabs={tabs} />;
}
