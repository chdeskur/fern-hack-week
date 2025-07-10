import { headers } from "next/headers";

import { createEditableDocsLoader } from "@fern-api/docs-loader";
import { getHeaderTabs } from "@fern-api/docs-server/handle-node-fallbacks";
import { FernNavigation } from "@fern-api/fdr-sdk";
import { slugjoin } from "@fern-api/fdr-sdk/navigation";
import { HeaderTabsList } from "@fern-docs/components/HeaderTabsList";

import { getCurrentSession } from "@/app/services/auth0/getCurrentSession";
import { EncodedDocsUrl } from "@/utils/types";

export default async function HeaderTabsPage({
  params,
}: {
  params: Promise<{ docsUrl: EncodedDocsUrl; slug: string }>;
}) {
  const { docsUrl, slug } = await params;
  const session = await getCurrentSession();
  const headersObj = await headers();
  const loader = await createEditableDocsLoader(
    headersObj.get("host") ?? "localhost:3000",
    docsUrl,
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

  return <HeaderTabsList tabs={tabs} />;
}
