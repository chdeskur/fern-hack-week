import { unstable_cache } from "next/cache";

import { getOctokit } from "@/app/services/auth0/octokit";
import { Auth0UserID } from "@/app/services/auth0/types";
import { GithubSourceRepo } from "@/app/services/github/types";

import { getDocsUrlMetadata } from "../utils/getDocsUrlMetadata";

const EMPTY_RESPONSE: GithubSourceRepo = {
  githubUrl: undefined,
  repoName: undefined,
  owner: undefined,
  repo: undefined,
  baseBranch: undefined,
};

export default async function getDocsGithubSourceHandler({
  url,
  token,
  userId,
}: {
  url: string;
  token: string;
  userId: Auth0UserID;
}): Promise<GithubSourceRepo> {
  // Cache the result for 5 minutes to avoid repeated API calls
  return unstable_cache(
    async () => {
      const docsUrlMetadata = await getDocsUrlMetadata({
        url: decodeURIComponent(url),
        token,
      });
      if (!docsUrlMetadata.ok) {
        // the docs url is user-supplied (parsed from the page url) so it's ok if it
        // doesn't exist
        if (docsUrlMetadata.error.error === "DomainNotRegisteredError") {
          return EMPTY_RESPONSE;
        }

        console.error(
          "Failed to load docs URL metadata",
          JSON.stringify(docsUrlMetadata.error)
        );
        throw new Error(
          `Unable to find that domain. Please check that the domain "${decodeURIComponent(
            url
          )}" is correct.`
        );
      }

      if (docsUrlMetadata.body.gitUrl == null) {
        return EMPTY_RESPONSE;
      }

      const octokit = await getOctokit(userId);
      if (octokit == null) {
        return {
          githubUrl: docsUrlMetadata.body.gitUrl,
          repoName: undefined,
          owner: undefined,
          repo: undefined,
          baseBranch: undefined,
        };
      }

      const [owner, repo] = docsUrlMetadata.body.gitUrl.split("/").slice(-2);
      if (owner == null || repo == null) {
        return {
          githubUrl: docsUrlMetadata.body.gitUrl,
          repoName: undefined,
          owner: undefined,
          repo: undefined,
          baseBranch: undefined,
        };
      }

      try {
        const response = await octokit.request("GET /repos/{owner}/{repo}", {
          owner,
          repo,
        });
        return {
          githubUrl: docsUrlMetadata.body.gitUrl,
          repoName: response.data.full_name,
          owner: response.data.owner.name ?? owner,
          repo: response.data.name ?? repo,
          baseBranch: response.data.default_branch,
        };
      } catch (error) {
        console.error("Failed to get repo info", error);
        return {
          githubUrl: docsUrlMetadata.body.gitUrl,
          repoName: undefined,
          owner: undefined,
          repo: undefined,
          baseBranch: undefined,
        };
      }
    },
    [`github-source-${url}-${userId}`],
    {
      revalidate: 300, // 5 minutes
      tags: [`github-source-${url}`],
    }
  )();
}
