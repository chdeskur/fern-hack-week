import { redirect } from "next/navigation";

import checkGitHubPermissions, {
  checkWritePermissionToRepo,
} from "@/app/api/github-permissions/handler";
import { getCurrentSession } from "@/app/services/auth0/getCurrentSession";
import { GithubSourceRepo } from "@/app/services/github/types";

import { AuthorizeGithubModal } from "./AuthorizeGithubModal";
import { GithubPermissionsProvider } from "./GithubPermissionsContext";

export async function GithubProtectedArea({
  children,
  sourceRepo,
}: {
  children: React.ReactNode;
  sourceRepo?: GithubSourceRepo;
}) {
  const session = await getCurrentSession();

  if (!session) {
    redirect("/");
  }

  const githubPermissions = await checkGitHubPermissions(session.user.sub);
  if (!githubPermissions.hasRepoAccess) {
    return <AuthorizeGithubModal />;
  }

  const writePermission =
    sourceRepo?.owner && sourceRepo?.repo
      ? await checkWritePermissionToRepo(
          session.user.sub,
          sourceRepo.owner,
          sourceRepo.repo
        )
      : undefined;

  return (
    <GithubPermissionsProvider writePermission={writePermission}>
      {children}
    </GithubPermissionsProvider>
  );
}
