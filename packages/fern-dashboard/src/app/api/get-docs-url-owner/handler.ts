import * as auth0Management from "@/app/services/auth0/management";
import { Auth0OrgID, Auth0OrgName } from "@/app/services/auth0/types";

import { getDocsUrlMetadata } from "../utils/getDocsUrlMetadata";

export default async function getDocsUrlOwnerHandler({
  url,
  token,
}: {
  url: string;
  token: string;
}): Promise<{ orgId: Auth0OrgID | undefined }> {
  const docsUrlMetadata = await getDocsUrlMetadata({ url, token });
  if (!docsUrlMetadata.ok) {
    // the docs url is user-supplied (parsed from the page url) so it's ok if it
    // doesn't exist
    if (docsUrlMetadata.error.error === "DomainNotRegisteredError") {
      return { orgId: undefined };
    }

    console.error(
      "Failed to load docs URL metadata",
      JSON.stringify(docsUrlMetadata.error)
    );
    throw new Error("Failed to load docs URL metadata");
  }

  return {
    orgId: await auth0Management.getOrganizationIdFromName(
      Auth0OrgName(docsUrlMetadata.body.org)
    ),
  };
}
