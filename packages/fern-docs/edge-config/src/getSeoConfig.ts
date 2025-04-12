import { get } from "@vercel/edge-config";

import { isCustomDomain } from "@fern-docs/utils";

export async function getSeoDisabled(domain: string): Promise<boolean> {
  const isSeoEnabled = (await get<string[]>("seo-enabled")) ?? [];
  if (isSeoEnabled.includes(domain)) {
    return false;
  }

  if (!isCustomDomain(domain)) {
    return true;
  }
  const isDisabled = (await get<string[]>("seo-disabled")) ?? [];
  return isDisabled.includes(domain);
}
