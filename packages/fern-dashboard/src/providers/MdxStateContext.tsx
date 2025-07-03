"use client";

import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

import { MdxToHtmlResponse, htmlToMdx } from "@fern-docs/mdx";

type FilePath = string;
type Markdown = string;
interface MdxDependencies {
  html?: MdxToHtmlResponse["html"];
  frontmatter?: MdxToHtmlResponse["frontmatter"];
  customElements?: MdxToHtmlResponse["customElements"];
  changed?: boolean;
}

export const MdxStateContext = createContext<{
  changedMdxFiles: Record<FilePath, Markdown>;
  updateDependencies: (filePath: FilePath, state: MdxDependencies) => void;
  stageChanges: (filePath: FilePath, state: MdxDependencies) => void;
}>({
  changedMdxFiles: {},
  updateDependencies: () => undefined,
  stageChanges: () => undefined,
});

export function MdxStateProvider({ children }: { children: ReactNode }) {
  const [mdxDepsStore, setMdxDepsStore] = useState<
    Record<FilePath, MdxDependencies>
  >({});

  // Stablilize updateMdxState identity to prevent unnecessary re-renders
  const updateDependencies = useCallback(
    (filePath: FilePath, state: MdxDependencies) => {
      setMdxDepsStore((prev) => ({
        ...prev,
        [filePath]: {
          html: state.html ?? prev[filePath]?.html,
          frontmatter: {
            // Merge existing frontmatter with new frontmatter
            ...prev[filePath]?.frontmatter,
            // Only override frontmatter properties that are newly provided
            ...state.frontmatter,
          },
          customElements:
            state.customElements ?? prev[filePath]?.customElements,
          changed: state.changed ?? prev[filePath]?.changed,
        },
      }));
    },
    [setMdxDepsStore]
  );

  // Alias for updateDependencies that sets the changed flag to true by default
  const stageChanges = useCallback(
    (filePath: FilePath, state: MdxDependencies) => {
      updateDependencies(filePath, { ...state, changed: true });
    },
    [updateDependencies]
  );

  // Build a map of changed files (changed flag is true) and their contents
  const changedMdxFiles = useMemo(() => {
    return Object.entries(mdxDepsStore).reduce<Record<FilePath, Markdown>>(
      (acc, [filePath, state]) => {
        if (
          state.changed &&
          state.html &&
          state.frontmatter &&
          state.customElements
        ) {
          acc[filePath] = htmlToMdx(
            state.html,
            state.frontmatter,
            state.customElements
          ).mdx;
        }
        return acc;
      },
      {}
    );
  }, [mdxDepsStore]);

  return (
    <MdxStateContext.Provider
      value={{ changedMdxFiles, updateDependencies, stageChanges }}
    >
      {children}
    </MdxStateContext.Provider>
  );
}

export function useMdxState() {
  return useContext(MdxStateContext);
}
