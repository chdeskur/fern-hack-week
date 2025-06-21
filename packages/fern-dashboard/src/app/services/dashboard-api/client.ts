import { getDocsUrlOwner } from "@/app/api/get-docs-url-owner/route";
import { getMyDocsSites } from "@/app/api/get-my-docs-sites/route";
import { getMyOrganizations } from "@/app/api/get-my-organizations/route";
import { getOrgInvitations } from "@/app/api/get-org-invitations/route";
import { getOrgMembers } from "@/app/api/get-org-members/route";
import { getUserGithubRepos } from "@/app/api/get-user-git-repos/route";
import { getGitHubPermissions } from "@/app/api/github-permissions/route";
import { getHomepageImageUrl } from "@/app/api/homepage-images/get/route";

export const DashboardApiClient = {
  getMyDocsSites: (
    request: getMyDocsSites.Request
  ): Promise<getMyDocsSites.Response> =>
    typedFetch<getMyDocsSites.Response>("/api/get-my-docs-sites", request),
  getMyOrganizations: () =>
    typedFetch<getMyOrganizations.Response>("/api/get-my-organizations"),
  getOrgInvitations: (request: getOrgInvitations.Request) =>
    typedFetch<getOrgInvitations.Response>("/api/get-org-invitations", request),
  getOrgMembers: (
    request: getOrgMembers.Request
  ): Promise<getOrgMembers.Response> =>
    typedFetch<getOrgMembers.Response>("/api/get-org-members", request),
  getHomepageImages: (request: getHomepageImageUrl.Request) =>
    typedFetch<getHomepageImageUrl.Response>(
      "/api/homepage-images/get",
      request
    ),
  getDocsUrlOwner: (request: getDocsUrlOwner.Request) =>
    typedFetch<getDocsUrlOwner.Response>("/api/get-docs-url-owner", request),
  getUserGithubRepos: () =>
    typedFetch<getUserGithubRepos.Response>("/api/get-user-git-repos"),
  getGitHubPermissions: () =>
    typedFetch<getGitHubPermissions.Response>("/api/github-permissions"),
};

async function typedFetch<T>(
  url: string,
  body?: unknown,
  { method = body != null ? "POST" : "GET" }: { method?: "GET" | "POST" } = {}
): Promise<T> {
  const response = await fetch(url, {
    method: method,
    body: body != null ? JSON.stringify(body) : undefined,
  });

  const responseText = await response.text().catch(() => "");

  if (!response.ok) {
    console.error("Request failed", {
      url,
      body: JSON.stringify(body),
      responseText,
    });
    throw new Error("Request failed: " + responseText);
  }

  let json: unknown;
  try {
    json = JSON.parse(responseText);
  } catch (e) {
    console.error(
      "Failed to deserialize response",
      { url, body: JSON.stringify(body), responseText },
      e
    );
    throw new Error("Failed to deserialize response");
  }

  return json as T;
}
