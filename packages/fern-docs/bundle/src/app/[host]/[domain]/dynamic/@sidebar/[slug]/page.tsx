import "server-only";

import { FernNavigation } from "@fern-api/fdr-sdk";
import { slugjoin } from "@fern-api/fdr-sdk/navigation";

import { getFernToken } from "@/app/fern-token";
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
  const loader = await createCachedDocsLoader(
    host,
    domain,
    await getFernToken()
  );

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
        product: found?.currentProduct?.productId,
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
    if (
      mdx?.frontmatter?.layout === "page" ||
      mdx?.frontmatter?.layout === "custom"
    ) {
      isSingleOverviewPage = true;
    }

    if (found.sidebar.children.length <= 1) {
      let current: FernNavigation.NavigationNode | undefined =
        found.sidebar.children[0];
      isSingleOverviewPage = true;

      while (current && "children" in current) {
        if (current.children.length > 1) {
          isSingleOverviewPage = false;
          break;
        }
        current = current.children[0];
      }
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
