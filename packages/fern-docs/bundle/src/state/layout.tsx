"use client";

import { useEffect } from "react";

import { atom, useAtomValue, useSetAtom } from "jotai";

import { FernDocs } from "@fern-api/fdr-sdk";

export const isSidebarFixedAtom = atom<boolean>(false);

export function useIsSidebarFixed() {
  return useAtomValue(isSidebarFixedAtom);
}

export const isLandingPageAtom = atom<boolean>(false);

const layoutAtom = atom<FernDocs.Layout>("guide");

export function SetLayout({ value }: { value: FernDocs.Layout }) {
  const setLayout = useSetAtom(layoutAtom);
  useEffect(() => {
    setLayout(value);
  }, [value, setLayout]);
  return null;
}

export function useLayout() {
  return useAtomValue(layoutAtom);
}

export const emptySidebarAtom = atom<boolean>(false);
export const emptyTableOfContentsAtom = atom<boolean>(false);

export function SetEmptySidebar({ value }: { value: boolean }) {
  const setEmptySidebar = useSetAtom(emptySidebarAtom);
  useEffect(() => {
    setEmptySidebar(value);
  }, [value, setEmptySidebar]);
  return null;
}

export function SetEmptyTableOfContents({ value }: { value: boolean }) {
  const setEmptyTableOfContents = useSetAtom(emptyTableOfContentsAtom);
  useEffect(() => {
    setEmptyTableOfContents(value);
  }, [value, setEmptyTableOfContents]);
  return null;
}

export function useShouldHideAsides() {
  const isSidebarFixed = useAtomValue(isSidebarFixedAtom);
  const layout = useLayout();
  const emptySidebar = useAtomValue(emptySidebarAtom);
  const isLandingPage = useAtomValue(isLandingPageAtom);

  // only guides and overviews currently have table of contents
  const emptyTableOfContents =
    useAtomValue(emptyTableOfContentsAtom) ||
    (layout !== "guide" && layout !== "overview");

  // page layout should supersede a fixed sidebar
  if (layout === "custom" || layout === "page" || isLandingPage) {
    return true;
  }

  if (isSidebarFixed) {
    return false;
  }

  return emptySidebar && emptyTableOfContents;
}

export function HideAsides({ force }: { force?: boolean }) {
  const hideAsides = useShouldHideAsides();
  if (!hideAsides && !force) {
    return null;
  }
  return (
    <style jsx global>{`
      #fern-toc,
      #fern-sidebar[data-state="sticky"],
      #fern-sidebar[data-state="fixed"],
      #fern-sidebar-spacer {
        visibility: hidden;
        width: 0;
        overflow: hidden;
        display: none;
      }
    `}</style>
  );
}
