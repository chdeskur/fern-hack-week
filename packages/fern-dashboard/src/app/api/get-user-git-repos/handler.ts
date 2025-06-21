import { getCurrentSession } from "@/app/services/auth0/getCurrentSession";
import { getOctokit } from "@/app/services/auth0/octokit";
import { Auth0UserID } from "@/app/services/auth0/types";
import { GithubRepo } from "@/app/services/github/types";

export default async function getUserGithubRepos(userId: Auth0UserID) {
  const session = await getCurrentSession();

  if (session == null) {
    return [];
  }

  const octokit = await getOctokit(userId);

  if (octokit == null) {
    return [];
  }

  const response = await octokit.request("GET /user/repos", {});

  const repos = response.data.map((repo) => ({
    name: repo.name,
    url: repo.html_url,
  }));

  return repos as GithubRepo[];
}
