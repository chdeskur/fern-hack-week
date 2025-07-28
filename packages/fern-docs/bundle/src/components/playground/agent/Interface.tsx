"use client";

import React, { useEffect, useRef, useState } from "react";

import { Bot, Send, User } from "lucide-react";

import { FernButton, FernCard, FernInput } from "@fern-docs/components";
import { mdxToHtml } from "@fern-docs/mdx";

import { closeButton } from "../PlaygroundCloseButton";
import { ChatAgent, ChatMessage, getChatAgent, userMessage } from "./ChatAgent";

interface ChatBotInterfaceProps {
  agent?: ChatAgent;
  className?: string;
}

export function ChatBotInterface({
  agent,
  className = "",
}: ChatBotInterfaceProps) {
  // Use the singleton agent if none is provided, otherwise use the provided agent
  const chatAgent = agent ?? getChatAgent();
  const [messages, setMessages] = useState<ChatMessage[]>(chatAgent.messages);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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

  const handleSendMessage = () => {
    if (!inputValue.trim() || isLoading) return;

    const userMsg = userMessage(inputValue.trim());
    setInputValue("");
    setIsLoading(true);

    // Add user message to the list
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);

    // Generate response from agent
    chatAgent
      .generateResponse(userMsg)
      .then((response) => {
        setMessages([...updatedMessages, response]);
      })
      .catch((error: unknown) => {
        console.error("Error generating response:", error);
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
              console.warn("Message with null/undefined content:", message);
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
                    className={`rounded-2 px-3 py-2 text-sm ${
                      message.role === "user"
                        ? "bg-(color:--accent) text-(color:--accent-contrast)"
                        : "bg-card-background border-border-default border"
                    }`}
                  >
                    <div
                      className="whitespace-pre-wrap"
                      dangerouslySetInnerHTML={{
                        __html: mdxToHtml(message.content).html,
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
