import "server-only";

import { createEditableDocsLoader } from "@fern-api/docs-loader";
import { getFallbackProduct } from "@fern-api/docs-server/handle-node-fallbacks";
import { FernNavigation } from "@fern-api/fdr-sdk";
import { slugjoin } from "@fern-api/fdr-sdk/navigation";

import { getCurrentSession } from "@/app/services/auth0/getCurrentSession";

export default async function ProductSelectPage({
  params,
}: {
  params: Promise<{ orgName: string; slug: string }>;
}) {
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

  const fallbackProduct = getFallbackProduct(foundNode, root, slug);
  if (fallbackProduct == null) {
    return null;
  }

  return (
    <div>Product Select: {fallbackProduct.id}</div>
    // <ProductDropdown
    //   loader={loader}
    //   fallbackProduct={fallbackProduct}
    //   useDenseLayout={useDenseLayout}
    // />
  );
}
