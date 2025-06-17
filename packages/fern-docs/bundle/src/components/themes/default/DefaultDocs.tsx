import React from "react";

import AbstractDefaultDocs from "@fern-docs/components/theming/AbstractDefaultDocs";

import { HeaderTabsRoot } from "@/components/header/HeaderTabsRoot";

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
  return (
    <AbstractDefaultDocs
      versionSelect={versionSelect}
      productSelect={productSelect}
      sidebar={sidebar}
      announcement={announcement}
      header={header}
      hasProductsOrVersions={hasProductsOrVersions}
      isSidebarFixed={isSidebarFixed}
      isHeaderDisabled={isHeaderDisabled}
      headerTabs={
        <HeaderTabsRoot showSearchBar={showSearchBarInTabs}>
          {tabs}
        </HeaderTabsRoot>
      }
      lightHeaderClassName={lightHeaderClassName}
      darkHeaderClassName={darkHeaderClassName}
      lightSidebarClassName={lightSidebarClassName}
      darkSidebarClassName={darkSidebarClassName}
    >
      {children}
    </AbstractDefaultDocs>
  );
}
