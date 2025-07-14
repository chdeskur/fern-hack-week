/* eslint-disable turbo/no-undeclared-env-vars */
import { FernFaiClient } from "@fern-api/fai-sdk";

export function getFaiClient({ token }: { token: string }): FernFaiClient {
  if (process.env.FAI_SERVER_URL == null) {
    throw new Error("FAI_SERVER_URL is not defined in the current environment");
  }
  return new FernFaiClient({
    environment: process.env.FAI_SERVER_URL,
    token,
  });
}
