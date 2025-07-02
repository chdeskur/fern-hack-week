import { redirect } from "next/navigation";

import checkGitHubPermissions from "@/app/api/github-permissions/handler";
import { getCurrentSession } from "@/app/services/auth0/getCurrentSession";

import { AuthorizeGithubModal } from "./AuthorizeGithubModal";

export async function GithubProtectedArea({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getCurrentSession();

  if (!session) {
    redirect("/");
  }

  const githubPermissions = await checkGitHubPermissions(session.user.sub);
  if (!githubPermissions.hasRepoAccess) {
    return <AuthorizeGithubModal />;
  }

  return children;
}
