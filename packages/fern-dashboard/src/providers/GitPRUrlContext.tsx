"use client";

import { ReactNode, createContext, useContext, useState } from "react";

export const GitPRUrlContext = createContext<{
  gitPrUrl: string | undefined;
  setPrUrl: (url: string) => void;
}>({
  gitPrUrl: undefined,
  setPrUrl: (_url: string) => {
    return;
  },
});

export function GitPRUrlProvider({ children }: { children: ReactNode }) {
  const [gitPrUrl, setGitPrUrl] = useState<string | undefined>(undefined);

  function setPrUrl(url: string) {
    setGitPrUrl(url);
  }

  return (
    <GitPRUrlContext.Provider value={{ gitPrUrl, setPrUrl }}>
      {children}
    </GitPRUrlContext.Provider>
  );
}

export function useGitPrUrl() {
  return useContext(GitPRUrlContext);
}
