"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

import { Bot, RotateCcw, Send } from "lucide-react";

import { conformExplorerRoute } from "@fern-api/docs-utils";
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
  ChatMessage,
  assistantMessage,
  userMessage,
} from "./ChatAgent";
import { useChatAgent } from "./ChatAgentProvider";
import { ChatMessageComponent } from "./ChatMessage";
import { PlaygroundLogger, usePlaygroundContext } from "./PlaygroundContext";

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
  const [messages, setMessages] = useState<ChatMessage[]>(chatAgent.messages);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingMessage, setStreamingMessage] = useState<ChatMessage | null>(
    null
  );
  const [pendingResponse, setPendingResponse] = useState<{
    resolve: (value: string) => void;
    reject: (error: Error) => void;
  } | null>(null);
  const [pendingConsent, setPendingConsent] = useState<{
    resolve: (value: boolean) => void;
    reject: (error: Error) => void;
  } | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isStreamingRef = useRef(false);
  const isProcessingResponseRef = useRef(false);
  const streamingMessageRef = useRef<ChatMessage | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, streamingMessage]);

  // Keep streamingMessageRef in sync with streamingMessage state
  useEffect(() => {
    streamingMessageRef.current = streamingMessage;
  }, [streamingMessage]);

  // Sync messages with the agent's messages when the component mounts or agent changes
  useEffect(() => {
    setMessages(chatAgent.messages);
  }, [chatAgent]);

  // Watch for response changes when we have a pending response
  useEffect(() => {
    if (pendingResponse && !isProcessingResponseRef.current) {
      isProcessingResponseRef.current = true;
      visitLoadable(playground.response, {
        loading: () => {
          PlaygroundLogger.debug("[playground.response] LOADING");
        },
        loaded: (response) => {
          const parsed =
            typeof response.response.body === "string"
              ? response.response.body
              : JSON.stringify(response.response.body);
          PlaygroundLogger.debug("[playground.response] LOADED:", parsed);
          // TODO: Handle status codes more robustly
          const statusCode = response.response.status;
          PlaygroundLogger.debug("[playground.response] STATUS:", statusCode);
          pendingResponse.resolve(parsed);
          // Generate a simple summary message
          const handleSummaryStreamingChunk = (chunk: string) => {
            if (!isStreamingRef.current) {
              isStreamingRef.current = true;
              setIsStreaming(true);
              // Create initial streaming message for summary
              const initialStreamingMessage = assistantMessage(chunk);
              setStreamingMessage(initialStreamingMessage);
            } else {
              // Update existing streaming message
              setStreamingMessage((prev) => {
                if (prev) {
                  return {
                    ...prev,
                    content: prev.content + chunk,
                  };
                }
                return assistantMessage(chunk);
              });
            }
          };

          chatAgent
            .generateSummary(parsed, statusCode, handleSummaryStreamingChunk)
            .then((_msg) => {
              if (statusCode >= 200 && statusCode < 300) {
                chatAgent.sequence.shift();
                PlaygroundLogger.debug(
                  "[playground.response] SUCCESS, SHIFTED SEQUENCE",
                  chatAgent.sequence
                );
                // If there are more endpoints in the sequence, navigate to the next one
                if (chatAgent.sequence.length > 0) {
                  const nextEndpointId = chatAgent.sequence[0];
                  if (nextEndpointId) {
                    PlaygroundLogger.debug(
                      "[playground.response] ENDPOINTS DATA:",
                      endpointsData
                    );
                    // Find the endpoint in the API definition
                    const nextEndpointData = endpointsData?.find(
                      (endpoint) => endpoint.id === nextEndpointId
                    );
                    PlaygroundLogger.debug(
                      "[playground.response] NEXT ENDPOINT:",
                      nextEndpointData
                    );
                    if (nextEndpointData) {
                      // Construct the explorer URL for the next endpoint
                      // We need to find the endpoint node's slug from the navigation
                      // For now, we'll construct a basic URL pattern using the endpoint ID
                      const endpointSlug = nextEndpointData.nodes.find(
                        (node) => node.endpointId === nextEndpointId
                      )?.slug;
                      if (!endpointSlug) {
                        throw new Error(
                          `No nodes found for endpoint ${nextEndpointId}`
                        );
                      }
                      PlaygroundLogger.debug(
                        "[playground.response] NEXT ENDPOINT SLUG:",
                        endpointSlug
                      );
                      const explorerUrl = conformExplorerRoute(endpointSlug);
                      PlaygroundLogger.debug(
                        "[playground.response] NEXT ENDPOINT URL:",
                        explorerUrl
                      );
                      router.push(explorerUrl);
                    }
                  }
                }
              }
              console.log("[FOOBARmessages]", messages);
              console.log(
                "[FOOBARstreamingMessage]",
                streamingMessageRef.current
              );
              // If we were streaming, finalize the streaming message and clear streaming state
              if (streamingMessageRef.current) {
                const currentStreamingMessage = streamingMessageRef.current;
                setMessages((prevMessages) => [
                  ...prevMessages,
                  currentStreamingMessage,
                ]);
              }
              console.log("[FOOBAR(null)] 5");
              setStreamingMessage(null);
              setIsStreaming(false);
              isStreamingRef.current = false;
              setPendingResponse(null);
              setIsLoading(false);
              isProcessingResponseRef.current = false;
            })
            .catch((error: unknown) => {
              PlaygroundLogger.error("[generateSummary] FAILED:", error);
              // Clear streaming state on error
              console.log("[FOOBAR(null)] 6");
              setStreamingMessage(null);
              setIsStreaming(false);
              isStreamingRef.current = false;
              setPendingResponse(null);
              setIsLoading(false);
              isProcessingResponseRef.current = false;
            });
        },
        failed: (error) => {
          PlaygroundLogger.error("[playground.response] FAILED:", error);
          pendingResponse.reject(new Error(JSON.stringify(error)));
          setPendingResponse(null);
          // Clear loading and streaming states on error
          setIsLoading(false);
          setIsStreaming(false);
          console.log("[FOOBAR(null)] 7");
          setStreamingMessage(null);
          isStreamingRef.current = false;
          isProcessingResponseRef.current = false;
        },
      });
    }
  }, [
    playground.response,
    pendingResponse,
    chatAgent,
    messages,
    router,
    apiDefinition,
    endpointsData,
    isStreaming,
    streamingMessage,
  ]);

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
        console.warn(`Type conversion failed for ${key}:`, error);
      }
    });

    // If there were conversion errors, log them for debugging
    if (conversionErrors.length > 0) {
      console.warn("Some parameter conversions failed:", conversionErrors);
    }
  };

  const sendRequestWithConsent = async (_updatedMessages: ChatMessage[]) => {
    const consentMsg = assistantMessage(
      "Would you like to allow me to send a request to this endpoint?",
      { consent_required: true }
    );
    setMessages((prevMessages) => [...prevMessages, consentMsg]);

    // Wait for user consent
    const userConsented = await new Promise<boolean>((resolve, reject) => {
      setPendingConsent({ resolve, reject });
    }).catch((_error: unknown) => {
      // Handle timeout or other consent errors
      const timeoutMsg = assistantMessage(
        "Request timed out. Please try again if you'd like to send the request.",
        { consent_required: false }
      );
      setMessages((prevMessages) => [...prevMessages, timeoutMsg]);
      return false;
    });

    if (userConsented) {
      await playground.sendRequest();

      // Wait for response
      await new Promise<string>((resolve, reject) => {
        setPendingResponse({ resolve, reject });
      });
    } else {
      // User declined consent
      const declinedMsg = assistantMessage(
        "Request cancelled. Let me know if you'd like to try again with different parameters.",
        { consent_required: false }
      );
      setMessages((prevMessages) => [...prevMessages, declinedMsg]);
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading || isStreaming) return;

    const userMsg = userMessage(inputValue.trim());
    setInputValue("");
    setIsLoading(true);

    // Add user message to the list
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);

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

      // Create streaming callback
      const handleStreamingChunk = (chunk: string) => {
        if (!isStreamingRef.current) {
          isStreamingRef.current = true;
          setIsStreaming(true);
          // Create initial streaming message
          const initialStreamingMessage = assistantMessage(chunk);
          setStreamingMessage(initialStreamingMessage);
        } else {
          // Update existing streaming message
          setStreamingMessage((prev) => {
            if (prev) {
              return {
                ...prev,
                content: prev.content + chunk,
              };
            }
            return assistantMessage(chunk);
          });
        }
      };

      console.log("[FOOBARprocessUserMessage]", userMsg);

      // Process the user message with the simplified ChatAgent
      const response = await chatAgent.processUserMessage(
        userMsg,
        availableParameters,
        endpoint.id,
        apiDefinition,
        handleStreamingChunk
      );

      // If we were streaming, finalize the streaming message and clear streaming state
      if (isStreamingRef.current && streamingMessageRef.current) {
        // Use the response message content which contains the complete final content
        // This ensures we capture any additional content added after streaming (like generateObject results)
        const finalMessage = { ...response.message };
        setMessages([...updatedMessages, finalMessage]);
        console.log("[FOOBAR(null)] 1");
        setStreamingMessage(null);
        setIsStreaming(false);
        isStreamingRef.current = false;
      } else {
        // Only add the response message if we weren't streaming
        setMessages([...updatedMessages, response.message]);
      }

      // Handle different response types
      if (response.classification === "single_call") {
        if (response.parameters) {
          setParams(response.parameters);
        }

        await sendRequestWithConsent(updatedMessages);
      } else if (response.classification === "multi_call") {
        if (response.endpointSequence && response.endpointSequence.length > 0) {
          // no-op: no need to further handle multi-call responses
          // TODO: automatically navigate to the first endpoint in the sequence
        }
      } else if (response.classification === "ask_parameters") {
        if (response.parameters) {
          setParams(response.parameters);
          // if we need more parameters ask
          // otherwise, generally gather more info
          const missingValues = playground.checkMissingRequiredValues();
          if (missingValues.hasMissingValues) {
            const missingMsg = createMissingParametersMessage(missingValues);
            // Ensure we don't add duplicate messages if streaming was used
            if (!(isStreaming && streamingMessageRef.current)) {
              setMessages([...updatedMessages, response.message, missingMsg]);
            } else {
              setMessages((prevMessages) => [...prevMessages, missingMsg]);
            }
          } else {
            await sendRequestWithConsent(updatedMessages);
          }
        }
      } else if (response.classification === "general_response") {
        // no-op: no need to further handle general responses
      }
    } catch (error: unknown) {
      PlaygroundLogger.error("[handleSendMessage] FAILED:", error);
      const errorMsg: ChatMessage = {
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again.",
        consent_required: false,
      };
      setMessages([...updatedMessages, errorMsg]);
      // Clear streaming state on error
      console.log("[FOOBAR(null)] 2");
      setStreamingMessage(null);
      setIsStreaming(false);
      isStreamingRef.current = false;
    } finally {
      // Always reset loading state
      setIsLoading(false);
      // Also ensure streaming state is cleared in case of any edge cases
      if (isStreamingRef.current) {
        setIsStreaming(false);
        isStreamingRef.current = false;
        console.log("[FOOBAR(null)] 3");
        setStreamingMessage(null);
      }
    }
  };

  const createMissingParametersMessage = (missingValues: {
    missingPathParameters: string[];
    missingQueryParameters: string[];
    missingHeaders: string[];
    missingBodyProperties: {
      key: string;
      type: string;
      description?: string;
      path: string[];
    }[];
  }): ChatMessage => {
    let missingValuesMessage =
      "I still need the following required values:\n\n";

    if (missingValues.missingPathParameters.length > 0) {
      missingValuesMessage += "**Path Parameters:**\n";
      missingValues.missingPathParameters.forEach((param) => {
        missingValuesMessage += `- ${param}\n`;
      });
      missingValuesMessage += "\n";
    }

    if (missingValues.missingQueryParameters.length > 0) {
      missingValuesMessage += "**Query Parameters:**\n";
      missingValues.missingQueryParameters.forEach((param) => {
        missingValuesMessage += `- ${param}\n`;
      });
      missingValuesMessage += "\n";
    }

    if (missingValues.missingHeaders.length > 0) {
      missingValuesMessage += "**Headers:**\n";
      missingValues.missingHeaders.forEach((header) => {
        missingValuesMessage += `- ${header}\n`;
      });
      missingValuesMessage += "\n";
    }

    if (missingValues.missingBodyProperties.length > 0) {
      missingValuesMessage += "**Body Properties:**\n";
      missingValues.missingBodyProperties.forEach((prop) => {
        missingValuesMessage += `- ${prop.key} (${prop.type})`;
        if (prop.description) {
          missingValuesMessage += `: ${prop.description}`;
        }
        missingValuesMessage += "\n";
      });
      missingValuesMessage += "\n";
    }

    missingValuesMessage +=
      "Please provide values for these required fields and I'll make the request for you.";

    return {
      role: "assistant",
      content: missingValuesMessage,
      consent_required: false,
    };
  };

  const handleConsent = (consented: boolean) => {
    if (pendingConsent) {
      pendingConsent.resolve(consented);
      setPendingConsent(null);
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
    setMessages([]);
    setInputValue("");
    setIsLoading(false);
    setIsStreaming(false);
    console.log("[FOOBAR(null)] 4");
    setStreamingMessage(null);
    streamingMessageRef.current = null;
    isStreamingRef.current = false;
    isProcessingResponseRef.current = false;
    setPendingResponse(null);
    setPendingConsent(null);
  };

  return (
    <FernTooltipProvider>
      <div
        className={`flex h-full w-full flex-col overflow-hidden ${className}`}
      >
        <div className="bg-(color:--grayscale-a2) border-border-default flex shrink-0 items-center justify-between border-b px-4 py-3">
          <div className="flex items-center gap-2">
            <Bot className="text-(color:--grayscale-a11) h-4 w-4" />
            <span className="text-(color:--grayscale-a12) text-sm font-medium">
              AI Assistant
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

        <div className="flex-1 space-y-4 overflow-y-auto p-4">
          {messages.length === 0 && !streamingMessage ? (
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
              {messages.map((message, index) => (
                <ChatMessageComponent
                  key={index}
                  message={message}
                  onConsent={handleConsent}
                />
              ))}
              {streamingMessage && (
                <ChatMessageComponent
                  key="streaming"
                  message={streamingMessage}
                  isStreaming={true}
                  onConsent={handleConsent}
                />
              )}
            </>
          )}
          {(isLoading || pendingResponse || isStreaming) &&
            pendingConsent == null && (
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

        <div className="border-border-default shrink-0 border-t p-4">
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
              disabled={!inputValue.trim() || isLoading || isStreaming}
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
