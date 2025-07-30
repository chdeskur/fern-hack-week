"use client";

import { useRouter } from "next/navigation";
import React, { useCallback, useMemo } from "react";

import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Drawer } from "vaul";

import { slugjoin } from "@fern-api/fdr-sdk/navigation";
import { useIsomorphicLayoutEffect } from "@fern-ui/react-commons";

import { useUrlParams } from "@/hooks/use-url-params";

import { useHeaderHeight, useViewportSize } from "../hooks/useViewportSize";
import { ChatAgentConfig, getChatAgent } from "./agent/ChatAgent";
import { ChatAgentProvider } from "./agent/ChatAgentProvider";
import { PlaygroundLogger } from "./agent/PlaygroundContext";

export function PlaygroundDrawer({ children }: { children: React.ReactNode }) {
  const [snap, setSnap] = React.useState<number | string | null>(null);
  const { removeUrlParamFromPathname, urlHasParam, addUrlParamToPathname } =
    useUrlParams();
  const open = urlHasParam("explorer");
  const router = useRouter();
  const viewport = useViewportSize();
  const headerHeight = useHeaderHeight();

  // Create navigation callbacks for the ChatAgent
  const onNavigateToEndpoint = useCallback(async (endpointId: string) => {
    PlaygroundLogger.debug(`Navigation to endpoint ${endpointId} requested`);
    // TODO: Implement actual navigation logic
    // This would typically involve:
    // 1. Finding the endpoint's URL/route
    // 2. Using the router to navigate to that page
    // 3. Potentially updating the URL parameters

    // For now, we'll just log the request
    // In a full implementation, this might look like:
    // const endpointRoute = findEndpointRoute(endpointId);
    // router.push(endpointRoute);
  }, []);

  const onExecuteSequence = useCallback(
    async (endpointIds: string[]) => {
      PlaygroundLogger.debug(
        `Multi-step sequence execution requested:`,
        endpointIds
      );
      // TODO: Implement multi-step execution
      // This would involve:
      // 1. Navigate to first endpoint
      // 2. Execute request with available parameters
      // 3. Use response from first call as input to second call
      // 4. Continue sequence until complete

      // For now, we'll navigate through each endpoint in sequence
      for (const endpointId of endpointIds) {
        await onNavigateToEndpoint(endpointId);
        // In a real implementation, we'd wait for user to provide parameters
        // and execute the request before moving to the next endpoint
      }
    },
    [onNavigateToEndpoint]
  );

  const chatAgentConfig: ChatAgentConfig = useMemo(
    () => ({
      onNavigateToEndpoint,
      onExecuteSequence,
    }),
    [onNavigateToEndpoint, onExecuteSequence]
  );

  const chatAgent = getChatAgent(chatAgentConfig);

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

  /**
   * This function is used to handle the open change event of the drawer, this ensures that
   * the URL param is always in sync with the drawer's open state.
   */
  const handleOpenChange = useCallback(
    (open: boolean) => {
      if (!open) {
        router.replace(removeUrlParamFromPathname("explorer"));
      } else {
        router.replace(addUrlParamToPathname("explorer", "true"));
      }
    },
    [router, removeUrlParamFromPathname, addUrlParamToPathname]
  );

  return (
    <Drawer.Root
      open={open}
      onOpenChange={handleOpenChange}
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
        <ChatAgentProvider agent={chatAgent}>
          <Drawer.Content
            onCloseAutoFocus={(e) => {
              e.preventDefault();
              document
                .getElementById(
                  `playground-button:${slugjoin(removeUrlParamFromPathname("explore"))}`
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
        </ChatAgentProvider>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
