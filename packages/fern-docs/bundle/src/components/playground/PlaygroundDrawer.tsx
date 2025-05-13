"use client";

import { useSearchParams } from "next/navigation";
import React from "react";

import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Drawer } from "vaul";

import { slugjoin } from "@fern-api/fdr-sdk/navigation";
import { useIsomorphicLayoutEffect } from "@fern-ui/react-commons";

import { useCurrentPathname } from "@/hooks/use-current-pathname";

import { useHeaderHeight, useViewportSize } from "../hooks/useViewportSize";
import {
  hasExplorerRouteParam,
  withoutExplorerRoute,
} from "./utils/explorer-route";

export function PlaygroundDrawer({ children }: { children: React.ReactNode }) {
  const [snap, setSnap] = React.useState<number | string | null>(null);
  const pathname = useCurrentPathname();
  const searchParams = useSearchParams();
  const open = hasExplorerRouteParam(searchParams);

  const viewport = useViewportSize();
  const headerHeight = useHeaderHeight();

  useIsomorphicLayoutEffect(() => {
    if (open) {
      setTimeout(() => {
        if (open) {
          document.body.style.pointerEvents = "auto";
          setSnap(1);
        }
        // transition takes 500ms to complete
      }, 500);
    }
    return () => {
      setSnap(null);
    };
  }, [open]);

  return (
    <Drawer.Root
      open={open}
      onOpenChange={console.log}
      modal={false}
      dismissible={false}
      disablePreventScroll
      snapPoints={[
        `${headerHeight + 61}px`,
        `${viewport.height / 2 + headerHeight / 2 + 1}px`,
        1,
      ]}
      activeSnapPoint={snap}
      setActiveSnapPoint={setSnap}
      snapToSequentialPoint
      noBodyStyles
      preventScrollRestoration
      handleOnly
      // reposition inputs seem to be quite buggy with the way the playground is implemented
      repositionInputs={false}
    >
      <Drawer.Portal>
        <Drawer.Overlay />
        <Drawer.Content
          onCloseAutoFocus={(e) => {
            e.preventDefault();
            document
              .getElementById(
                `playground-button:${slugjoin(withoutExplorerRoute(pathname))}`
              )
              ?.focus();
          }}
          className="api-explorer width-before-scroll-bar"
        >
          <Drawer.Handle
            className="bg-(color:--grayscale-a4) absolute mx-auto -mb-1.5 h-1.5 w-12 flex-shrink-0 -translate-y-3 cursor-pointer rounded-full"
            preventCycle
          />
          <VisuallyHidden>
            <Drawer.Title>API Explorer</Drawer.Title>
            <Drawer.Description>
              Browse, explore, and try out API endpoints without leaving the
              documentation.
            </Drawer.Description>
          </VisuallyHidden>
          {children}
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
