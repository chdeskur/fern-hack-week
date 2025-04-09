import { FdrAPI } from "@fern-api/fdr-sdk";

import { Auth0OrgName } from "@/app/services/auth0/types";
import { getFdrClient } from "@/app/services/fdr/getFdrClient";

export default async function getMyDocsSites({
  orgName,
  token,
}: {
  orgName: Auth0OrgName;
  token: string;
}) {
  const fdr = getFdrClient({ token });
  const docsSites = await fdr.dashboard.getDocsSitesForOrg({
    // fdr uses org name (not id) as the org identifier
    orgId: FdrAPI.OrgId(orgName),
  });
  if (!docsSites.ok) {
    console.error("Failed to load docs sites", JSON.stringify(docsSites.error));
    throw new Error("Failed to load docs sites");
  }

  return docsSites.body;
}
