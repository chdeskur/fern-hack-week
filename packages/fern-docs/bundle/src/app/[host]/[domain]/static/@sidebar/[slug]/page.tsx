import "server-only";

import { createCachedDocsLoader } from "@fern-api/docs-loader";
import {
  getIsSidebarFixed,
  getIsSingleOverviewPage,
} from "@fern-api/docs-utils";
import { FernNavigation } from "@fern-api/fdr-sdk";
import { slugjoin } from "@fern-api/fdr-sdk/navigation";
import { SidebarTabsList } from "@fern-docs/components/sidebar/SidebarTabsList";
import { SidebarTabsRootServer } from "@fern-docs/components/sidebar/SidebarTabsRootServer";
import { SidebarRootNode } from "@fern-docs/components/sidebar/nodes/SidebarRootNode";
import { HiddenSidebar } from "@fern-docs/components/theming/HiddenSidebar";

export default async function SidebarPage({
  params,
}: {
  params: Promise<{ host: string; domain: string; slug: string }>;
}) {
  const { host, domain, slug } = await params;
  const loader = await createCachedDocsLoader(host, domain);
  const config = await loader.getConfig();
  const isSidebarFixed = getIsSidebarFixed(config);

  const rootPromise = loader.getRoot();

  // preload:
  await Promise.all([
    loader.getLayout(),
    loader.getAuthState(),
    loader.getEdgeFlags(),
  ]);

  const found = FernNavigation.utils.findNode(
    await rootPromise,
    slugjoin(slug)
  );
  if (found.type !== "found") {
    return null;
  }

  // these are all the "visible" nodes to prevent pruning if any of these nodes are hidden
  const visibleNodes = [...found.parents, found.node];
  const visibleNodeIds = visibleNodes.map((node) => node.id);

  const isSingleOverviewPage = getIsSingleOverviewPage(found);

  return (
    <>
      {found.tabs && found.tabs.length > 0 && (
        <SidebarTabsRootServer loader={loader}>
          <SidebarTabsList tabs={found.tabs} />
        </SidebarTabsRootServer>
      )}
      {isSingleOverviewPage && !isSidebarFixed ? (
        <HiddenSidebar />
      ) : (
        <SidebarRootNode
          root={found.sidebar}
          visibleNodeIds={visibleNodeIds}
          loader={loader}
        />
      )}
    </>
  );
}
