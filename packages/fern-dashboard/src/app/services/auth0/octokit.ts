import { Octokit } from "@octokit/core";

// import { getUserGithubToken } from "./management";
import { Auth0UserID } from "./types";

export async function getOctokit(_userId: Auth0UserID) {
  // const gitHubToken = await getUserGithubToken(userId);

  // if (gitHubToken == null) {
  //   return null;
  // }

  /* eslint-disable turbo/no-undeclared-env-vars */
  const gitHubToken = process.env.GITHUB_TOKEN;

  if (gitHubToken == null) {
    throw new Error("GITHUB_TOKEN is not defined in the current environment");
  }

  return new Octokit({ auth: gitHubToken });
}
