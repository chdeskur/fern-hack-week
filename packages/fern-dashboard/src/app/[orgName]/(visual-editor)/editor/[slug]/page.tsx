import { redirect } from "next/navigation";

import { createEditableDocsLoader } from "@fern-api/docs-loader";
import { FernNavigation } from "@fern-api/fdr-sdk";
import { getPageId, slugjoin } from "@fern-api/fdr-sdk/navigation";

import { getCurrentSession } from "@/app/services/auth0/getCurrentSession";

import PageEditor from "./PageEditor";
import PageSubtitle from "./PageSubtitle";
import PageTitle from "./PageTitle";
import { mdxToHtml } from "./mdxToHtml";

const ROOT_SLUG_ALIAS = "index";

export default async function Page({
  params,
}: {
  params: Promise<{ orgName: string; slug: string }>;
}) {
  const session = await getCurrentSession();

  if (session == null) {
    redirect("/");
  }

  const { orgName, slug: slugAlias } = await params;

  // TODO: dynamically read host value
  const loader = await createEditableDocsLoader(
    "localhost:3000",
    orgName,
    session?.accessToken
  );
  const root = await loader.getRoot();

  const slug = slugAlias === ROOT_SLUG_ALIAS ? root.slug : slugAlias;
  const pageNode = FernNavigation.utils.findNode(root, slugjoin(slug));

  const pageId =
    pageNode.type === "found" ? getPageId(pageNode.node) : undefined;

  // If the page is not found, redirect to the root (index) page
  if (!pageId) {
    redirect(`/${orgName}/editor/${ROOT_SLUG_ALIAS}`);
  }

  const page = pageId && (await loader.getPage(pageId));
  const html = page?.markdown && (await mdxToHtml(page?.markdown));

  return (
    <div className="flex flex-col gap-2 py-12">
      <PageTitle
        className="w-full max-w-2xl"
        initialText={page.filename} // TODO: get title from page
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
  );
}
