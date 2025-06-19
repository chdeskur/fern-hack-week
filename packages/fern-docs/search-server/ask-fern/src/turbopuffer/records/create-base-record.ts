import { slugToHref } from "@fern-api/docs-utils";
import { FernNavigation } from "@fern-api/fdr-sdk";

import { BaseRecordIr } from "../types";

export function createBaseRecord({
  domain,
  parents,
  node,
  authed,
  type,
}: {
  domain: string;
  org_id: string;
  parents: readonly FernNavigation.NavigationNodeParent[];
  node: FernNavigation.NavigationNodeWithMetadata;
  authed: boolean;
  type: "markdown" | "api-reference";
}): BaseRecordIr {
  const versionNode = parents.find(
    (n): n is FernNavigation.VersionNode => n.type === "version"
  );

  return {
    id: node.id,
    attributes: {
      type,
      domain,
      pathname: slugToHref(node.slug),
      title: node.title,
      version: versionNode?.title,
      authed,
    },
  };
}
