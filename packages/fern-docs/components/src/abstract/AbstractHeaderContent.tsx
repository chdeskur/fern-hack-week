"use client";

import { CSSProperties } from "react";
import React from "react";

import { FernButtonGroup } from "../FernButton";
import { cn } from "../cn";

export function AbstractHeaderContent({
  logo,
  versionSelect,
  productSelect,
  className,
  style,
  navbarLinks,
  loginButton,
  forceHeader = false,
  searchBar,
  mobileMenuButton,
  themeSwitch,
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
  searchBar?: React.ReactNode;
  mobileMenuButton: React.ReactNode;
  themeSwitch: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex w-full flex-col items-center justify-stretch gap-4",
        className
      )}
    >
      <div
        className={cn(
          "flex w-full items-center justify-stretch gap-4",
          className
        )}
        style={style}
      >
        <div className="fern-header-logo-container">
          <div className="flex items-center gap-2">
            <div className="flex items-center lg:items-start">{logo}</div>
            <div
              className={cn("items-baseline lg:flex", {
                hidden: !forceHeader,
                flex: forceHeader,
              })}
            >
              {productSelect}
              {versionSelect}
            </div>
          </div>
        </div>

        {searchBar}

        <FernButtonGroup asChild>
          <nav className="fern-header-navbar-links" aria-label="Navbar links">
            {navbarLinks}
            {loginButton}
            {themeSwitch}
          </nav>
        </FernButtonGroup>

        <div className="fern-header-mobile-menu-button">{mobileMenuButton}</div>
      </div>
    </div>
  );
}
