"use client";

import React, { useEffect } from "react";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";

import { FullSessionData } from "@/app/services/auth0/getCurrentSession";
import { PostHogIdentify } from "@/components/posthog/PostHogIdentify";
import { PostHogPageView } from "@/components/posthog/PostHogPageView";

export declare namespace PostHogProvider {
  export interface Props {
    session: FullSessionData | undefined;
    children: React.JSX.Element;
  }
}

export function PostHogProvider({ session, children }: PostHogProvider.Props) {
  const isPosthogTrackingEnabled =
    process.env.NEXT_PUBLIC_POSTHOG_TRACKING_ENABLED === "true";

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_POSTHOG_KEY == null) {
      throw new Error(
        "NEXT_PUBLIC_POSTHOG_KEY is not defined in the environment"
      );
    }

    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
      api_host: "/ingest",
      capture_pageview: false, // Disable automatic pageview capture, as we capture manually
    });

    if (!isPosthogTrackingEnabled) {
      posthog.opt_out_capturing();
      posthog.set_config({ disable_session_recording: true });
    }

    posthog.setPersonPropertiesForFlags({
      email: session?.session.user.email,
    });
  }, [isPosthogTrackingEnabled, session?.session.user.email]);

  return (
    <PHProvider client={posthog}>
      {isPosthogTrackingEnabled && (
        <>
          <PostHogPageView />
          <PostHogIdentify user={session?.session.user} />
        </>
      )}
      {children}
    </PHProvider>
  );
}
