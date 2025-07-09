"use client";

import { useEffect } from "react";

import { useEditorRouting } from "../../providers/EditorRoutingContext";
import { interceptLinkClick } from "./link-interceptor";

const CONTENT_TESTIDS_TO_INTERCEPT = [
  "product-dropdown-content",
  "version-dropdown-content",
];

export function EditorLinkInterceptor() {
  const { orgName, docsUrl, branch } = useEditorRouting();

  useEffect(() => {
    const handleLinkClick = (event: MouseEvent) => {
      interceptLinkClick(event, { orgName, docsUrl, branch });
    };

    const listeners: {
      element: HTMLElement;
      listener: (event: MouseEvent) => void;
    }[] = [];

    // Function to override link clicks and track them
    const listenToChangesForElement = (element: HTMLElement) => {
      element.addEventListener("click", handleLinkClick);
      listeners.push({ element, listener: handleLinkClick });
    };

    // Override link clicks for elements in the preview container
    const previewContainer = document.getElementById("preview-container");
    if (previewContainer) {
      listenToChangesForElement(previewContainer);
    }

    // MutationObserver to watch for dropdown elements
    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as HTMLElement;

            // to check if this is one of our target dropdowns to intercept, we utilize the data-testid attribute
            if (
              Array.from(element.children).some((child) =>
                CONTENT_TESTIDS_TO_INTERCEPT.includes(
                  child.attributes.getNamedItem("data-testid")?.value ?? ""
                )
              )
            ) {
              listenToChangesForElement(element);
            } else if (
              Array.from(element.children).some((child) =>
                child.classList.contains("fern-dropdown")
              )
            ) {
              console.warn(
                `WARN: Editor route interceptor found unknown inserted dropdown, to intercept \
                please specify a data-testid and add to interceptor list.`
              );
            }
          }
        });
      });
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      // cleanup listeners
      listeners.forEach(({ element, listener }) => {
        element.removeEventListener("click", listener);
      });

      mutationObserver.disconnect();
    };
  }, [orgName, docsUrl, branch]);

  return null;
}
