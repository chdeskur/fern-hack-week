"use client";

import { useCallback, useEffect } from "react";

import { useEditorRouting } from "../../providers/EditorRoutingContext";
import { interceptLinkClick } from "./link-interceptor";

const DROPDOWN_SELECTORS = [
  '[data-testid="product-dropdown-content"]',
  '[data-testid="version-dropdown-content"]',
  ".fern-dropdown",
].join(",");

export function EditorLinkInterceptor() {
  const { orgName, docsUrl, branch } = useEditorRouting();

  const handleClick = useCallback(
    (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const link = target.closest("a");

      if (!link) return;

      // Check if the click is within our target containers
      const isInTargetContainer =
        link.closest("#preview-container") || link.closest(DROPDOWN_SELECTORS);

      if (isInTargetContainer) {
        interceptLinkClick(event, { orgName, docsUrl, branch });
      }
    },
    [orgName, docsUrl, branch]
  );

  useEffect(() => {
    // Single global event listener using capture phase for maximum efficiency
    document.addEventListener("click", handleClick, {
      capture: true,
      passive: false,
    });

    return () => {
      document.removeEventListener("click", handleClick, { capture: true });
    };
  }, [handleClick]);

  return null;
}
