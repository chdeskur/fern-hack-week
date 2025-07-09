import { Settings } from "@/components/settings/Settings";
import { parseDocsUrlParam } from "@/utils/parseDocsUrlParam";
import { EncodedDocsUrl } from "@/utils/types";

export default async function Page({
  params,
}: {
  params: Promise<{ docsUrl: EncodedDocsUrl }>;
}) {
  const docsUrl = parseDocsUrlParam(await params);
  return <Settings docsUrl={docsUrl} />;
}
