"use client";

import React from "react";

import { isExplorerRoute } from "@fern-api/docs-utils";
import { useCurrentPathname } from "@fern-docs/components/hooks/use-current-pathname";
import { usePrevious } from "@fern-ui/react-commons";

import { scrollToRoute } from "../util/anchor";

export function ScrollToTop() {
  const pathname = useCurrentPathname();
  const previousPathname = usePrevious(pathname);
  React.useEffect(() => {
    if (isExplorerRoute(pathname) || isExplorerRoute(previousPathname)) {
      // don't scroll to top if the route is actually the same (minus the explorer route)
      return;
    }

    if (!scrollToRoute(`${pathname}${window.location.hash}`)) {
      window.scrollTo(0, 0);
    }
  }, [pathname, previousPathname]);
  return null;
}
