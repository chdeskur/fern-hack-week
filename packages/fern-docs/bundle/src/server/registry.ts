import { once } from "es-toolkit/function";

import { FdrClient } from "@fern-api/fdr-sdk/client";

import { fernToken_admin } from "./env-variables";
import { isLocal } from "./isLocal";

function getEnvironment() {
  return (
    process.env.NEXT_PUBLIC_FDR_ORIGIN ?? "https://registry.buildwithfern.com"
  );
}

export const provideRegistryService = once(() => {
  const isLocalMode = isLocal();
  return new FdrClient({
    environment: getEnvironment(),
    token: isLocalMode ? undefined : fernToken_admin(),
  });
});
