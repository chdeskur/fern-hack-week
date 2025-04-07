import { redirect } from "next/navigation";

import { DocsZeroState } from "@/components/docs-page/DocsZeroState";
import { PosthogFeatureFlag } from "@/components/posthog/feature-flags/flags";
import { FeatureFlaggedServerSide } from "@/components/posthog/feature-flags/server-side";
import { constructDocsUrlParam } from "@/utils/constructDocsUrlParam";
import { getDocsSiteUrl } from "@/utils/getDocsSiteUrl";

import getMyDocsSites from "../../api/get-my-docs-sites/handler";
import { getCurrentSessionOrThrow } from "../../services/auth0/getCurrentSession";

export default async function Page() {
  const { session, orgId } = await getCurrentSessionOrThrow();

  const { docsSites } = await getMyDocsSites({
    token: session.tokenSet.accessToken,
    orgId,
  });

  const firstDocsSite = docsSites[0];
  if (firstDocsSite != null) {
    redirect(`/docs/${constructDocsUrlParam(getDocsSiteUrl(firstDocsSite))}`);
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
