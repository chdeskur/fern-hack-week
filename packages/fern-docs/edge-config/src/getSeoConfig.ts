import { headers } from "next/headers";

import { get } from "@vercel/edge-config";

import {
  FERN_DOCS_ORIGINS,
  HEADER_X_FORWARDED_HOST,
  isCustomDomain,
} from "@fern-docs/utils";

export async function isForwardedDomain(): Promise<boolean> {
  const headersList = await headers();
  const forwardedHost = headersList.get(HEADER_X_FORWARDED_HOST) ?? "";
  console.log("forwardedHost:", forwardedHost);
  return !FERN_DOCS_ORIGINS.includes(forwardedHost);
}

type CanonicalUrl = Record<string, string>;

export async function getSeoDisabled(domain: string): Promise<boolean> {
  // if the domain was forwarded from another location, we default SEO on
  const forwarded = await isForwardedDomain();
  if (!isCustomDomain(domain) && !forwarded) {
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
