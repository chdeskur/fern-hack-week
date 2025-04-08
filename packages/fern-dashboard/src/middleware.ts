import { type NextRequest, NextResponse } from "next/server";

import { getAuth0Client } from "./app/services/auth0/auth0";

export const X_PATHNAME_HEADER = "x-current-pathname";

export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith("/ingest")) {
    return applyPosthogMiddleware(req);
  }

  if (req.nextUrl.pathname.startsWith("/auth/")) {
    return await applyAuth0Middleware(req);
  }

  // add x-current-pathname to request headers to help with redirecting
  const headers = new Headers(req.headers);
  headers.set(X_PATHNAME_HEADER, req.nextUrl.pathname);
  return NextResponse.next({ headers });
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

const INGEST_PATH_REGEX = /^\/ingest/;

function applyPosthogMiddleware(req: NextRequest): NextResponse {
  // https://posthog.com/docs/advanced/proxy/nextjs-middleware
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
