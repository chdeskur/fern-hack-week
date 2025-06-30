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

  const response = await octokit.request("GET /user/repos", {
    per_page: 100, // max is 100
    affiliation: "organization_member",
    since: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
  });

  const repos: GithubRepo[] = response.data
    .filter((repo) => {
      const permissions = repo.permissions;
      return permissions?.admin || permissions?.push || permissions?.maintain;
    })
    .map((repo) => ({
      name: repo.name,
      url: repo.html_url,
      avatarUrl: repo.owner.avatar_url,
      description: repo.description ?? "",
      stargazersCount: repo.stargazers_count,
      owner: repo.owner.name ?? "",
      organization:
        repo.owner.type === "Organization"
          ? (repo.owner.name ?? undefined)
          : undefined,
    }));

  return repos;
}
