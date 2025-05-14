import "server-only";

import { FernNavigation } from "@fern-api/fdr-sdk";
import { isVersionNode, slugjoin } from "@fern-api/fdr-sdk/navigation";

import { getFernToken } from "@/app/fern-token";
import { VersionDropdown } from "@/components/header/VersionDropdown";
import { createCachedDocsLoader } from "@/server/docs-loader";

export default async function VersionSelectPage({
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
  const [layout, _auth, _flags] = await Promise.all([
    loader.getLayout(),
    loader.getAuthState(),
    loader.getEdgeFlags(),
  ]);
  const useDenseLayout = layout.isHeaderDisabled;

  const foundNode = FernNavigation.utils.findNode(
    await rootPromise,
    slugjoin(slug)
  );
  if (foundNode.type !== "found") {
    return null;
  }
  const version = foundNode.parents.find(isVersionNode);

  return (
    <VersionDropdown
      loader={loader}
      currentNode={foundNode.node}
      slugMap={foundNode.collector.slugMap}
      parents={Array.from(foundNode.parents)}
      fallbackVersion={version}
      useDenseLayout={useDenseLayout}
    />
  );
}
