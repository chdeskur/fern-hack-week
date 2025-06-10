import { DocsSiteOverviewCard } from "@/components/docs-page/DocsSiteOverviewCard";
import { PosthogFeatureFlag } from "@/components/posthog/feature-flags/flags";
import { FeatureFlaggedServerSide } from "@/components/posthog/feature-flags/server-side";

import { parseDocsUrlParam } from "../../../../../utils/parseDocsUrlParam";

export default async function Page(props: {
  params: Promise<{ docsUrl: string }>;
}) {
  const docsUrl = parseDocsUrlParam(await props.params);

  return (
    <FeatureFlaggedServerSide
      flag={PosthogFeatureFlag.ENABLE_DOCS_PAGE}
      redirectWhenDisabled
    >
      <DocsSiteOverviewCard docsUrl={docsUrl} />
    </FeatureFlaggedServerSide>
  );
}
