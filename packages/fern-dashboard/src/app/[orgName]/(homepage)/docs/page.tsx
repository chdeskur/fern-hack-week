import { redirect } from "next/navigation";

import { Auth0OrgName } from "@/app/services/auth0/types";
import { DocsZeroState } from "@/components/docs-page/DocsZeroState";
import { PosthogFeatureFlag } from "@/components/posthog/feature-flags/flags";
import { FeatureFlaggedServerSide } from "@/components/posthog/feature-flags/server-side";
import { constructDocsUrlParam } from "@/utils/constructDocsUrlParam";
import { getDocsSiteUrl } from "@/utils/getDocsSiteUrl";

import getMyDocsSites from "../../../api/get-my-docs-sites/handler";
import { getCurrentSessionOrThrow } from "../../../services/auth0/getCurrentSession";

export default async function Page({
  params,
}: {
  params: Promise<{ orgName: Auth0OrgName }>;
}) {
  const { orgName } = await params;
  const session = await getCurrentSessionOrThrow();

  const { docsSites } = await getMyDocsSites({
    orgName,
    token: session.accessToken,
  });

  const firstDocsSite = docsSites[0];
  if (firstDocsSite != null) {
    const { orgName } = await params;
    redirect(
      `/${orgName}/docs/${constructDocsUrlParam(getDocsSiteUrl(firstDocsSite))}`
    );
  }

  return (
    <FeatureFlaggedServerSide
      flag={PosthogFeatureFlag.ENABLE_DOCS_PAGE}
      redirectWhenDisabled
    >
      <DocsZeroState user={session.user} />
    </FeatureFlaggedServerSide>
  );
}
