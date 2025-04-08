import { redirect } from "next/navigation";

import { SessionData } from "@auth0/nextjs-auth0/types";

import { getAuth0Client } from "@/app/services/auth0/auth0";
import { getOrCreateFirstOrgForUser } from "@/components/auth/getOrCreateFirstOrgForUser";

import { getOrganization } from "./services/auth0/management";
import { Auth0OrgID, Auth0OrgName } from "./services/auth0/types";

export default async function Page() {
  const auth0 = await getAuth0Client();
  const session = await auth0.getSession();

  if (session == null) {
    redirect("/login");
  }

  const orgName = await getOrgNameForRedirect(session);
  redirect(`/${orgName}`);
}

async function getOrgNameForRedirect(
  session: SessionData
): Promise<Auth0OrgName> {
  if (session.user.org_id != null) {
    const orgName = await getOrganization(Auth0OrgID(session.user.org_id));
    return orgName.name;
  }

  const firstOrg = await getOrCreateFirstOrgForUser(session);
  return firstOrg.orgName;
}
