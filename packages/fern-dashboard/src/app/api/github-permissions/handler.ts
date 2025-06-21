import jwt from "jsonwebtoken";

import { getCurrentSession } from "@/app/services/auth0/getCurrentSession";
import { Auth0UserID } from "@/app/services/auth0/types";

export interface GitHubPermissionsResponse {
  hasRepoAccess: boolean;
  reauthorizeUrl?: string;
  error?: string;
}

// Define the required scopes for repo access
const REQUIRED_SCOPES = ["repo", "read:user", "read:org"];

/**
 * TODO -- FIX THIS:
 * Am thinking that we should have some sort of means to test whether or not a user
 * has given us enough permissions to do what we need. Seems like the JWT isn't getting
 * refreshed properly after more permissions are added, so this always returns false.
 */
export default async function checkGitHubPermissions(
  _userId: Auth0UserID
): Promise<GitHubPermissionsResponse> {
  const session = await getCurrentSession();

  if (!session?.accessToken) {
    return {
      hasRepoAccess: false,
      error: "GitHub not connected",
    };
  }

  try {
    // Decode the JWT access token to check scopes
    const decodedToken = jwt.decode(session.accessToken);
    console.log("decodedToken", decodedToken);

    if (!decodedToken || typeof decodedToken !== "object") {
      return {
        hasRepoAccess: false,
        error: "Invalid access token",
      };
    }

    // Check if the token has the required scopes
    // The scopes might be in different fields depending on the token structure
    const scopes =
      decodedToken.scope || decodedToken.scp || decodedToken.permissions || [];

    // Convert to array if it's a string (space-separated)
    const scopeArray = typeof scopes === "string" ? scopes.split(" ") : scopes;

    // Check if all required scopes are present
    const hasAllRequiredScopes = REQUIRED_SCOPES.every((requiredScope) =>
      scopeArray.includes(requiredScope)
    );

    if (hasAllRequiredScopes) {
      return { hasRepoAccess: true };
    } else {
      // Return a reauthorize URL that will force re-authentication with the required scopes
      const reauthorizeUrl = `/auth/login?connection=github&connection_scope=${REQUIRED_SCOPES.join(",")}`;

      return {
        hasRepoAccess: false,
        reauthorizeUrl,
        error: `Missing required scopes. Required: ${REQUIRED_SCOPES.join(", ")}, Found: ${scopeArray.join(", ")}`,
      };
    }
  } catch (error: any) {
    console.error("Error decoding access token:", error);
    return {
      hasRepoAccess: false,
      error: "Failed to decode access token",
    };
  }
}
