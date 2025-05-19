import Image from "next/image";

import { FernNavigation } from "@fern-api/fdr-sdk";

import { DocsLoader } from "@/server/docs-loader";
import { createFileResolver } from "@/server/file-resolver";

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

  const files = await loader.getFiles();

  const resolveFileSrc = createFileResolver(files);

  const productOptions = products.map((product): ProductDropdownItem => {
    const slug = product.slug ?? product.pointsTo;
    const image = resolveFileSrc(product.image);
    return {
      productId: product.productId,
      title: product.title,
      slug,
      defaultSlug: product.default ? slug : undefined,
      icon: product.icon ? <FaIconServer icon={product.icon} /> : undefined,
      subtitle: product.subtitle,
      default: product.default,
      image: image ? (
        <Image
          src={image.src}
          alt={product.title}
          objectFit="cover"
          width={image.width}
          height={image.height}
        />
      ) : undefined,
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
