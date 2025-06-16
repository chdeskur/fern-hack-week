// import "server-only";

// import { createCachedDocsLoader } from "@fern-api/docs-loader";
// import { FernNavigation } from "@fern-api/fdr-sdk";
// import { slugjoin } from "@fern-api/fdr-sdk/navigation";

// import { SidebarTabsList } from "@/components/sidebar/SidebarTabsList";
// import { SidebarTabsRootServer } from "@/components/sidebar/SidebarTabsRootServer";
// import { SidebarRootNode } from "@/components/sidebar/nodes/SidebarRootNode";
// import { HiddenSidebar } from "@/state/layout";

export default async function SidebarPage({
  params,
}: {
  params: Promise<{ orgName: string; slug: string }>;
}) {
  console.log("params", params);
  // const { orgName, slug } = await params;
  // const session = await getCurrentSession();
  // const loader = await createEditableDocsLoader(
  //   "localhost:3000",
  //   orgName,
  //   session?.accessToken
  // );
  // const [layout, root] = await Promise.all([
  //   loader.getLayout(),
  //   loader.getRoot(),
  // ]);

  // const found = FernNavigation.utils.findNode(root, slugjoin(slug));
  // if (found.type !== "found") {
  //   return null;
  // }

  // // these are all the "visible" nodes to prevent pruning if any of these nodes are hidden
  // const visibleNodes = [...found.parents, found.node];
  // const visibleNodeIds = visibleNodes.map((node) => node.id);

  // const singleOverviewPage = isSingleOverviewPage(found);

  // let isSingleOverviewPage = false;
  // if (
  //   found.sidebar != null &&
  //   found.sidebar.children.length <= 1 &&
  //   found.node.type === "page"
  // ) {
  //   // check if there is only one page in the sidebar

  //   if (found.sidebar.children.length <= 1) {
  //     let current: FernNavigation.NavigationNode | undefined =
  //       found.sidebar.children[0];
  //     isSingleOverviewPage = true;

  //     while (current && "children" in current) {
  //       if (current.children.length > 1) {
  //         isSingleOverviewPage = false;
  //         break;
  //       }
  //       current = current.children[0];
  //     }
  //   }
  // }

  return (
    <>
      <div className="border-border h-[500px] border-r">Sidebar</div>
      {/* {found.tabs && found.tabs.length > 0 && (
        <SidebarTabsRootServer loader={loader}>
          <SidebarTabsList tabs={found.tabs} />
        </SidebarTabsRootServer>
      )}
      {singleOverviewPage && !isSidebarFixed ? (
        <HiddenSidebar />
      ) : (
        <SidebarRootNode
          root={found.sidebar}
          visibleNodeIds={visibleNodeIds}
          loader={loader}
        />
      )} */}
    </>
  );
}
