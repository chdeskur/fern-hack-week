import { NextRequest, NextResponse } from "next/server";

import { z } from "zod";

import { ResolvedReturnType } from "@/utils/types";

import { maybeGetCurrentSession } from "../utils/maybeGetCurrentSession";
import { parseNextRequestBody } from "../utils/parseNextRequestBody";
import handler from "./handler";

export declare namespace postCreateBranch {
  export type Request = z.infer<typeof PostCreateBranchRequest>;
  export type Response = ResolvedReturnType<typeof handler>;
}

export const PostCreateBranchRequest = z.object({
  owner: z.string(),
  repo: z.string(),
  branch: z.string(),
  baseBranch: z.string(),
});

export async function POST(req: NextRequest) {
  const maybeSessionData = await maybeGetCurrentSession(req);
  if (maybeSessionData.errorResponse != null) {
    return maybeSessionData.errorResponse;
  }
  const { userId } = maybeSessionData.data;
  const parsedBody = await parseNextRequestBody(req, PostCreateBranchRequest);
  if (parsedBody.errorResponse != null) {
    return parsedBody.errorResponse;
  }
  const { owner, repo, branch, baseBranch } = parsedBody.data;

  return NextResponse.json(
    await handler(userId, { owner, repo, branch, baseBranch })
  );
}
