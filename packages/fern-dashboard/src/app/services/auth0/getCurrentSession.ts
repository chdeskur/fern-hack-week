import { SessionData } from "@auth0/nextjs-auth0/types";
import jwt from "jsonwebtoken";

import { getAuth0Client } from "@/app/services/auth0/auth0";

import { Auth0OrgID, Auth0UserID } from "./types";

export interface FullSessionData {
  session: SessionData;
  userId: Auth0UserID;
  orgId: Auth0OrgID;
}

export async function getCurrentSession(): Promise<
  FullSessionData | undefined
> {
  const maybeSession = await getCurrentSessionWithoutRequiringOrgId();
  if (maybeSession?.orgId != null) {
    return { ...maybeSession, orgId: maybeSession.orgId };
  }
  return undefined;
}

export async function getCurrentSessionWithoutRequiringOrgId() {
  const auth0 = await getAuth0Client();
  const session = await auth0.getSession();
  if (session == null) {
    return undefined;
  }

  const { orgId, userId } = decodeAccessToken(session.tokenSet.accessToken);

  return { session, orgId, userId };
}

export async function getCurrentSessionOrThrow(): Promise<FullSessionData> {
  const session = await getCurrentSession();
  if (session == null) {
    throw new Error("Not authenticated");
  }
  return session;
}

export function decodeAccessToken(token: string) {
  const jwtPayload = jwt.decode(token);
  if (jwtPayload == null) {
    throw new Error("accessToken JWT payload is not defined");
  }
  if (typeof jwtPayload !== "object") {
    throw new Error("accessToken JWT payload is not an object");
  }
  if (jwtPayload?.sub == null) {
    throw new Error("accessToken JWT payload does not include 'sub'");
  }

  return {
    userId: Auth0UserID(jwtPayload.sub),
    orgId:
      jwtPayload.org_id != null ? Auth0OrgID(jwtPayload.org_id) : undefined,
  };
}
