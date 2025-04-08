import { redirect } from "next/navigation";

import { getAuth0Client } from "@/app/services/auth0/auth0";
import { PosthogFeatureFlag } from "@/components/posthog/feature-flags/flags";
import { isFeatureFlagEnabledForUser } from "@/components/posthog/feature-flags/server-side";

import { Auth0OrgName, Auth0UserID } from "../services/auth0/types";

export default async function Page({
  params,
}: {
  params: Promise<{ orgName: Auth0OrgName }>;
}) {
  const auth0 = await getAuth0Client();
  const session = await auth0.getSession();

  if (session == null) {
    redirect("/");
  }

  const isDocsPageEnabled = await isFeatureFlagEnabledForUser(
    PosthogFeatureFlag.ENABLE_DOCS_PAGE,
    Auth0UserID(session.user.sub)
  );

  const { orgName } = await params;

  if (isDocsPageEnabled) {
    redirect(`/${orgName}/docs`);
  } else {
    redirect(`/${orgName}/members`);
  }
}
