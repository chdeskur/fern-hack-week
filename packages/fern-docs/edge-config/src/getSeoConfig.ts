import { get } from "@vercel/edge-config";

import { isCustomDomain } from "@fern-docs/utils";

type CanonicalUrl = Record<string, string>;

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

export async function getCanonicalUrl(
  domain: string
): Promise<string | undefined> {
  const config = await get<CanonicalUrl>("canonical-host");
  return config?.[domain];
}
