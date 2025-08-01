"use client";

import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useRef, useState } from "react";

import { Bot, RotateCcw, Send } from "lucide-react";

import { ApiDefinition, FernNavigation } from "@fern-api/fdr-sdk";
import { EndpointId } from "@fern-api/fdr-sdk/navigation";
import {
  FernButton,
  FernCard,
  FernInput,
  FernTooltipProvider,
} from "@fern-docs/components";
import { visitLoadable } from "@fern-ui/loadable";

import {
  ChatAgent,
  ChatAgentState,
  ChatAgentEvent,
  userMessage,
} from "./ChatAgent";
import { useChatAgent } from "./ChatAgentProvider";
import { ChatMessageComponent } from "./ChatMessage";
import { PlaygroundLogger } from "./PlaygroundLogger";
import { usePlaygroundContext } from "./PlaygroundContext";

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
  endpointsData: _endpointsData,
}: ChatBotInterfaceProps) {
  // Use the provided agent if available, otherwise get from context
  const contextAgent = useChatAgent();
  const chatAgent = agent ?? contextAgent;
  const playground = usePlaygroundContext();
  const router = useRouter();
  
  // Simple UI state - ChatAgent now owns the complex state
  const [inputValue, setInputValue] = useState("");
  const [chatState, setChatState] = useState<ChatAgentState>(chatAgent.getState());
  
  // Refs for UI management
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isProcessingResponseRef = useRef(false);
  const hasHandledMultiCallRef = useRef(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Simplified request handling - ChatAgent manages consent now
  const sendRequest = useCallback(async () => {
    chatAgent.setWaitingForResponse();
    isProcessingResponseRef.current = true;
    await playground.sendRequest();
  }, [chatAgent, playground]);

  // Subscribe to ChatAgent state changes
  useEffect(() => {
    const handleStateChange = (event: ChatAgentEvent) => {
      if (event.type === 'state_changed') {
        setChatState(event.data.newState);
      }
    };

    const handleConsentRequest = (event: ChatAgentEvent) => {
      if (event.type === 'consent_requested') {
        // Handle consent request - this will be implemented below
        PlaygroundLogger.debug('Consent requested:', event.data);
      }
    };

    const handleNavigationRequest = (event: ChatAgentEvent) => {
      if (event.type === 'navigation_requested') {
        // Handle navigation request
        const { explorerUrl } = event.data;
        if (explorerUrl) {
          router.push(explorerUrl);
        }
      }
    };

    const handleRequestNeeded = (event: ChatAgentEvent) => {
      if (event.type === 'request_needed') {
        // Handle API request
        void sendRequest();
      }
    };

    const handleError = (event: ChatAgentEvent) => {
      if (event.type === 'error_occurred') {
        PlaygroundLogger.error('ChatAgent error:', event.data.error);
      }
    };

    // Subscribe to events
    chatAgent.on('state_changed', handleStateChange);
    chatAgent.on('consent_requested', handleConsentRequest);
    chatAgent.on('navigation_requested', handleNavigationRequest);
    chatAgent.on('request_needed', handleRequestNeeded);
    chatAgent.on('error_occurred', handleError);

    // Initialize state
    setChatState(chatAgent.getState());

    return () => {
      // Cleanup subscriptions
      chatAgent.off('state_changed', handleStateChange);
      chatAgent.off('consent_requested', handleConsentRequest);
      chatAgent.off('navigation_requested', handleNavigationRequest);
      chatAgent.off('request_needed', handleRequestNeeded);
      chatAgent.off('error_occurred', handleError);
    };
  }, [chatAgent, router, sendRequest]);

  // Auto-scroll when messages change
  useEffect(() => {
    scrollToBottom();
  }, [chatState.messages, chatState.currentStreamingMessage]);

  // Watch for API responses and delegate to ChatAgent
  useEffect(() => {
    if (!isProcessingResponseRef.current) return;
    
    visitLoadable(playground.response, {
      loading: () => {
        PlaygroundLogger.debug('[playground.response] LOADING');
      },
      loaded: (response) => {
        const parsed = typeof response.response.body === "string"
          ? response.response.body
          : JSON.stringify(response.response.body);
        const statusCode = response.response.status;
        
        PlaygroundLogger.debug('[playground.response] LOADED:', { statusCode });
        
        // Let ChatAgent handle the response processing with streaming
        chatAgent.processApiResponse(parsed, statusCode, (_chunk: string) => {
          // ChatAgent handles streaming internally now
        }).then(() => {
          isProcessingResponseRef.current = false;
        }).catch((error: unknown) => {
          PlaygroundLogger.error('[processApiResponse] FAILED:', error);
          isProcessingResponseRef.current = false;
        });
      },
      failed: (error) => {
        PlaygroundLogger.error('[playground.response] FAILED:', error);
        chatAgent.handleResponseError(error);
        isProcessingResponseRef.current = false;
      },
    });
  }, [playground.response, chatAgent]);

  // Handle consent responses
  const handleConsent = useCallback((consented: boolean) => {
    chatAgent.handleConsentResponse(consented);
  }, [chatAgent]);



  const setParams = (parameters: Record<string, unknown>) => {
    PlaygroundLogger.debug("[setParams]:", parameters);

    // Track any conversion errors
    const conversionErrors: string[] = [];

    // Process flattened parameters
    Object.entries(parameters).forEach(([key, value]) => {
      try {
        if (key.startsWith("path_")) {
          const paramName = key.substring(5); // Remove 'path_' prefix
          playground.setPathParameter(paramName, value as string);
        } else if (key.startsWith("query_")) {
          const paramName = key.substring(6); // Remove 'query_' prefix
          playground.setQueryParameter(paramName, value as string);
        } else if (key.startsWith("header_")) {
          const paramName = key.substring(7); // Remove 'header_' prefix
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
          playground.setBody(newBody);
        }
      } catch (error) {
        // Log conversion errors but don't fail the entire operation
        const errorMessage =
          error instanceof Error ? error.message : String(error);
        conversionErrors.push(`${key}: ${errorMessage}`);
        PlaygroundLogger.warn(`Type conversion failed for ${key}:`, error);
      }
    });

    // If there were conversion errors, log them for debugging
    if (conversionErrors.length > 0) {
      PlaygroundLogger.warn(
        "Some parameter conversions failed:",
        conversionErrors
      );
    }
  };

  // Simplified message sending - ChatAgent handles complexity
  const handleSendMessage = async () => {
    if (!inputValue.trim() || chatState.status === 'processing' || chatState.status === 'streaming') return;

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
        apiDefinition
      );

      // Handle response actions based on classification
      if (response.classification === "single_call" && response.parameters) {
        setParams(response.parameters);
      } else if (response.classification === "ask_parameters" && response.parameters) {
        setParams(response.parameters);
      }

    } catch (error: unknown) {
      PlaygroundLogger.error("Failed to process user message", error);
      // ChatAgent handles error states internally
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
    hasHandledMultiCallRef.current = false;
  };

  return (
    <FernTooltipProvider>
      <div
        className={`flex h-full w-full flex-col overflow-hidden ${className}`}
      >
        <div className="bg-(color:--grayscale-a2) border-border-default flex shrink-0 items-center justify-between border-b px-3 py-2">
          <div className="flex items-center gap-2">
            <Bot className="text-(color:--grayscale-a11) h-4 w-4" />
            <span className="text-(color:--grayscale-a12) text-sm font-medium">
              AI Copilot
            </span>
          </div>
          <FernButton
            onClick={handleReset}
            icon={<RotateCcw className="h-4 w-4" />}
            className="shrink-0"
            size="small"
            variant="minimal"
          >
            Reset
          </FernButton>
        </div>

        <div className="flex-1 space-y-3 overflow-y-auto p-3">
          {chatState.messages.length === 0 && !chatState.currentStreamingMessage ? (
            <div className="text-(color:--grayscale-a11) flex h-full items-center justify-center">
              <div className="text-center">
                <Bot className="mx-auto mb-2 h-8 w-8 opacity-50" />
                <p className="text-sm">
                  Start a conversation with the AI assistant
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
          {(chatState.status === 'processing' || chatState.status === 'streaming') &&
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
            <span className="bg-(color:--accent-a3) text-(color:--accent-a11) rounded px-1.5 py-0.5 font-mono text-xs">
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
              disabled={!inputValue.trim() || chatState.status === 'processing' || chatState.status === 'streaming'}
              icon={<Send className="h-4 w-4" />}
              className="shrink-0"
              intent="primary"
            >
              Send
            </FernButton>
          </div>
        </div>
      </div>
    </FernTooltipProvider>
  );
}
