import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

import checkGitHubPermissions, {
  checkWritePermissionToRepo,
} from "@/app/api/github-permissions/handler";
import { getCurrentSession } from "@/app/services/auth0/getCurrentSession";
import * as auth0Management from "@/app/services/auth0/management";
import { Auth0OrgName } from "@/app/services/auth0/types";

import { Page404 } from "../Page404";
import { LoginButton } from "./LoginButton";

export declare namespace GithubExtendedAccessProtectedRoute {
  export interface Props {
    orgName: Auth0OrgName;
    owner: string | undefined;
    repo: string | undefined;
    children: React.JSX.Element;
  }
}

interface PermissionDeniedCardProps {
  title: string;
  children: React.ReactNode;
}

const PermissionDeniedCard = ({
  title,
  children,
}: PermissionDeniedCardProps) => (
  <div className="bg-background flex h-full w-full items-center justify-center bg-gray-200">
    <div className="border-1 border-border flex w-[400px] max-w-full flex-col items-center justify-center gap-6 rounded-lg bg-gray-100 p-6 text-center shadow-lg">
      <div className="flex flex-col items-center justify-center gap-2">
        <h2 className="text-lg font-semibold">{title}</h2>
        {children}
      </div>
    </div>
  </div>
);

export const GithubExtendedAccessProtectedRoute = async ({
  orgName,
  owner,
  repo,
  children,
}: GithubExtendedAccessProtectedRoute.Props) => {
  const session = await getCurrentSession();

  if (session == null) {
    redirect("/");
  }

  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "/";

  const isUserInOrgFromUrl = await auth0Management.doesUserBelongsToOrg(
    session.user.sub,
    orgName
  );

  if (!isUserInOrgFromUrl) {
    return <Page404 />;
  }

  if (owner && repo) {
    const writePermission = await checkWritePermissionToRepo(
      session.user.sub,
      owner,
      repo
    );
    if (!writePermission) {
      return (
        <PermissionDeniedCard title="Additional Permissions Required">
          <div className="flex items-center gap-2 text-red-600">
            <ExclamationCircleIcon className="h-4 w-4" />
            <p>You don&#39;t have write permission to this repo</p>
          </div>
        </PermissionDeniedCard>
      );
    }
  }

  const { hasRepoAccess } = await checkGitHubPermissions(session.user.sub);
  if (!hasRepoAccess) {
    return (
      <PermissionDeniedCard title="Additional Permissions Required">
        <p className="text-gray-1100 text-sm">
          This page requires additional permissions to view. Please authorize to
          continue.
        </p>
        <LoginButton
          additionalParams={{
            connection: "github",
            connection_scope: "read:user,read:org,repo",
          }}
          returnTo={pathname}
        />
      </PermissionDeniedCard>
    );
  }

  return children;
};
