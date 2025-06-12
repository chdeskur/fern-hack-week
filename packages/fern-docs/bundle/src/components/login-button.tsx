import "server-only";

import { getReturnToQueryParam } from "@fern-api/docs-server/auth/return-to";
import { DocsLoader } from "@fern-api/docs-server/docs-loader";
import { isTrailingSlashEnabled } from "@fern-api/docs-utils";
import { FernButton } from "@fern-docs/components";

import { LoginButtonClient } from "./login-button-client";
import { getApiRouteSupplier } from "./util/getApiRouteSupplier";

export async function LoginButton({
  loader,
  size,
  className,
  showIcon,
  disabled,
}: {
  loader: DocsLoader;
  size?: "xs" | "sm" | "lg";
  className?: string;
  showIcon?: boolean;
  disabled?: boolean;
}) {
  const [authConfig, authState, { basePath }] = await Promise.all([
    loader.getAuthConfig(),
    loader.getAuthState(),
    loader.getMetadata(),
  ]);

  if (!authConfig) {
    return null;
  }

  if (disabled) {
    return (
      <FernButton variant="outlined" className={className} disabled>
        Login
      </FernButton>
    );
  }

  if (authConfig.type === "oauth2") {
    // currently oauth2 is only used for webflow and rightbrain to facilitate
    // injected api keys into the docs. neither of which require login.
    return null;
  }

  const getApiRoute = getApiRouteSupplier({
    basepath: basePath,
    includeTrailingSlash: isTrailingSlashEnabled(),
  });

  const logoutUrl = getApiRoute("/api/fern-docs/auth/logout");

  const loginUrl =
    (!authState.authed ? authState.authorizationUrl : undefined) ??
    (authConfig.type === "basic_token_verification"
      ? authConfig.redirect
      : undefined);

  const href = authState.authed ? logoutUrl : loginUrl;

  if (!href) {
    return null;
  }

  return (
    <LoginButtonClient
      authed={authState.authed}
      returnToQueryParam={getReturnToQueryParam(authConfig)}
      href={href}
      size={size}
      className={className}
      showIcon={showIcon}
      id="fern-auth-button"
      disabled={disabled}
    />
  );
}
