import "server-only";

import { Metadata } from "next/types";

import { slugjoin } from "@fern-api/fdr-sdk/navigation";

import { getMetadataTitleFromPage } from "@/components/seo";
import SharedPage from "@/components/shared-page";
import { createCachedDocsLoader } from "@/server/docs-loader";

export const dynamic = "force-static";

export default async function StaticPage({
  params,
}: {
  params: Promise<{ host: string; domain: string; slug: string }>;
}) {
  const { host, domain, slug } = await params;
  const loader = await createCachedDocsLoader(host, domain);
  return <SharedPage loader={loader} slug={slugjoin(slug)} />;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ host: string; domain: string; slug: string }>;
}): Promise<Metadata> {
  const { host, domain, slug } = await params;
  const loader = await createCachedDocsLoader(host, domain);
  return {
    title: await getMetadataTitleFromPage({ loader, slug: slugjoin(slug) }),
  };
}
