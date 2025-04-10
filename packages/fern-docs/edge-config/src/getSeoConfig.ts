import { headers } from "next/headers";

import { get } from "@vercel/edge-config";

import {
  FERN_DOCS_ORIGINS,
  HEADER_X_FORWARDED_HOST,
  isCustomDomain,
} from "@fern-docs/utils";

export async function isForwardedDomain(domain: string): Promise<boolean> {
  const headersList = await headers();
  const forwardedHost = headersList.get(HEADER_X_FORWARDED_HOST);
  if (forwardedHost) {
    return (
      !FERN_DOCS_ORIGINS.includes(forwardedHost) && forwardedHost !== domain
    );
  }
  return false;
}

type CanonicalUrl = Record<string, string>;

export async function getSeoDisabled(domain: string): Promise<boolean> {
  const forwarded = await isForwardedDomain(domain);
  const isSeoEnabled = (await get<string[]>("seo-enabled")) ?? [];
  if (isSeoEnabled.includes(domain) && forwarded) {
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
