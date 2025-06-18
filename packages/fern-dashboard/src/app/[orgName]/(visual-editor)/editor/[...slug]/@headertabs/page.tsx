import { createEditableDocsLoader } from "@fern-api/docs-loader";
import { getHeaderTabs } from "@fern-api/docs-server/handle-node-fallbacks";
import { FernNavigation } from "@fern-api/fdr-sdk";
import { slugjoin } from "@fern-api/fdr-sdk/navigation";
import { HeaderTabsList } from "@fern-docs/components/HeaderTabsList";

import { getCurrentSession } from "@/app/services/auth0/getCurrentSession";

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

  const tabs = getHeaderTabs(foundNode, root, slug);

  if (tabs == null) {
    return null;
  }

  // const veTabs = tabs.map((tab) => {
  //   if (tab.type === "link") {
  //     return {
  //       ...tab,
  //       url: Url(`/${orgName}/editor/${tab.url}`),
  //     };
  //   }
  //   return {
  //     ...tab,
  //     href: slugToHref(
  //       convertToEditorRoute(
  //         orgName,
  //         hasRedirect(tab) ? tab.pointsTo : tab.slug
  //       )
  //     ),
  //   };
  // });

  return <HeaderTabsList tabs={tabs} />;
}
