"use client";

import React, { createContext, useContext, useMemo } from "react";

import { ChatAgent } from "./ChatAgent";

interface ChatAgentContextType {
  agent: ChatAgent;
}

const ChatAgentContext = createContext<ChatAgentContextType | null>(null);

interface ChatAgentProviderProps {
  children: React.ReactNode;
}

export function ChatAgentProvider({ children }: ChatAgentProviderProps) {
  // Create a single instance of ChatAgent that persists for the entire app session
  const agent = useMemo(() => new ChatAgent(), []);

  const contextValue = useMemo(() => ({ agent }), [agent]);

  return (
    <ChatAgentContext.Provider value={contextValue}>
      {children}
    </ChatAgentContext.Provider>
  );
}

export function useChatAgent(): ChatAgent {
  const context = useContext(ChatAgentContext);
  if (!context) {
    throw new Error("useChatAgent must be used within a ChatAgentProvider");
  }
  return context.agent;
}
