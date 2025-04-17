import { getEdge } from "./getEdge";
import { isLocal } from "./isLocal";

type CanonicalUrl = Record<string, string>;

export async function getCanonicalUrl(
  domain: string
): Promise<string | undefined> {
  if (isLocal()) {
    return domain;
  }

  const config = await getEdge<CanonicalUrl>("canonical-host");
  return config?.[domain];
}
