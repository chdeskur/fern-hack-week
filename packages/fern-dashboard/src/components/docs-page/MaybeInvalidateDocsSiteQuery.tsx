"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

import { useRouter } from "@bprogress/next/app";
import { useQueryClient } from "@tanstack/react-query";

import { ReactQueryKey } from "@/state/queryKeys";
import { useOrgNameFromPathname } from "@/utils/useOrgNameFromPathname";

export const INVALIDATE_DOCS_QUERY_KEY = "invalidate";

export function MaybeInvalidateDocsSiteQuery() {
  const queryClient = useQueryClient();
  const orgName = useOrgNameFromPathname();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const run = async () => {
      if (searchParams.has(INVALIDATE_DOCS_QUERY_KEY)) {
        const queryKey = ReactQueryKey.myDocsSites(orgName);
        await queryClient.invalidateQueries({ queryKey });
        router.replace(pathname);
      }
    };

    void run();
  }, [orgName, pathname, queryClient, router, searchParams]);

  return null;
}
