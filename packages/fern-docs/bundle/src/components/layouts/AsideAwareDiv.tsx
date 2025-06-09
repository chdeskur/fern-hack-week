"use client";

import React from "react";

// data-aside-state styling is only used in the changelog overview
// this should be deterministic
export const AsideAwareDiv = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div"> & {
    isFullPage: boolean;
  }
>(({ children, isFullPage, ...props }, ref) => {
  return (
    <div
      ref={ref}
      {...props}
      data-aside-state={isFullPage ? "hidden" : "visible"}
    >
      {children}
    </div>
  );
});

AsideAwareDiv.displayName = "AsideAwareDiv";
