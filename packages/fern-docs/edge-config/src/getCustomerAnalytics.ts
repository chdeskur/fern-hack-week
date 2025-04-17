import urlJoin from "url-join";

import { getEdge } from "./getEdge";
import { isLocal } from "./isLocal";

interface GTMParams {
  tagId: string;
}
interface CustomerAnalytics {
  ga4?: {
    measurementId: string;
  };
  gtm?: GTMParams;
}

// deprecated
export async function getCustomerAnalytics(
  host: string,
  basePath?: string
): Promise<CustomerAnalytics | undefined> {
  if (isLocal()) {
    return undefined;
  }

  const config = await getEdge<Record<string, CustomerAnalytics>>("analytics");
  return config?.[urlJoin(host, basePath ?? "")];
}
