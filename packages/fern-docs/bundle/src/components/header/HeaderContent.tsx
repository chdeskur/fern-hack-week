"use client";

import { CSSProperties } from "react";
import React from "react";

import { AbstractHeaderContent } from "@fern-docs/components/abstract/AbstractHeaderContent";

import { SearchV2Trigger } from "@/state/search";

export function HeaderContent({
  logo,
  versionSelect,
  productSelect,
  className,
  style,
  showSearchBar,
  navbarLinks,
  loginButton,
  forceHeader = false,
}: {
  logo: React.ReactNode;
  versionSelect: React.ReactNode;
  productSelect: React.ReactNode;
  className?: string;
  style?: CSSProperties;
  showSearchBar?: boolean;
  navbarLinks: React.ReactNode;
  loginButton?: React.ReactNode;
  forceHeader?: boolean;
}) {
  return (
    <AbstractHeaderContent
      className={className}
      style={style}
      logo={logo}
      versionSelect={versionSelect}
      productSelect={productSelect}
      navbarLinks={navbarLinks}
      loginButton={loginButton}
      forceHeader={forceHeader}
      showSearchBar={showSearchBar}
      searchBar={
        <SearchV2Trigger
          aria-label="Search"
          className="fern-header-search-bar overflow-hidden"
          isSearchInSidebar={false}
        />
      }
    />
  );
}
