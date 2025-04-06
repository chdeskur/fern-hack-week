import { type NextRequest, NextResponse } from "next/server";

import { getAuth0Client } from "./app/services/auth0/auth0";
import {
  getAuth0ManagementClient,
  invalidateCachesAfterAcceptingInvitation,
} from "./app/services/auth0/management";
import { Auth0OrgID, Auth0UserID } from "./app/services/auth0/types";

export async function middleware(req: NextRequest) {
  const posthogResponse = applyPosthogMiddleware(req);
  if (posthogResponse != null) {
    return posthogResponse;
  }
  await handleInvitationInvite(req);
  return await applyAuth0Middleware(req);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};

async function applyAuth0Middleware(req: NextRequest): Promise<NextResponse> {
  const auth0 = await getAuth0Client();
  const authResponse = await auth0.middleware(req);

  // copied from https://github.com/auth0/nextjs-auth0/issues/1983
  if (req.nextUrl.pathname === "/auth/login") {
    // This is a workaround for this issue: https://github.com/auth0/nextjs-auth0/issues/1917
    // The auth0 middleware sets some transaction cookies that are not deleted after the login flow completes.
    // This causes stale cookies to be used in subsequent requests and eventually causes the request header to be rejected because it is too large.
    const reqCookieNames = req.cookies.getAll().map((cookie) => cookie.name);
    reqCookieNames.forEach((cookie) => {
      if (cookie.startsWith("__txn")) {
        authResponse.cookies.delete(cookie);
      }
    });
  }

  return authResponse;
}

async function handleInvitationInvite(req: NextRequest) {
  if (req.nextUrl.pathname !== "/auth/login") {
    return;
  }

  const orgId = req.nextUrl.searchParams.get("organization");
  const invitationId = req.nextUrl.searchParams.get("invitation");
  if (orgId == null || invitationId == null) {
    return;
  }

  const auth0ManagementClient = getAuth0ManagementClient();
  try {
    const { data: invitation } =
      await auth0ManagementClient.organizations.getInvitation({
        id: orgId,
        invitation_id: invitationId,
      });

    const { data: users } = await auth0ManagementClient.usersByEmail.getByEmail(
      {
        email: invitation.invitee.email,
      }
    );
    const user = users[0];

    if (user != null) {
      await invalidateCachesAfterAcceptingInvitation({
        userId: Auth0UserID(user.user_id),
        orgId: Auth0OrgID(orgId),
      });
    }
  } catch (e) {
    console.error("Failed to invalidate caches after accepting invitation", e);
  }
}

const INGEST_PATH_REGEX = /^\/ingest/;

function applyPosthogMiddleware(req: NextRequest): NextResponse | undefined {
  // https://posthog.com/docs/advanced/proxy/nextjs-middleware
  if (!req.nextUrl.pathname.startsWith("/ingest")) {
    return undefined;
  }

  const url = req.nextUrl.clone();
  const headers = new Headers(req.headers);

  const hostname = url.pathname.startsWith("/ingest/static/")
    ? "us-assets.i.posthog.com"
    : "us.i.posthog.com";

  headers.set("host", hostname);

  url.protocol = "https";
  url.hostname = hostname;
  url.port = "443";
  url.pathname = url.pathname.replace(INGEST_PATH_REGEX, "");

  return NextResponse.rewrite(url, { headers });
}
