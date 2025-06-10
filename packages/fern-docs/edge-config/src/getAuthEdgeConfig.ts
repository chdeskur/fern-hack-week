import {
  ApiKeyDemo,
  ApiKeySchema,
  type AuthEdgeConfig,
  AuthEdgeConfigSchema,
} from "@fern-api/docs-auth";
import { withoutStaging } from "@fern-api/docs-utils";

import { getEdge } from "./getEdge";
import { isLocal } from "./isLocal";
import { isSelfHosted } from "./isSelfHosted";

export async function getAuthEdgeConfig(
  currentDomain: string
): Promise<AuthEdgeConfig | undefined> {
  if (isLocal() || isSelfHosted()) {
    return undefined;
  }

  return getRecord(currentDomain, "authentication");
}

export async function getApiKeyInjectionEdgeConfig(
  currentDomain: string
): Promise<AuthEdgeConfig | undefined> {
  if (isLocal() || isSelfHosted()) {
    return undefined;
  }

  return getRecord(currentDomain, "api-key-injection");
}

// hard-coded api key for demo purposes
export async function getApiKeyInjectionDemoConfig(
  currentDomain: string
): Promise<ApiKeyDemo | undefined> {
  if (isLocal()) {
    return undefined;
  }

  const domainToTokenConfigMap = await getEdge<Record<string, any>>(
    "api-key-injection-demo"
  );
  const toRet =
    domainToTokenConfigMap?.[currentDomain] ??
    domainToTokenConfigMap?.[withoutStaging(currentDomain)];
  if (toRet != null) {
    const config = ApiKeySchema.safeParse(toRet);
    // if the config is present, it should be valid.
    // if it's malformed, custom auth for this domain will not work and may leak docs to the public.
    if (!config.success) {
      console.error(
        `Could not parse ApiKeySchema for ${currentDomain}`,
        config.error
      );
      // TODO: sentry
    }
    return config.data;
  }
  return;
}

async function getRecord(
  currentDomain: string,
  key: string
): Promise<AuthEdgeConfig | undefined> {
  const domainToTokenConfigMap = await getEdge<Record<string, any>>(key);
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
