import { redirect } from "next/navigation";

import { getCurrentSessionOrThrow } from "@/app/services/auth0/getCurrentSession";

import {
  PosthogFeatureFlag,
  isFeatureFlagEnabledForUser,
} from "./featureFlags";

export declare namespace FeatureFlagged {
  export interface Props {
    flag: PosthogFeatureFlag;
    redirectWhenDisabled?: boolean;
    children: React.JSX.Element;
  }
}

export async function FeatureFlagged({
  flag,
  redirectWhenDisabled = false,
  children,
}: FeatureFlagged.Props) {
  const { userId } = await getCurrentSessionOrThrow();
  const isEnabled = await isFeatureFlagEnabledForUser(flag, userId);

  if (isEnabled) {
    return children;
  }

  if (redirectWhenDisabled) {
    redirect("/");
  }

  return null;
}
