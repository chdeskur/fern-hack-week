import "server-only";

import { createCachedDocsLoader } from "@fern-api/docs-loader";
import { getHeaderTabs } from "@fern-api/docs-server/handle-node-fallbacks";
import { FernNavigation } from "@fern-api/fdr-sdk";
import { slugjoin } from "@fern-api/fdr-sdk/navigation";
import { HeaderTabsList } from "@fern-docs/components/HeaderTabsList";

export default async function HeaderTabsPage({
  params,
}: {
  params: Promise<{ host: string; domain: string; slug: string }>;
}) {
  const { host, domain, slug } = await params;
  const loader = await createCachedDocsLoader(host, domain);
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
