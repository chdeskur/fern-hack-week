import { once } from "es-toolkit/function";

import { FdrClient } from "@fern-api/fdr-sdk/client";

import { fernToken_admin } from "./env-variables";
import { isLocal } from "./isLocal";

function getEnvironment() {
  // environment variable is used by local development
  return (
    process.env.NEXT_PUBLIC_FDR_ORIGIN ?? "https://registry.buildwithfern.com"
  );
}

export const provideRegistryService = once(() => {
  return new FdrClient({
    environment: getEnvironment(),
    token: isLocal() ? undefined : fernToken_admin(),
  });
});
