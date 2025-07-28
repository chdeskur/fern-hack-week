"use client";

import React, { createContext, useContext, useEffect, useMemo } from "react";

import { ChatAgent } from "./ChatAgent";
import { usePlaygroundTools } from "./PlaygroundToolsProvider";

interface ChatAgentContextType {
  agent: ChatAgent;
}

const ChatAgentContext = createContext<ChatAgentContextType | null>(null);

interface ChatAgentProviderProps {
  children: React.ReactNode;
  agent: ChatAgent;
}

export function ChatAgentProvider({ children, agent }: ChatAgentProviderProps) {
  const playgroundTools = usePlaygroundTools();

  // Update the agent's tools when playground tools change
  useEffect(() => {
    agent.updateTools(playgroundTools);
  }, [agent, playgroundTools]);

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
