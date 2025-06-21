"use client";

import { useQuery } from "@tanstack/react-query";

import { DashboardApiClient } from "@/app/services/dashboard-api/client";

import { convertQueryResultToLoadable } from "./convertQueryResultToLoadable";
import { ReactQueryKey } from "./queryKeys";

export function useUserGithubRepos() {
  const queryKey = ReactQueryKey.userGithubRepos();

  return convertQueryResultToLoadable(
    useQuery({
      queryKey: queryKey,
      queryFn: () => DashboardApiClient.getUserGithubRepos(),
    })
  );
}
