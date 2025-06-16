"use client";

import React from "react";

import { FernScrollArea, cn } from "@fern-docs/components";
import { FERN_SIDEBAR_SCROLL_AREA_ID } from "@fern-docs/components/constants";
import { ThemeSwitch } from "@fern-docs/components/header/theme-switch";

import { useDismountMeasureSidebarScrollPosition } from "@/state/sidebar-scroll";

import { MobileSidebarHeaderLinks } from "./MobileSidebarHeaderLinks";
import { SidebarFixedItemsSection } from "./SidebarFixedItemsSection";

export const SidebarContainer = React.memo(function SidebarContainer({
  logo,
  productSelect,
  versionSelect,
  navbarLinks,
  loginButton,
  children,
  showSearchBar,
  showHeaderInSidebar,
}: {
  showSearchBar: boolean;
  showHeaderInSidebar: boolean;
  logo: React.ReactNode;
  productSelect: React.ReactNode;
  versionSelect: React.ReactNode;
  navbarLinks: React.ReactNode;
  loginButton: React.ReactNode;
  children: React.ReactNode;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  useDismountMeasureSidebarScrollPosition(ref);

  return (
    <>
      <SidebarFixedItemsSection
        logo={logo}
        productSelect={productSelect}
        versionSelect={versionSelect}
        showSearchBar={showSearchBar}
        showHeaderInSidebar={showHeaderInSidebar}
      />
      <FernScrollArea
        id={FERN_SIDEBAR_SCROLL_AREA_ID}
        rootClassName="flex-1"
        className="group/sidebar mask-grad-y-3 sticky overscroll-contain [&>div]:space-y-6"
        scrollbars="vertical"
        ref={ref}
      >
        {loginButton}
        {children}
        <MobileSidebarHeaderLinks hideInDesktop={!showHeaderInSidebar}>
          {navbarLinks}
        </MobileSidebarHeaderLinks>
        <ThemeSwitch
          className={cn(
            "mx-auto mt-8 flex",
            !showHeaderInSidebar && "lg:hidden"
          )}
        />
      </FernScrollArea>
    </>
  );
});
