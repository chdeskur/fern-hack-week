import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import { getAuthEdgeConfig } from "@fern-docs/edge-config";
import { COOKIE_FERN_TOKEN } from "@fern-docs/utils";

import { safeVerifyFernJWTConfig } from "@/server/auth/FernJWT";
import { isLocal } from "@/server/isLocal";
import { getDocsDomainEdge } from "@/server/xfernhost/edge";

/**
 * This endpoint returns the authentication information pertaining to the current user
 */
export async function GET(req: NextRequest): Promise<NextResponse> {
  if (isLocal()) {
    return new NextResponse(
      "authentication is not accessible in local preview mode",
      {
        status: 400,
      }
    );
  }

  try {
    const cookieJar = await cookies();
    const fernToken = cookieJar.get(COOKIE_FERN_TOKEN)?.value;

    if (fernToken == null) {
      return NextResponse.json(
        {
          error: "User is not authenticated",
        },
        { status: 401 }
      );
    }

    const domain = getDocsDomainEdge(req);
    const config = await getAuthEdgeConfig(domain);

    if (!config) {
      return NextResponse.json(
        {
          error: "Authentication configuration not found",
        },
        { status: 500 }
      );
    }

    const userInfo = await safeVerifyFernJWTConfig(fernToken, config);
    console.log(userInfo);

    if (!userInfo) {
      return NextResponse.json(
        {
          error: "Invalid or expired token",
        },
        { status: 401 }
      );
    }

    return NextResponse.json({
      fern_token: fernToken,
      user_info: {
        name: userInfo.name,
        email: userInfo.email,
        roles: userInfo.roles,
      },
    });
  } catch (error) {
    console.error("Error in whoami endpoint:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
      },
      { status: 500 }
    );
  }
}
