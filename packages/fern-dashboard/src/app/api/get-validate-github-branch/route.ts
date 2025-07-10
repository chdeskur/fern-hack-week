import { NextRequest, NextResponse } from "next/server";

import { z } from "zod";

import { ResolvedReturnType } from "@/utils/types";

import { maybeGetCurrentSession } from "../utils/maybeGetCurrentSession";
import { parseNextRequestBody } from "../utils/parseNextRequestBody";
import handler from "./handler";

export declare namespace validateGithubBranch {
  export type Request = z.infer<typeof ValidateGithubBranchRequest>;
  export type Response = ResolvedReturnType<typeof handler>;
}

const ValidateGithubBranchRequest = z.object({
  owner: z.string(),
  repo: z.string(),
  branchName: z.string(),
});

export async function POST(req: NextRequest) {
  const maybeSessionData = await maybeGetCurrentSession(req);
  if (maybeSessionData.errorResponse != null) {
    return maybeSessionData.errorResponse;
  }
  const { userId } = maybeSessionData.data;

  const parsedBody = await parseNextRequestBody(
    req,
    ValidateGithubBranchRequest
  );
  if (parsedBody.errorResponse != null) {
    return parsedBody.errorResponse;
  }
  const { owner, repo, branchName } = parsedBody.data;

  const response = await handler({ owner, repo, branchName, userId });

  return NextResponse.json(response);
}
