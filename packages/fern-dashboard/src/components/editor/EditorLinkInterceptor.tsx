"use client";

import { useEffect } from "react";

import { useEditorRouting } from "../../providers/EditorRoutingContext";

export function EditorLinkInterceptor() {
  const { orgName, docsUrl, branch, isEditorMode } = useEditorRouting();

  useEffect(() => {
    if (!isEditorMode) return;

    const handleLinkClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const link = target.closest("a");

      if (!link) return;

      const href = link.getAttribute("href");
      if (!href) return;

      // Skip external links, anchors, and already modified links
      if (
        href.startsWith("http") ||
        href.startsWith("mailto:") ||
        href.startsWith("#") ||
        href.includes("/editor/")
      ) {
        return;
      }

      // Prevent default navigation
      event.preventDefault();

      // Convert to editor route
      const cleanHref = href.startsWith("/") ? href.slice(1) : href;
      const editorHref = `/${orgName}/editor/${docsUrl}/${branch}/${cleanHref}`;

      // Navigate using Next.js router
      window.location.href = editorHref;
    };

    const previewContainer = document.getElementById("preview-container");
    if (previewContainer) {
      previewContainer.addEventListener("click", handleLinkClick);
    }

    return () => {
      if (previewContainer) {
        previewContainer.removeEventListener("click", handleLinkClick);
      }
    };
  }, [orgName, docsUrl, branch, isEditorMode]);

  return null;
}
