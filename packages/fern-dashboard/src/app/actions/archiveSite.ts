"use server";

import { FdrAPI } from "@fern-api/fdr-sdk";

import { getCurrentSessionOrThrow } from "../services/auth0/getCurrentSession";
import { getFdrClient } from "../services/fdr/getFdrClient";

export async function archiveSite({ url }: { url: string }) {
  const session = await getCurrentSessionOrThrow();
  const fdrClient = getFdrClient({ token: session.accessToken });
  const response = await fdrClient.docs.v2.write.setIsArchived({
    url: FdrAPI.Url(url),
    isArchived: true,
  });
  if (!response.ok) {
    console.error("Failed to archive site", JSON.stringify(response.error));
    throw new Error("Failed to archive site");
  }
}
