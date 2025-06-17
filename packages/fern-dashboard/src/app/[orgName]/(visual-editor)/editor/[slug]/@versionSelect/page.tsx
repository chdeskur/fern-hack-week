import "server-only";

import { createEditableDocsLoader } from "@fern-api/docs-loader";
import {
  getFallbackProduct,
  getFallbackVersion,
} from "@fern-api/docs-server/handle-node-fallbacks";
import { FernNavigation } from "@fern-api/fdr-sdk";
import { slugjoin } from "@fern-api/fdr-sdk/navigation";

import { getCurrentSession } from "@/app/services/auth0/getCurrentSession";

export default async function VersionSelectPage({
  params,
}: {
  params: Promise<{ orgName: string; slug: string }>;
}) {
  console.log("params", params);
  const session = await getCurrentSession();
  const { orgName, slug } = await params;
  const loader = await createEditableDocsLoader(
    "localhost:3000",
    orgName,
    session?.accessToken
  );

  // preload:
  const [layout, _auth, _flags, root] = await Promise.all([
    loader.getLayout(),
    loader.getAuthState(),
    loader.getEdgeFlags(),
    loader.getRoot(),
  ]);
  const _useDenseLayout = layout.isHeaderDisabled;

  const foundNode = FernNavigation.utils.findNode(root, slugjoin(slug));
  const collector = FernNavigation.NodeCollector.collect(root);
  const versionNodes = collector.getVersionNodes();

  if (versionNodes.length === 0) {
    return null;
  }

  const _currentProduct = getFallbackProduct(foundNode, root, slug);
  const version = getFallbackVersion(foundNode, root, slug);

  if (version == null) {
    return null;
  }

  const _currentNode = foundNode.type === "found" ? foundNode.node : version;

  const _parents =
    foundNode.type === "found" ? Array.from(foundNode.parents) : [];

  return <div>Version Select</div>;
  //   return (
  //     <VersionDropdown
  //       loader={loader}
  //       currentNode={currentNode}
  //       currentProduct={currentProduct ?? undefined}
  //       slugMap={collector.slugMap}
  //       parents={parents}
  //       fallbackVersion={version}
  //       useDenseLayout={useDenseLayout}
  //     />
  //   );
}
