import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

import { getAuth0Client } from "@/app/services/auth0/auth0";
import * as auth0Management from "@/app/services/auth0/management";
import {
  Auth0OrgID,
  Auth0OrgName,
  Auth0UserID,
} from "@/app/services/auth0/types";
import { X_PATHNAME_HEADER } from "@/middleware";
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

  const isUserInOrgFromUrl = await auth0Management.doesUserBelongsToOrg(
    Auth0UserID(session.user.sub),
    orgIdFromUrl
  );
  if (!isUserInOrgFromUrl) {
    return <Page404 />;
  }

  if (session.user.org_id !== orgIdFromUrl) {
    const requestHeaders = await headers();
    const currentPathname = requestHeaders.get(X_PATHNAME_HEADER);
    redirect(
      getLoginUrl({
        orgId: orgIdFromUrl,
        returnTo:
          currentPathname != null
            ? currentPathname.replace(new RegExp(`^/${orgIdFromUrl}`), "")
            : undefined,
      })
    );
  }

  return children;
};
