import "server-only";

import { createCachedDocsLoader } from "@fern-api/docs-loader";

import { getFernToken } from "@/app/fern-token";
import { SetFernUser } from "@/state/fern-user";

export async function FernUser({
  host,
  domain,
}: {
  host: string;
  domain: string;
}) {
  const loader = await createCachedDocsLoader(
    host,
    domain,
    await getFernToken()
  );
  const authState = await loader.getAuthState();
  return <SetFernUser value={authState.authed ? authState.user : undefined} />;
}
