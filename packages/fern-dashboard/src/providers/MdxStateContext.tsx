"use client";

import { ReactNode, createContext, useContext, useState } from "react";

type FilePath = string;
type Markdown = string;

export const MdxStateContext = createContext<{
  updatedMarkdownFiles: Record<FilePath, Markdown>;
  setMdxState: (filePath: FilePath, markdown: Markdown) => void;
}>({
  updatedMarkdownFiles: {},
  setMdxState: (_filePath: FilePath, _markdown: Markdown) => {
    return;
  },
});

export function MdxStateProvider({ children }: { children: ReactNode }) {
  const [updatedMarkdownFiles, setMdxStateStore] = useState<
    Record<FilePath, Markdown>
  >({});

  function setMdxState(filePath: FilePath, markdown: Markdown) {
    setMdxStateStore((prev) => ({ ...prev, [filePath]: markdown }));
  }

  return (
    <MdxStateContext.Provider value={{ updatedMarkdownFiles, setMdxState }}>
      {children}
    </MdxStateContext.Provider>
  );
}

export function useMdxState() {
  return useContext(MdxStateContext);
}
