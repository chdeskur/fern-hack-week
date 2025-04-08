import { redirect } from "next/navigation";
import React from "react";

import { getAuth0Client } from "@/app/services/auth0/auth0";
import * as auth0Management from "@/app/services/auth0/management";
import { Auth0OrgID, Auth0OrgName } from "@/app/services/auth0/types";
import { getLoginUrl } from "@/utils/getLoginUrl";

import { Page404 } from "../Page404";
import { getOrCreateFirstOrgForUser } from "./getOrCreateFirstOrgForUser";

export declare namespace ProtectedRoute {
  export interface Props {
    orgName: Auth0OrgName;
    children: React.JSX.Element;
  }
}

export const ProtectedRoute = async ({
  orgName,
  children,
}: ProtectedRoute.Props) => {
  const auth0 = await getAuth0Client();
  const session = await auth0.getSession();

  if (session == null) {
    redirect("/");
  }

  if (session.user.org_id == null) {
    const firstOrg = await getOrCreateFirstOrgForUser(session);
    redirect(
      getLoginUrl({
        orgId: firstOrg.orgId,
      })
    );
  }

  let orgIdFromUrl: Auth0OrgID;
  try {
    orgIdFromUrl = await auth0Management.getOrganizationIdFromName(orgName);
  } catch (e) {
    console.error("Failed to fetch org", e);
    return <Page404 />;
  }

  if (session.user.org_id !== orgIdFromUrl) {
    redirect(
      getLoginUrl({
        orgId: orgIdFromUrl,
      })
    );
  }

  return children;
};
