import { SessionData } from "@auth0/nextjs-auth0/types";

import { createPersonalProject } from "@/app/actions/createPersonalProject";
import { getMyOrganizations } from "@/app/services/auth0/management";
import {
  Auth0OrgID,
  Auth0OrgName,
  Auth0UserID,
} from "@/app/services/auth0/types";

export async function getOrCreateFirstOrgForUser(
  session: SessionData
): Promise<{ orgId: Auth0OrgID; orgName: Auth0OrgName }> {
  const organizations = await getMyOrganizations(Auth0UserID(session.user.sub));
  const firstOrg = organizations[0];
  if (firstOrg != null) {
    return {
      orgId: Auth0OrgID(firstOrg.id),
      orgName: Auth0OrgName(firstOrg.name),
    };
  }

  const personalProject = await createPersonalProject();
  return {
    orgId: personalProject.orgId,
    orgName: personalProject.orgName,
  };
}
