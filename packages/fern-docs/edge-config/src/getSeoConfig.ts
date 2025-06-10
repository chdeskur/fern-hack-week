import { isCustomDomain } from "@fern-api/docs-utils";

import { getEdge } from "./getEdge";
import { isLocal } from "./isLocal";
import { isSelfHosted } from "./isSelfHosted";

export async function getSeoDisabled(domain: string): Promise<boolean> {
  if (isLocal() || isSelfHosted()) {
    return true;
  }

  const isSeoEnabled = (await getEdge<string[]>("seo-enabled")) ?? [];
  if (isSeoEnabled.includes(domain)) {
    return false;
  }

  if (!isCustomDomain(domain)) {
    return true;
  }
  const isDisabled = (await getEdge<string[]>("seo-disabled")) ?? [];
  return isDisabled.includes(domain);
}
