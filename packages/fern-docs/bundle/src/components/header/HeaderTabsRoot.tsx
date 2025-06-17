"use client";

import { AbstractHeaderTabsRoot } from "@fern-docs/components/abstract/AbstractHeaderTabsRoot";

import { SearchV2Trigger } from "@/state/search";

export function HeaderTabsRoot({
  children,
  showSearchBar,
  className,
}: {
  children: React.ReactNode;
  showSearchBar: boolean;
  className?: string;
}) {
  return (
    <AbstractHeaderTabsRoot
      className={className}
      searchBar={
        showSearchBar && (
          <SearchV2Trigger
            aria-label="Search"
            className="max-w-sidebar-width overflow-hidden"
            isSearchInSidebar={false}
          />
        )
      }
    >
      {children}
    </AbstractHeaderTabsRoot>
  );
}
