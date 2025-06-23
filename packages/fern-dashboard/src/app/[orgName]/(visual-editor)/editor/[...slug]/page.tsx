import { redirect } from "next/navigation";

import { createEditableDocsLoader } from "@fern-api/docs-loader";
import { FernNavigation } from "@fern-api/fdr-sdk";
import { getPageId, slugjoin } from "@fern-api/fdr-sdk/navigation";
import { AbstractLayoutEvaluatorContent } from "@fern-docs/components/layouts/AbstractLayoutEvaluatorContent";
import { SetCurrentNavigationNode } from "@fern-docs/components/state/navigation";

import { getCurrentSession } from "@/app/services/auth0/getCurrentSession";

import PageEditor from "./PageEditor";
import PageSubtitle from "./PageSubtitle";
import PageTitle from "./PageTitle";
import { mdxToHtml } from "./mdxToHtml";

const ROOT_SLUG_ALIAS = "index";

export default async function Page({
  params,
}: {
  params: Promise<{ orgName: string; slug: string[] }>;
}) {
  const session = await getCurrentSession();

  if (session == null) {
    redirect("/");
  }

  const { orgName, slug: slugArray } = await params;
  const slugAlias = slugArray.join("/");

  // TODO: dynamically read host value
  const loader = await createEditableDocsLoader(
    "localhost:3000",
    orgName,
    session?.accessToken
  );
  const root = await loader.getRoot();

  const slug = slugAlias === ROOT_SLUG_ALIAS ? root.slug : slugAlias;
  const foundNode = FernNavigation.utils.findNode(root, slugjoin(slug));

  // If the page is not found, redirect to the root (index) page
  if (foundNode.type !== "found") {
    redirect(`/${orgName}/editor/${ROOT_SLUG_ALIAS}`);
  }

  const pageId = getPageId(foundNode.node);

  const page = pageId && (await loader.getPage(pageId));
  const html = page?.markdown && (await mdxToHtml(page?.markdown));

  return (
    // TODO: Currently, we are force-hiding the table of contents is within Visual Editor.
    // This is a temporary solution, as I anticipate we will want the TOC to be dynamic based
    // on the tiptap editor's content.
    <AbstractLayoutEvaluatorContent tableOfContents={[]}>
      <div className="flex w-full flex-col gap-2 py-12">
        <SetCurrentNavigationNode
          nodeId={foundNode.node.id}
          sidebarRootNodeId={foundNode.sidebar?.id}
          tabId={foundNode.currentTab?.id}
          productId={foundNode.currentProduct?.productId}
          productSlug={foundNode.currentProduct?.slug}
          versionId={foundNode.currentVersion?.versionId}
          versionSlug={foundNode.currentVersion?.slug}
          versionIsDefault={foundNode.isCurrentVersionDefault}
          productIsDefault={foundNode.isCurrentProductDefault}
        />
        <PageTitle
          className="w-full max-w-2xl"
          initialText={page?.filename ?? ""} // TODO: get title from page
          orgName={orgName}
          slug={slug}
        />
        <PageSubtitle
          className="w-full max-w-2xl"
          initialText={""} // TODO: get subtitle from page
          orgName={orgName}
          slug={slug}
        />
        {html && (
          <PageEditor
            className="w-full max-w-2xl"
            initialHtml={html}
            orgName={orgName}
            slug={slug}
          />
        )}
      </div>
    </AbstractLayoutEvaluatorContent>
  );
}
