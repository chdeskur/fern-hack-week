import { getOctokit } from "@/app/services/auth0/octokit";
import { Auth0UserID } from "@/app/services/auth0/types";
import { GithubSourceRepo } from "@/app/services/github/types";

import { getDocsUrlMetadata } from "../utils/getDocsUrlMetadata";

const EMPTY_RESPONSE: GithubSourceRepo = {
  githubUrl: undefined,
  repoName: undefined,
  owner: undefined,
  repo: undefined,
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
  const docsUrlMetadata = await getDocsUrlMetadata({ url, token });
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
    throw new Error("Failed to load docs URL metadata");
  }

  if (docsUrlMetadata.body.gitUrl == null) {
    return EMPTY_RESPONSE;
  }

  const octokit = await getOctokit(userId);

  const [owner, repo] = docsUrlMetadata.body.gitUrl.split("/").slice(-2);
  if (owner == null || repo == null) {
    return EMPTY_RESPONSE;
  }

  const response = await octokit.request("GET /repos/{owner}/{repo}", {
    owner,
    repo,
  });

  return {
    githubUrl: docsUrlMetadata.body.gitUrl,
    repoName: response.data.full_name,
    owner: response.data.owner.name ?? owner,
    repo: response.data.name ?? repo,
  };
}
