import { redirect } from "next/navigation";

import { getCurrentSession } from "@/app/services/auth0/getCurrentSession";
import { Auth0OrgName } from "@/app/services/auth0/types";
import { DocsSiteOverviewCard } from "@/components/docs-page/DocsSiteOverviewCard";
import { PosthogFeatureFlag } from "@/components/posthog/feature-flags/flags";
import { FeatureFlaggedServerSide } from "@/components/posthog/feature-flags/server-side";

import { parseDocsUrlParam } from "../../../../../utils/parseDocsUrlParam";

export default async function Page(props: {
  params: Promise<{ orgName: Auth0OrgName; docsUrl: string }>;
}) {
  const { orgName, docsUrl: docsUrlParam } = await props.params;
  const docsUrl = parseDocsUrlParam({ docsUrl: docsUrlParam });
  const session = await getCurrentSession();

  if (!session) {
    redirect("/");
  }

  return (
    <FeatureFlaggedServerSide
      flag={PosthogFeatureFlag.ENABLE_DOCS_PAGE}
      redirectWhenDisabled
    >
      <DocsSiteOverviewCard
        orgName={orgName}
        docsUrl={docsUrl}
        session={session}
      />
    </FeatureFlaggedServerSide>
  );
}
