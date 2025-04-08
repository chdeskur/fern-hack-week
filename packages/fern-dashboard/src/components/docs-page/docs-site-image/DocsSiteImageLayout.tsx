"use client";

import React from "react";

import {
  HOMEPAGE_SCREENSHOT_HEIGHT,
  HOMEPAGE_SCREENSHOT_WIDTH,
} from "@/app/api/homepage-images/constants";

export declare namespace DocsSiteImageLayout {
  export interface Props {
    children: React.JSX.Element;
  }
}

export function DocsSiteImageLayout({ children }: DocsSiteImageLayout.Props) {
  return (
    <div
      className="border-border relative flex shrink-0 overflow-hidden rounded-lg border md:w-[40%] md:min-w-[150px] md:max-w-[400px]"
      style={{
        aspectRatio: `${HOMEPAGE_SCREENSHOT_WIDTH} / ${HOMEPAGE_SCREENSHOT_HEIGHT}`,
      }}
    >
      {children}
    </div>
  );
}
