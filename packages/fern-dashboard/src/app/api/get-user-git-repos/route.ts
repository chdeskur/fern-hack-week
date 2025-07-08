import { NextRequest, NextResponse } from "next/server";

import { ResolvedReturnType } from "@/utils/types";

import { maybeGetCurrentSession } from "../utils/maybeGetCurrentSession";
import handler from "./handler";

export declare namespace getUserGithubRepos {
  export type Response = ResolvedReturnType<typeof handler>;
  export interface Request {
    page?: number;
  }
}

export async function GET(req: NextRequest) {
  const maybeSessionData = await maybeGetCurrentSession(req);
  if (maybeSessionData.errorResponse != null) {
    return maybeSessionData.errorResponse;
  }
  const { userId } = maybeSessionData.data;

  // Parse page parameter from query string
  const { searchParams } = new URL(req.url);
  const pageParam = searchParams.get("page");
  const page = pageParam ? parseInt(pageParam, 10) : 1;

  // Validate page parameter
  if (isNaN(page) || page < 1) {
    return NextResponse.json(
      { error: "Invalid page parameter. Must be a positive integer." },
      { status: 400 }
    );
  }

  return NextResponse.json(await handler(userId, page));
}
