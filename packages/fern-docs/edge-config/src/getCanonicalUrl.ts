import { get } from "@vercel/edge-config";

type CanonicalUrl = Record<string, string>;

export async function getCanonicalUrl(
  domain: string
): Promise<string | undefined> {
  const config = await get<CanonicalUrl>("canonical-host");
  return config?.[domain];
}
