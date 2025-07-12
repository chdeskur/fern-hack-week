"use client";

import { useEffect } from "react";

import { FaceFrownIcon } from "@heroicons/react/24/outline";
import * as Sentry from "@sentry/nextjs";

import { LogoutButton } from "@/components/auth/LogoutButton";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-2">
      <FaceFrownIcon className="size-10" />
      <div className="text-2xl">Failed to load</div>
      <LogoutButton />
    </div>
  );
}
