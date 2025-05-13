import "server-only";

import { FernNavigation } from "@fern-api/fdr-sdk";
import { isProductNode } from "@fern-api/fdr-sdk/navigation";

import { DocsLoader } from "@/server/docs-loader";
import { withVersionSwitcherInfo } from "@/server/withVersionSwitcherInfo";

import { FaIconServer } from "../fa-icon-server";
import {
  VersionDropdownClient,
  VersionDropdownItem,
} from "./VersionDropdownClient";

export declare namespace VersionDropdown {
  export interface Props {}
}

/**
 * The version dropdown is used to switch between versions at a root level or at a product level.
 *
 * The version dropdown is used at a root level if the root is versioned.
 * The version dropdown is used at a product level if the root has a productgroup and the current product is versioned.
 */
export async function VersionDropdown({
  loader,
  currentNode,
  slugMap,
  parents,
  fallbackVersion,
  useDenseLayout = false,
}: {
  loader: DocsLoader;
  slugMap: Map<string, FernNavigation.NavigationNodeWithMetadata>;
  currentNode: FernNavigation.NavigationNodeWithMetadata;
  parents: FernNavigation.NavigationNodeParent[];
  fallbackVersion: FernNavigation.VersionNode;
  useDenseLayout?: boolean;
}) {
  const root = await loader.getRoot();

  // If the root is not versioned or a productgroup, don't render the version dropdown
  if (root.child.type !== "versioned" && root.child.type !== "productgroup") {
    return null;
  }

  let versions: FernNavigation.VersionNode[] = [];

  // Handle case where root is a productgroup and the current product is versioned OR the root is versioned
  if (root.child.type === "productgroup") {
    const currentProduct = parents.find(isProductNode);

    // If the current product is not versioned, don't render the version dropdown
    if (currentProduct?.child.type !== "versioned") {
      return null;
    }
    versions = currentProduct.child.children;
  } else if (root.child.type === "versioned") {
    versions = root.child.children;
  }

  if (versions.length === 0) {
    return null;
  }

  const withInfo = withVersionSwitcherInfo({
    node: currentNode,
    parents,
    versions,
    slugMap,
  });

  const currentProduct = parents.find(isProductNode);

  const versionOptions = versions.map((version): VersionDropdownItem => {
    const versionInfo = withInfo.find((info) => info.id === version.versionId);

    const slug =
      versionInfo?.pointsTo ??
      versionInfo?.landingPage ??
      versionInfo?.slug ??
      version.slug;

    return {
      versionId: version.versionId,
      title: version.title,
      slug,
      defaultSlug: version.default
        ? FernNavigation.toDefaultSlug(
            slug,
            currentProduct?.slug ?? root.slug,
            version.slug
          )
        : undefined,
      icon: version.icon ? <FaIconServer icon={version.icon} /> : undefined,
      authed: version.authed,
      default: version.default,
      availability: version.availability,
      hidden: version.hidden,
    };
  });
  return (
    <VersionDropdownClient
      versions={versionOptions}
      fallbackVersion={fallbackVersion}
      useDenseLayout={useDenseLayout}
    />
  );
}
