"use client";

import { ReactNode, createContext, useContext } from "react";

interface GithubPermissionsContextType {
  writePermission: boolean | undefined;
}

const GithubPermissionsContext =
  createContext<GithubPermissionsContextType | null>(null);

export function GithubPermissionsProvider({
  children,
  writePermission,
}: {
  children: ReactNode;
  writePermission: boolean | undefined;
}) {
  return (
    <GithubPermissionsContext.Provider
      value={{
        writePermission,
      }}
    >
      {children}
    </GithubPermissionsContext.Provider>
  );
}

export function useGithubPermissions() {
  const context = useContext(GithubPermissionsContext);
  if (!context) {
    throw new Error(
      "useGithubPermissions must be used within a GithubPermissionsProvider"
    );
  }
  return context;
}
