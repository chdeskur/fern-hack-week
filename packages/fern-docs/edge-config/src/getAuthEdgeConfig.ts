import { type AuthEdgeConfig, AuthEdgeConfigSchema } from "@fern-docs/auth";
import { withoutStaging } from "@fern-docs/utils";

import { getEdge } from "./getEdge";
import { isLocal } from "./isLocal";

const KEY = "authentication";
export async function getAuthEdgeConfig(
  currentDomain: string
): Promise<AuthEdgeConfig | undefined> {
  if (isLocal()) {
    return undefined;
  }

  const domainToTokenConfigMap = await getEdge<Record<string, any>>(KEY);
  const toRet =
    domainToTokenConfigMap?.[currentDomain] ??
    domainToTokenConfigMap?.[withoutStaging(currentDomain)];
  if (toRet != null) {
    const config = AuthEdgeConfigSchema.safeParse(toRet);
    // if the config is present, it should be valid.
    // if it's malformed, custom auth for this domain will not work and may leak docs to the public.
    if (!config.success) {
      console.error(
        `Could not parse AuthEdgeConfigSchema for ${currentDomain}`,
        config.error
      );
      // TODO: sentry
    }
    return config.data;
  }
  return;
}
