import "server-only";

import { FernNavigation } from "@fern-api/fdr-sdk";
import { isProductNode, slugjoin } from "@fern-api/fdr-sdk/navigation";

import { getFernToken } from "@/app/fern-token";
import { ProductDropdown } from "@/components/header/ProductDropdown";
import { createCachedDocsLoader } from "@/server/docs-loader";

export default async function ProductSelectPage({
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
  const layout = await loader.getLayout();
  const useDenseLayout = layout.isHeaderDisabled;
  await loader.getAuthState();
  await loader.getEdgeFlags();

  const foundNode = FernNavigation.utils.findNode(
    await rootPromise,
    slugjoin(slug)
  );
  if (foundNode.type !== "found") {
    return null;
  }

  const product = foundNode.parents.find(isProductNode);
  if (product == null) {
    return null;
  }

  return (
    <ProductDropdown
      loader={loader}
      fallbackProduct={product}
      useDenseLayout={useDenseLayout}
    />
  );
}
