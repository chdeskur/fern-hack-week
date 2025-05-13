"use client";

import { Fragment } from "react";

import { cn } from "@fern-docs/components";
import { useIsMobile } from "@fern-ui/react-commons";

import { SearchV2Trigger } from "@/state/search";

export function SidebarFixedItemsSection({
  logo,
  versionSelect,
  productSelect,
  className,
  showSearchBar,
  showHeaderInSidebar,
}: {
  logo: React.ReactNode;
  versionSelect: React.ReactNode;
  productSelect: React.ReactNode;
  showBorder?: boolean;
  showSearchBar?: boolean;
  showHeaderInSidebar?: boolean;
  className?: string;
}) {
  const isMobile = useIsMobile();
  if (isMobile) {
    return null;
  }
  if (!showHeaderInSidebar && !showSearchBar) {
    return null;
  }
  return (
    <div className={cn("flex flex-col px-4 lg:pl-5", className)}>
      {showHeaderInSidebar && (
        <>
          <div className="fern-sidebar-header">
            <div className="relative flex h-full min-w-fit flex-1 shrink-0 items-center gap-2 py-1">
              <div className="flex items-center gap-2">{logo}</div>
            </div>
          </div>
          <Fragment key="product-select">{productSelect}</Fragment>
          <Fragment key="version-select">{versionSelect}</Fragment>
        </>
      )}

      <SearchV2Trigger
        aria-label="Search"
        className={cn(
          "w-full overflow-hidden",
          !showHeaderInSidebar && "mt-3 lg:mt-2",
          { "mt-3": showHeaderInSidebar && (productSelect || versionSelect) }
        )}
        isSearchInSidebar={true}
      />
    </div>
  );
}
