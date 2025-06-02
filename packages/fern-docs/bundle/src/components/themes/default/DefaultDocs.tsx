"use client";

import { useTheme } from "next-themes";
import React from "react";

import { HydrationBoundary } from "jotai-ssr";

import { cn } from "@fern-docs/components";

import { Separator } from "@/components/Separator";
import { FERN_FOOTER_ID } from "@/components/constants";
import { HeaderTabsRoot } from "@/components/header/HeaderTabsRoot";
import { isSidebarFixedAtom } from "@/state/layout";

import { FernHeader } from "./fern-header";
import { MainCtx } from "./mobile-menu";
import { SidebarNav } from "./side-nav";

export default function DefaultDocs({
  header,
  versionSelect,
  productSelect,
  sidebar,
  children,
  announcement,
  tabs,
  hasProductsOrVersions = false,
  isSidebarFixed = false,
  isHeaderDisabled = false,
  showSearchBarInTabs = false,
  lightHeaderClassName,
  darkHeaderClassName,
  lightSidebarClassName,
  darkSidebarClassName,
}: {
  header: React.ReactNode;
  versionSelect?: React.ReactNode;
  productSelect?: React.ReactNode;
  sidebar: React.ReactNode;
  children: React.ReactNode;
  announcement?: React.ReactNode;
  tabs?: React.ReactNode;
  hasProductsOrVersions?: boolean;
  isSidebarFixed?: boolean;
  isHeaderDisabled?: boolean;
  showSearchBarInTabs?: boolean;
  lightHeaderClassName?: string;
  darkHeaderClassName?: string;
  lightSidebarClassName?: string;
  darkSidebarClassName?: string;
}) {
  const { resolvedTheme } = useTheme();
  const headerClassName =
    resolvedTheme === "dark" ? darkHeaderClassName : lightHeaderClassName;
  const sidebarClassName =
    resolvedTheme === "dark" ? darkSidebarClassName : lightSidebarClassName;
  const mainRef = React.useRef<HTMLDivElement>(null);
  return (
    <HydrationBoundary
      hydrateAtoms={[[isSidebarFixedAtom, isSidebarFixed]]}
      options={{ enableReHydrate: true }}
    >
      <div className="fern-background-image pointer-events-none fixed inset-0" />
      <FernHeader
        className={cn(
          "fern-background-image",
          { "lg:hidden": isHeaderDisabled },
          headerClassName
        )}
        data-theme="default"
      >
        {announcement}
        <div className="width-before-scroll-bar">
          <div className="fern-header-content">{header}</div>
          <HeaderTabsRoot showSearchBar={showSearchBarInTabs}>
            {tabs}
          </HeaderTabsRoot>
        </div>
      </FernHeader>

      <MainCtx.Provider value={mainRef}>
        <main
          ref={mainRef}
          className="mt-(--header-height) relative z-0 flex"
          data-theme="default"
        >
          <SidebarNav className={sidebarClassName} data-theme="default">
            <div
              className={cn("fern-header-switchers px-2 py-4 lg:hidden", {
                hidden: !hasProductsOrVersions,
              })}
            >
              {productSelect}
              {versionSelect}
            </div>
            <Separator
              className={cn("bg-border-concealed lg:hidden", {
                hidden: !hasProductsOrVersions,
              })}
            />

            {sidebar}
          </SidebarNav>
          {children}
        </main>
      </MainCtx.Provider>

      {/* Enables footer DOM injection */}
      <footer id={FERN_FOOTER_ID} className="width-before-scroll-bar" />
    </HydrationBoundary>
  );
}
