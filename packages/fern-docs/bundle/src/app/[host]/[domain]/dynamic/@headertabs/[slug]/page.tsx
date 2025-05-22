import "server-only";

import { FernNavigation } from "@fern-api/fdr-sdk";
import { slugjoin } from "@fern-api/fdr-sdk/navigation";

import { getFernToken } from "@/app/fern-token";
import { HeaderTabsList } from "@/components/header/HeaderTabsList";
import { getHeaderTabs } from "@/components/util/handle-node-fallbacks";
import { createCachedDocsLoader } from "@/server/docs-loader";

export default async function HeaderTabsPage({
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
