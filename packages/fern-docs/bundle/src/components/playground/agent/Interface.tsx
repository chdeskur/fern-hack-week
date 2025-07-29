"use client";

import React, { useEffect, useRef, useState } from "react";

import { Bot, Send, User } from "lucide-react";
import { z } from "zod";

import { FernButton, FernCard, FernInput } from "@fern-docs/components";
import { mdxToHtml } from "@fern-docs/mdx";
import { visitLoadable } from "@fern-ui/loadable";

import { closeButton } from "../PlaygroundCloseButton";
import { ChatAgent, ChatMessage, userMessage } from "./ChatAgent";
import { useChatAgent } from "./ChatAgentProvider";
import { PlaygroundLogger, usePlaygroundContext } from "./PlaygroundContext";

interface ChatBotInterfaceProps {
  agent?: ChatAgent;
  className?: string;
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
          setPendingResponse(null);
        },
        failed: (error) => {
          PlaygroundLogger.error("[playground.response] FAILED:", error);
          pendingResponse.reject(new Error(JSON.stringify(error)));
          setPendingResponse(null);
        },
      });
    }
  }, [playground.response, pendingResponse]);

  const setParams = (content: string) => {
    // Create a simple flat schema that includes all available parameters

    // Parse the response and update playground context
    const parsedResponse = JSON.parse(content);

    PlaygroundLogger.debug("[parsedResponse]:", parsedResponse);

    // Process flattened parameters
    Object.entries(parsedResponse).forEach(([key, value]) => {
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
    });
  };

  const handleSendMessage = () => {
    if (!inputValue.trim() || isLoading) return;

    const userMsg = userMessage(inputValue.trim());
    setInputValue("");
    setIsLoading(true);

    // Add user message to the list
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);

    const pathParameters = playground.getAvailablePathParameters();
    const queryParameters = playground.getAvailableQueryParameters();
    const headers = playground.getAvailableHeaders();
    const requestBodyInfo = playground.unpackRequestBody();

    // Create a single flat object with all parameters
    const allParameters: Record<string, z.ZodString> = {};

    // Add path parameters with prefix
    pathParameters.forEach((param) => {
      allParameters[`path_${param}`] = z.string();
    });

    // Add query parameters with prefix
    queryParameters.forEach((param) => {
      allParameters[`query_${param}`] = z.string();
    });

    // // Add headers with prefix
    headers.forEach((header) => {
      allParameters[`header_${header}`] = z.string();
    });

    // Add body properties with prefix
    requestBodyInfo.properties.forEach((prop) => {
      allParameters[`body_${prop.key}`] = z.string();
    });

    // Create simple flat schema
    const parameterSchema = z
      .object(allParameters)
      .required(Object.keys(allParameters) as any);

    PlaygroundLogger.debug("[allParameters]:", Object.keys(allParameters));

    // Generate response from agent
    chatAgent
      .generateSchemaResponse(userMsg, parameterSchema)
      .then((response) => {
        setParams(response.content);
        setMessages([...updatedMessages, response]);
        return playground.sendRequest();
      })
      .then(async () => {
        return new Promise<string>((resolve, reject) => {
          setPendingResponse({ resolve, reject });
        });
      })
      .then((parsed) => {
        setMessages([
          ...updatedMessages,
          {
            role: "assistant",
            content: parsed,
          },
        ]);
      })
      .catch((error: unknown) => {
        PlaygroundLogger.error(
          "[chatAgent.generateSchemaResponse] FAILED:",
          error
        );
        // Add error message
        const errorMsg: ChatMessage = {
          role: "assistant",
          content: "Sorry, I encountered an error. Please try again.",
        };
        setMessages([...updatedMessages, errorMsg]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
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
          messages.map((message, index) => {
            // Debug logging
            if (!message.content) {
              PlaygroundLogger.warn(
                "[message] null/undefined content:",
                message
              );
            }
            return (
              <div
                key={index}
                className={`flex gap-3 ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`flex max-w-[80%] gap-3 ${
                    message.role === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  <div
                    className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full ${
                      message.role === "user"
                        ? "bg-(color:--accent) text-(color:--accent-contrast)"
                        : "bg-(color:--grayscale-a3) text-(color:--grayscale-a11)"
                    }`}
                  >
                    {message.role === "user" ? (
                      <User className="h-4 w-4" />
                    ) : (
                      <Bot className="h-4 w-4" />
                    )}
                  </div>
                  <FernCard
                    className={`rounded-2 w-full px-3 py-2 text-sm ${
                      message.role === "user"
                        ? "bg-(color:--accent) text-(color:--accent-contrast)"
                        : "bg-card-background border-border-default border"
                    }`}
                  >
                    <div
                      className="whitespace-pre-wrap"
                      dangerouslySetInnerHTML={{
                        __html: mdxToHtml(
                          message.content.includes("{")
                            ? `\`\`\`json\n${message.content}\n\`\`\``
                            : message.content
                        ).html,
                      }}
                    />
                  </FernCard>
                </div>
              </div>
            );
          })
        )}
        {isLoading && (
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
            onClick={handleSendMessage}
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
  );
}
