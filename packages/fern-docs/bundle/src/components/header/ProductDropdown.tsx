import { FernNavigation } from "@fern-api/fdr-sdk";

import { DocsLoader } from "@/server/docs-loader";

import { FaIconServer } from "../fa-icon-server";
import {
  ProductDropdownClient,
  ProductDropdownItem,
} from "./ProductDropdownClient";

export declare namespace ProductDropdown {
  export interface Props {}
}

export async function ProductDropdown({
  loader,
  fallbackProduct,
  useDenseLayout = false,
}: {
  loader: DocsLoader;
  fallbackProduct: FernNavigation.ProductNode;
  useDenseLayout?: boolean;
}) {
  const root = await loader.getRoot();
  if (root.child.type !== "productgroup") {
    return null;
  }

  const products = root.child.children;

  if (products.length === 0) {
    return null;
  }

  const productOptions = products.map((product): ProductDropdownItem => {
    const slug = product.slug ?? product.pointsTo;
    return {
      productId: product.productId,
      title: product.title,
      slug,
      defaultSlug: product.default ? slug : undefined,
      icon: product.icon ? <FaIconServer icon={product.icon} /> : undefined,
      subtitle: product.subtitle,
      default: product.default,
    };
  });

  return (
    <ProductDropdownClient
      products={productOptions}
      fallbackProduct={fallbackProduct}
      useDenseLayout={useDenseLayout}
    />
  );
}
