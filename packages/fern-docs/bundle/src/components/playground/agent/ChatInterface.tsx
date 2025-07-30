"use client";

import React, { useEffect, useRef, useState } from "react";

import { Bot, Send } from "lucide-react";

import { ApiDefinition } from "@fern-api/fdr-sdk";
import {
  FernButton,
  FernCard,
  FernInput,
  FernTooltipProvider,
} from "@fern-docs/components";
import { visitLoadable } from "@fern-ui/loadable";

import { closeButton } from "../PlaygroundCloseButton";
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
}

export function ChatBotInterface({
  agent,
  className = "",
}: ChatBotInterfaceProps) {
  // Use the provided agent if available, otherwise get from context
  const contextAgent = useChatAgent();
  const chatAgent = agent ?? contextAgent;
  const playground = usePlaygroundContext();
  const [messages, setMessages] = useState<ChatMessage[]>(chatAgent.messages);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [pendingResponse, setPendingResponse] = useState<{
    resolve: (value: string) => void;
    reject: (error: Error) => void;
  } | null>(null);
  const [pendingConsent, setPendingConsent] = useState<{
    resolve: (value: boolean) => void;
    reject: (error: Error) => void;
  } | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Sync messages with the agent's messages when the component mounts or agent changes
  useEffect(() => {
    setMessages(chatAgent.messages);
  }, [chatAgent]);

  // Watch for response changes when we have a pending response
  useEffect(() => {
    if (pendingResponse) {
      visitLoadable(playground.response, {
        loading: () => {
          PlaygroundLogger.debug("[playground.response] LOADING");
        },
        loaded: (response) => {
          const parsed =
            typeof response.response.body === "string"
              ? response.response.body
              : JSON.stringify(response.response.body, null, 2);
          PlaygroundLogger.debug("[playground.response] LOADED:", parsed);
          pendingResponse.resolve(parsed);
          // Generate a simple summary message
          chatAgent
            .generateSummary(parsed)
            .then((msg) => {
              setMessages([...messages, msg]);
              setPendingResponse(null);
            })
            .catch((error: unknown) => {
              PlaygroundLogger.error("[generateSummary] FAILED:", error);
              setPendingResponse(null);
            });
        },
        failed: (error) => {
          PlaygroundLogger.error("[playground.response] FAILED:", error);
          pendingResponse.reject(new Error(JSON.stringify(error)));
          setPendingResponse(null);
        },
      });
    }
  }, [playground.response, pendingResponse, chatAgent, messages]);

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
          const currentBody = playground.availableValues.body || {};
          const newBody =
            typeof currentBody === "object" && currentBody != null
              ? { ...currentBody, [paramName]: value }
              : { [paramName]: value };
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

  const sendRequestWithConsent = async (updatedMessages: ChatMessage[]) => {
    const consentMsg = assistantMessage(
      "Would you like to allow me to send a request to this endpoint?",
      { consent_required: true }
    );
    setMessages([...updatedMessages, consentMsg]);

    // Wait for user consent
    const userConsented = await new Promise<boolean>((resolve, reject) => {
      setPendingConsent({ resolve, reject });
    }).catch((_error: unknown) => {
      // Handle timeout or other consent errors
      const timeoutMsg = assistantMessage(
        "Request timed out. Please try again if you'd like to send the request.",
        { consent_required: false }
      );
      setMessages([...updatedMessages, consentMsg, timeoutMsg]);
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
      setMessages([...updatedMessages, consentMsg, declinedMsg]);
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

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

      // Process the user message with the simplified ChatAgent
      const response = await chatAgent.processUserMessage(
        userMsg,
        availableParameters,
        "current-endpoint" // TODO: Get actual current endpoint ID
      );

      // Add the assistant's response to messages
      setMessages([...updatedMessages, response.message]);

      // Handle different action types
      if (response.action === "single_call") {
        if (response.parameters) {
          setParams(response.parameters);
        }

        await sendRequestWithConsent(updatedMessages);
      } else if (response.action === "multi_call") {
        if (response.endpointSequence && response.endpointSequence.length > 0) {
          // Execute the sequence
          await chatAgent.executeSequence(response.endpointSequence);
        }
      } else if (response.action === "ask_parameters") {
        if (response.parameters) {
          setParams(response.parameters);
          // if we need more parameters ask
          // otherwise, generally gather more info
          const missingValues = playground.checkMissingRequiredValues();
          if (missingValues.hasMissingValues) {
            const missingMsg = createMissingParametersMessage(missingValues);
            setMessages([...updatedMessages, response.message, missingMsg]);
          } else {
            await sendRequestWithConsent(updatedMessages);
          }
        }
      } else if (response.action === "general") {
        const consentMsg = assistantMessage("Can you provide more context?");
        setMessages([...updatedMessages, consentMsg]);
      }
    } catch (error: unknown) {
      PlaygroundLogger.error("[handleSendMessage] FAILED:", error);
      const errorMsg: ChatMessage = {
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again.",
        consent_required: false,
      };
      setMessages([...updatedMessages, errorMsg]);
    } finally {
      setIsLoading(false);
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

  return (
    <FernTooltipProvider>
      <div className={`flex h-full w-full flex-col ${className}`}>
        <div className="absolute right-4 top-4 z-10">{<closeButton.Out />}</div>

        <div className="flex-1 space-y-4 overflow-y-auto p-4">
          {messages.length === 0 ? (
            <div className="text-(color:--grayscale-a11) flex h-full items-center justify-center">
              <div className="text-center">
                <Bot className="mx-auto mb-2 h-8 w-8 opacity-50" />
                <p className="text-sm">
                  Start a conversation with the AI assistant
                </p>
              </div>
            </div>
          ) : (
            messages.map((message, index) => (
              <ChatMessageComponent
                key={index}
                message={message}
                onConsent={handleConsent}
              />
            ))
          )}
          {(isLoading || pendingResponse) && (
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

        <div className="border-border-default border-t p-4">
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
              disabled={!inputValue.trim() || isLoading}
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
