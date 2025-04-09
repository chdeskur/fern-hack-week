import { redirect } from "next/navigation";

import { createPersonalProject } from "./actions/createPersonalProject";
import {
  Auth0SessionData,
  getCurrentSession,
} from "./services/auth0/getCurrentSession";
import { getMyOrganizations } from "./services/auth0/management";
import { Auth0OrgName } from "./services/auth0/types";

export default async function Page() {
  const session = await getCurrentSession();

  if (session == null) {
    redirect("/login");
  }

  const firstOrg = await getOrCreateFirstOrgForUser(session);
  redirect(`/${firstOrg.orgName}`);
}

async function getOrCreateFirstOrgForUser(
  session: Auth0SessionData
): Promise<{ orgName: Auth0OrgName }> {
  const organizations = await getMyOrganizations(session.user.sub);
  const firstOrg = organizations[0];
  if (firstOrg != null) {
    return {
      orgName: Auth0OrgName(firstOrg.name),
    };
  }

  const personalProject = await createPersonalProject();
  return {
    orgName: personalProject.orgName,
  };
}
