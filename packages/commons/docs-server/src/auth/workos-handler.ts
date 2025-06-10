import { removeTrailingSlash } from "@fern-api/docs-utils";
import { withDefaultProtocol } from "@fern-api/ui-core-utils";

import { AuthState, getWorkosRbacRoles } from "./getAuthState";
import { preferPreview } from "./origin";
import { getWorkosSSOAuthorizationUrl } from "./workos";
import {
  encryptSession,
  getSessionFromToken,
  refreshSession,
  toSessionUserInfo,
} from "./workos-session";
import { toFernUser } from "./workos-user-to-fern-user";

interface WorkosAuthParams {
  host: string;
  domain: string;
  fernToken: string | undefined;
  organization: string;
  pathname?: string;
  setFernToken?: (token: string) => void;
  authorizationUrl?: {
    connection?: string;
    provider?: string;
    domainHint?: string;
    loginHint?: string;
  };
  isPreview?: boolean;
}

export async function handleWorkosAuth({
  host,
  domain,
  fernToken,
  organization,
  pathname,
  setFernToken,
  authorizationUrl,
  isPreview,
}: WorkosAuthParams): Promise<AuthState> {
  const state = `${withDefaultProtocol(
    decodeURIComponent(removeTrailingSlash(preferPreview(host, domain)))
  )}${pathname ?? ""}`;

  const session =
    fernToken != null ? await getSessionFromToken(fernToken) : undefined;
  const workosUserInfo = await toSessionUserInfo(session);

  if (workosUserInfo.user) {
    const roles = await getWorkosRbacRoles(
      organization,
      workosUserInfo.user.email
    );
    return {
      authed: true,
      ok: true,
      user: toFernUser(workosUserInfo, roles),
      partner: "workos",
    };
  }

  if (session?.refreshToken) {
    const updatedSession = await refreshSession(session);
    if (updatedSession) {
      if (setFernToken) {
        setFernToken(await encryptSession(updatedSession));
      }
      const roles = await getWorkosRbacRoles(
        organization,
        updatedSession.user.email
      );
      return {
        authed: true,
        ok: true,
        user: toFernUser(await toSessionUserInfo(updatedSession), roles),
        partner: "workos",
      };
    }
  }

  const redirectUri = `${withDefaultProtocol(
    decodeURIComponent(
      removeTrailingSlash(isPreview ? host : preferPreview(host, domain))
    )
  )}/api/fern-docs/auth/sso/callback`;

  const authorizationUrlParams = getWorkosSSOAuthorizationUrl({
    redirectUri,
    organization,
    state,
    ...authorizationUrl,
  });

  return {
    authed: false,
    ok: false,
    authorizationUrl: authorizationUrlParams,
    partner: "workos",
  };
}
