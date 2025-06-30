"use client";

import { ReactNode, createContext, useContext, useState } from "react";

export const BranchContext = createContext<{
  branch: string;
  setBranch: (branch: string) => void;
}>({
  branch: "",
  setBranch: (_branch: string) => {
    return;
  },
});

export function BranchProvider({
  branch,
  children,
}: {
  branch: string;
  children: ReactNode;
}) {
  const [currBranch, setBranchStore] = useState<string>(branch);

  function setBranch(branch: string) {
    setBranchStore(branch);
  }

  return (
    <BranchContext.Provider value={{ branch: currBranch, setBranch }}>
      {children}
    </BranchContext.Provider>
  );
}

export function useBranch() {
  return useContext(BranchContext);
}
