"use client";

import { useQuery } from "@tanstack/react-query";

import { FdrAPI } from "@fern-api/fdr-sdk";
import { Loadable, mapLoadable } from "@fern-ui/loadable";

import { DashboardApiClient } from "@/app/services/dashboard-api/client";
import { getDocsSiteUrl } from "@/utils/getDocsSiteUrl";
import { useOrgNameFromPathname } from "@/utils/useOrgNameFromPathname";

import { convertQueryResultToLoadable } from "./convertQueryResultToLoadable";
import { ReactQueryKey } from "./queryKeys";

export function useMyDocsSites() {
  const orgName = useOrgNameFromPathname();
  const result = convertQueryResultToLoadable(
    useQuery({
      queryKey: ReactQueryKey.myDocsSites(orgName),
      queryFn: () => DashboardApiClient.getMyDocsSites({ orgName }),
    })
  );
  return result;
}

export function useDocsSite(
  docsUrl: string
): Loadable<FdrAPI.dashboard.DocsSite | undefined> {
  const maybeLoadedDocsSites = useMyDocsSites();

  return mapLoadable(maybeLoadedDocsSites, ({ docsSites }) =>
    docsSites.find((docsSite) => getDocsSiteUrl(docsSite) === docsUrl)
  );
}
