import type { MetadataRoute } from "next";
import { headers } from "next/headers";

import urlJoin from "url-join";

import { withDefaultProtocol } from "@fern-api/ui-core-utils";
import { getSeoDisabled } from "@fern-docs/edge-config";
import {
  FERN_DOCS_ORIGINS,
  HEADER_HOST,
  HEADER_X_FERN_HOST,
  HEADER_X_FORWARDED_HOST,
  conformTrailingSlash,
} from "@fern-docs/utils";

export const runtime = "edge";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const headersList = await headers();
  const domain =
    headersList.get(HEADER_X_FERN_HOST) ?? headersList.get(HEADER_HOST);
  const forwardedHost = headersList.get(HEADER_X_FORWARDED_HOST) ?? "";
  const foreignForward = !FERN_DOCS_ORIGINS.includes(forwardedHost);
  if (!domain) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }
  const basepath = headersList.get("x-fern-basepath") ?? "";
  const sitemap = urlJoin(
    withDefaultProtocol(domain),
    basepath,
    "/sitemap.xml"
  );

  // if we are forwarding to a domain from another location, assume we should index
  if (foreignForward || (await getSeoDisabled(domain))) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
      sitemap,
      host: domain,
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: conformTrailingSlash("*/~explorer"),
    },
    sitemap,
    host: foreignForward ? forwardedHost : domain,
  };
}
