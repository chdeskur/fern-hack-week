import "server-only";

import { FernNavigation } from "@fern-api/fdr-sdk";
import { slugjoin } from "@fern-api/fdr-sdk/navigation";

import { SidebarTabsList } from "@/components/sidebar/SidebarTabsList";
import { SidebarTabsRootServer } from "@/components/sidebar/SidebarTabsRootServer";
import { SidebarRootNode } from "@/components/sidebar/nodes/SidebarRootNode";
import { createCachedDocsLoader } from "@/server/docs-loader";
import { createCachedMdxSerializer } from "@/server/mdx-serializer";

export default async function SidebarPage({
  params,
}: {
  params: Promise<{ host: string; domain: string; slug: string }>;
}) {
  const { host, domain, slug } = await params;
  const loader = await createCachedDocsLoader(host, domain);

  const rootPromise = loader.getRoot();

  // preload:
  await loader.getLayout();
  await loader.getAuthState();
  await loader.getEdgeFlags();

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

  let isSingleOverviewPage = false;
  if (
    found.sidebar != null &&
    found.sidebar.children.length <= 1 &&
    found.node.type === "page"
  ) {
    const serialize = createCachedMdxSerializer(loader, {
      scope: {
        version: found?.currentVersion?.versionId,
        tab: found?.currentTab?.title,
      },
    });
    // For page nodes, we need to get the page to check if it's a landing page
    const page = await loader.getPage(found.node.pageId);
    const mdx = await serialize(page.markdown, {
      filename: page.filename,
      slug: found.node.slug,
      toc: true, // this is probably already cached with toc: true
    });
    if (mdx?.frontmatter?.layout === "overview") {
      isSingleOverviewPage = true;
    }
  }

  return (
    <>
      {found.tabs && found.tabs.length > 0 && (
        <SidebarTabsRootServer loader={loader}>
          <SidebarTabsList tabs={found.tabs} />
        </SidebarTabsRootServer>
      )}
      {!isSingleOverviewPage && (
        <SidebarRootNode
          root={found.sidebar}
          visibleNodeIds={visibleNodeIds}
          loader={loader}
        />
      )}
    </>
  );
}
