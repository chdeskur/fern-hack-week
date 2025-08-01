"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useRef, useState } from "react";

import { ArrowUp, Bot, Maximize2, Minimize2, RotateCcw, X } from "lucide-react";

import { conformExplorerRoute } from "@fern-api/docs-utils";
import { ApiDefinition, FernNavigation } from "@fern-api/fdr-sdk";
import { EndpointId } from "@fern-api/fdr-sdk/navigation";
import {
  FernButton,
  FernCard,
  FernInput,
  FernTooltip,
  FernTooltipProvider,
} from "@fern-docs/components";
import { cn } from "@fern-docs/components";
import { useCurrentPathname } from "@fern-docs/components/hooks/use-current-pathname";
import { visitLoadable } from "@fern-ui/loadable";

import {
  usePlaygroundChatPanelWidth,
  useSetPlaygroundChatPanelWidth,
} from "@/state/playground";

import {
  ChatAgent,
  ChatAgentEvent,
  ChatAgentState,
  userMessage,
} from "./ChatAgent";
import { useChatAgent } from "./ChatAgentProvider";
import { ChatMessageComponent } from "./ChatMessage";
import { usePlaygroundContext } from "./PlaygroundContext";
import { PlaygroundLogger } from "./PlaygroundLogger";
import { returnChatModePath } from "./ToggleChatMode";

interface ChatBotInterfaceProps {
  agent?: ChatAgent;
  className?: string;
  apiDefinition: ApiDefinition.ApiDefinition;
  endpoint: ApiDefinition.EndpointDefinition;
  endpointsData?: {
    id: EndpointId;
    nodes: FernNavigation.EndpointNode[];
  }[];
}

export function ChatBotInterface({
  agent,
  className = "",
  apiDefinition,
  endpoint,
  endpointsData,
}: ChatBotInterfaceProps) {
  // Use the provided agent if available, otherwise get from context
  const contextAgent = useChatAgent();
  const chatAgent = agent ?? contextAgent;
  const playground = usePlaygroundContext();
  const router = useRouter();
  const pathname = useCurrentPathname();
  const searchParams = useSearchParams();
  const chatPanelWidth = usePlaygroundChatPanelWidth();
  const setChatPanelWidth = useSetPlaygroundChatPanelWidth();

  // Simple UI state - ChatAgent now owns the complex state
  const [inputValue, setInputValue] = useState("");
  const [chatState, setChatState] = useState<ChatAgentState>(
    chatAgent.getState()
  );

  // Refs for UI management
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isProcessingResponseRef = useRef(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Simplified request handling - ChatAgent manages consent now
  const sendRequest = useCallback(async () => {
    PlaygroundLogger.debug("Sending request");
    chatAgent.setWaitingForResponse();
    isProcessingResponseRef.current = true;
    await playground.sendRequest();
  }, [chatAgent, playground]);

  const setParams = useCallback(
    (parameters: Record<string, unknown>) => {
      PlaygroundLogger.debug("[setParams] Called with parameters:", parameters);

      // Track any conversion errors
      const conversionErrors: string[] = [];

      // Process flattened parameters
      Object.entries(parameters).forEach(([key, value]) => {
        PlaygroundLogger.debug(
          `[setParams] Processing parameter: ${key} = ${value}`
        );
        try {
          if (key.startsWith("path_")) {
            const paramName = key.substring(5); // Remove 'path_' prefix
            PlaygroundLogger.debug(
              `[setParams] Setting path parameter: ${paramName} = ${value}`
            );
            playground.setPathParameter(paramName, value as string);
          } else if (key.startsWith("query_")) {
            const paramName = key.substring(6); // Remove 'query_' prefix
            PlaygroundLogger.debug(
              `[setParams] Setting query parameter: ${paramName} = ${value}`
            );
            playground.setQueryParameter(paramName, value as string);
          } else if (key.startsWith("header_")) {
            const paramName = key.substring(7); // Remove 'header_' prefix
            PlaygroundLogger.debug(
              `[setParams] Setting header: ${paramName} = ${value}`
            );
            playground.setHeader(paramName, value as string);
          } else if (key.startsWith("body_")) {
            const paramName = key.substring(5); // Remove 'body_' prefix
            // For body parameters, we need to set them properly in the body object
            const currentBody = playground.availableValues.bodyProperties || [];
            const newBody = currentBody.find((p) => p.key === paramName)
              ? currentBody.map((p) =>
                  p.key === paramName ? { ...p, currentValue: value } : p
                )
              : [...currentBody, { key: paramName, currentValue: value }];
            PlaygroundLogger.debug(
              `[setParams] Setting body parameter: ${paramName} = ${value}`
            );
            playground.setBody(newBody);
          }
        } catch (error) {
          // Log conversion errors but don't fail the entire operation
          const errorMessage =
            error instanceof Error ? error.message : String(error);
          conversionErrors.push(`${key}: ${errorMessage}`);
        }
      });

      // If there were conversion errors, log them for debugging
      if (conversionErrors.length > 0) {
        PlaygroundLogger.warn(
          "[setParams] Some parameter conversions failed:",
          conversionErrors
        );
      }
    },
    [playground]
  );

  // Helper function to find endpoint slug from endpointsData
  const getEndpointSlug = useCallback(
    (endpointId: string): string => {
      // Find the endpoint data group that contains this endpoint
      const endpointDataGroup = endpointsData?.find(
        (endpoint) => endpoint.id === endpointId
      );

      // Find the node within this endpoint's nodes that matches the endpointId
      const node = endpointDataGroup?.nodes.find(
        (node) => node.endpointId === endpointId
      );

      if (node) {
        return conformExplorerRoute(node.slug);
      }

      // Fallback to empty string
      return "";
    },
    [endpointsData]
  );

  // Subscribe to ChatAgent state changes
  useEffect(() => {
    const handleStateChange = (event: ChatAgentEvent) => {
      if (event.type === "state_changed") {
        setChatState(event.data.newState);
      }
    };

    const handleNavigationRequest = (event: ChatAgentEvent) => {
      if (event.type === "navigation_requested") {
        // Handle navigation request
        const { explorerUrl, nextEndpointId, endpointId } = event.data;
        if (explorerUrl) {
          router.push(explorerUrl);
          // Notify ChatAgent that navigation is happening
          chatAgent.confirmNavigation(explorerUrl, endpointId);
        } else if (nextEndpointId) {
          // Construct URL for next endpoint in sequence
          const explorerUrlForNext = getEndpointSlug(nextEndpointId);
          router.push(explorerUrlForNext);
          // Notify ChatAgent that navigation is happening
          chatAgent.confirmNavigation(explorerUrlForNext, nextEndpointId);
        }
      }
    };

    const handleSendRequested = (event: ChatAgentEvent) => {
      if (event.type === "send_requested") {
        // Handle API request - parameters should already be set
        void sendRequest();
      }
    };

    const handleError = (event: ChatAgentEvent) => {
      if (event.type === "error_occurred") {
        PlaygroundLogger.error("ChatAgent error:", event.data.error);
      }
    };

    // Subscribe to events
    chatAgent.on("state_changed", handleStateChange);
    chatAgent.on("navigation_requested", handleNavigationRequest);
    chatAgent.on("send_requested", handleSendRequested);
    chatAgent.on("error_occurred", handleError);

    // Initialize state
    setChatState(chatAgent.getState());

    return () => {
      // Cleanup subscriptions
      chatAgent.off("state_changed", handleStateChange);
      chatAgent.off("navigation_requested", handleNavigationRequest);
      chatAgent.off("send_requested", handleSendRequested);
      chatAgent.off("error_occurred", handleError);
    };
  }, [chatAgent, router, sendRequest, setParams, getEndpointSlug]);

  // Auto-scroll when messages change
  useEffect(() => {
    scrollToBottom();
  }, [chatState.messages, chatState.currentStreamingMessage]);

  // Watch for API responses and delegate to ChatAgent
  useEffect(() => {
    if (!isProcessingResponseRef.current) return;

    visitLoadable(playground.response, {
      loading: () => {
        PlaygroundLogger.debug("[playground.response] LOADING");
      },
      loaded: (response) => {
        const parsed =
          typeof response.response.body === "string"
            ? response.response.body
            : JSON.stringify(response.response.body);
        const statusCode = response.response.status;

        PlaygroundLogger.debug("[playground.response] LOADED:", { statusCode });

        // Let ChatAgent handle the response processing with streaming
        chatAgent
          .processApiResponse(parsed, statusCode, (_chunk: string) => {
            // ChatAgent checks for the existence of the `onChunk` callback, then handles streaming internally
            // TODO: instead of checking for the callback, make an explicit flag for streaming
          })
          .then(() => {
            isProcessingResponseRef.current = false;
          })
          .catch((error: unknown) => {
            PlaygroundLogger.error("[processApiResponse] FAILED:", error);
            isProcessingResponseRef.current = false;
          });
      },
      failed: (error) => {
        PlaygroundLogger.error("[playground.response] FAILED:", error);
        chatAgent.handleResponseError(error);
        isProcessingResponseRef.current = false;
      },
    });
  }, [playground.response, chatAgent]);

  // Handle consent responses
  const handleConsent = useCallback(
    (consented: boolean) => {
      chatAgent.handleConsentResponse(consented);
    },
    [chatAgent]
  );

  // Simplified message sending - ChatAgent handles complexity
  const handleSendMessage = async () => {
    if (
      !inputValue.trim() ||
      chatState.status === "processing" ||
      chatState.status === "streaming"
    )
      return;

    const userMsg = userMessage(inputValue.trim());
    setInputValue("");

    try {
      // Get available parameters
      const pathParameters = playground.getAvailablePathParameters();
      const queryParameters = playground.getAvailableQueryParameters();
      const headers = playground.getAvailableHeaders();
      const requestBodyInfo = playground.unpackRequestBody();

      const availableParameters = {
        pathParameters,
        queryParameters,
        headers,
        bodyProperties: requestBodyInfo.properties,
      };

      // Process the user message - ChatAgent handles all the complexity
      const response = await chatAgent.processUserMessage(
        userMsg,
        availableParameters,
        endpoint.id,
        apiDefinition,
        (_chunk: string) => {
          // ChatAgent checks for the existence of the `onChunk` callback, then handles streaming internally
          // TODO: instead of checking for the callback, make an explicit flag for streaming
        }
      );

      PlaygroundLogger.debug("Response:", response);

      // ChatAgent handles classifications (single_call, multi_call, ask_parameters, general_response) internally
      if (response.parameters) {
        // If we have parameters, just set them
        setParams(response.parameters);
      }
    } catch (error: unknown) {
      PlaygroundLogger.error("Failed to process user message", error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void handleSendMessage();
    }
  };

  const handleReset = () => {
    chatAgent.reset();
    setInputValue("");
    isProcessingResponseRef.current = false;
  };

  return (
    <FernTooltipProvider>
      <div
        className={`rounded-tr-4 border-border-default flex h-full w-full flex-col overflow-hidden border-r border-t ${className}`}
      >
        <div className="bg-(color:--grayscale-a2) border-border-default flex shrink-0 items-center justify-between border-b px-3 py-2">
          <div className="flex items-center gap-2">
            <Bot className="text-(color:--grayscale-a11) h-4 w-4" />
            <span className="text-(color:--grayscale-a12) text-sm font-medium">
              AI Copilot
            </span>
          </div>
          <div className="flex items-center gap-2">
            <FernTooltip
              content="Reset the conversation"
              side="bottom"
              align="start"
            >
              <FernButton
                onClick={handleReset}
                icon={<RotateCcw className="h-4 w-4" />}
                className="shrink-0 rounded-full"
                size="small"
                variant="minimal"
              />
            </FernTooltip>
            <FernTooltip
              content={
                typeof chatPanelWidth === "string" &&
                chatPanelWidth.includes("%")
                  ? "View in panel"
                  : "View full screen"
              }
              side="bottom"
              align="start"
            >
              {typeof chatPanelWidth === "string" &&
              chatPanelWidth.includes("%") ? (
                <FernButton
                  onClick={() => {
                    setChatPanelWidth(400);
                  }}
                  icon={<Minimize2 className="h-4 w-4" />}
                  className="shrink-0 rounded-full"
                  size="small"
                  variant="minimal"
                />
              ) : (
                <FernButton
                  onClick={() => {
                    setChatPanelWidth("100%");
                  }}
                  icon={<Maximize2 className="h-4 w-4" />}
                  className="shrink-0 rounded-full"
                  size="small"
                  variant="minimal"
                />
              )}
            </FernTooltip>
            <FernTooltip
              content="Exit AI Copilot mode"
              side="bottom"
              align="start"
            >
              <FernButton
                onClick={() => {
                  const currentUrl =
                    pathname +
                    (searchParams.toString()
                      ? `?${searchParams.toString()}`
                      : "");
                  router.replace(
                    returnChatModePath({ slug: currentUrl, enable: false })
                  );
                }}
                icon={<X className="h-4 w-4" />}
                className="shrink-0 rounded-full"
                size="small"
                variant="minimal"
              />
            </FernTooltip>
          </div>
        </div>

        <div
          className={cn(
            "flex-1 flex-col space-y-3 overflow-y-auto p-3",
            chatState.messages.length === 0 &&
              !chatState.currentStreamingMessage
              ? "flex items-center justify-center"
              : "block"
          )}
        >
          {chatState.messages.length === 0 &&
          !chatState.currentStreamingMessage ? (
            <div className="text-(color:--grayscale-a11) flex h-full items-center justify-center">
              <div className="text-center">
                <Bot className="mx-auto mb-2 h-8 w-8 opacity-50" />
                <p className="text-sm">
                  AI Copilot can help you explore and use the API.
                </p>
              </div>
            </div>
          ) : (
            <>
              {chatState.messages.map((message, index) => (
                <ChatMessageComponent
                  key={index}
                  message={message}
                  onConsent={handleConsent}
                />
              ))}
              {chatState.currentStreamingMessage && (
                <ChatMessageComponent
                  key="streaming"
                  message={chatState.currentStreamingMessage}
                  isStreaming={true}
                  onConsent={handleConsent}
                />
              )}
            </>
          )}
          {(chatState.status === "processing" ||
            chatState.status === "streaming") &&
            !chatState.pendingAction && (
              <div className="flex justify-start gap-3">
                <div className="flex max-w-[80%] gap-3">
                  <div className="bg-(color:--grayscale-a3) flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full">
                    <Bot className="text-(color:--grayscale-a11) h-4 w-4" />
                  </div>
                  <FernCard className="rounded-2 border-border-default border px-3 py-2 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="flex space-x-1">
                        <div className="bg-(color:--grayscale-a8) h-2 w-2 animate-bounce rounded-full"></div>
                        <div
                          className="bg-(color:--grayscale-a8) h-2 w-2 animate-bounce rounded-full"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="bg-(color:--grayscale-a8) h-2 w-2 animate-bounce rounded-full"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                      <span className="text-(color:--grayscale-a11)">
                        Thinking...
                      </span>
                    </div>
                  </FernCard>
                </div>
              </div>
            )}
          <div ref={messagesEndRef} />
        </div>

        <div className="border-border-default bg-(color:--grayscale-a1) shrink-0 border-t px-3 py-1.5">
          <div className="text-(color:--grayscale-a11) text-xs">
            <span className="font-medium">Active endpoint:</span>{" "}
            <span className="bg-(color:--accent-a3) text-(color:--accent-a11) rounded-1 px-1.5 py-0.5 font-mono text-xs">
              {endpoint.id}
            </span>
          </div>
        </div>

        <div className="shrink-0 p-3">
          <div className="flex gap-2">
            <FernInput
              value={inputValue}
              onValueChange={setInputValue}
              placeholder="Type your message..."
              onKeyDown={handleKeyPress}
              className="flex-1"
            />
            <FernButton
              onClick={() => void handleSendMessage()}
              disabled={
                !inputValue.trim() ||
                chatState.status === "processing" ||
                chatState.status === "streaming"
              }
              icon={<ArrowUp className="h-4 w-4" />}
              className="shrink-0"
              intent="primary"
              rounded
            />
          </div>
        </div>
      </div>
    </FernTooltipProvider>
  );
}
