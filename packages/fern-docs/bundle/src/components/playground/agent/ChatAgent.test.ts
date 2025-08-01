import { beforeEach, describe, expect, it } from "vitest";

import {
  ChatAgent,
  assistantMessage,
  getChatAgent,
  resetChatAgent,
  systemMessage,
  userMessage,
} from "./ChatAgent";

describe("ChatAgent", () => {
  beforeEach(() => {
    // Reset the singleton before each test to ensure clean state
    resetChatAgent();
  });

  describe("Message creation functions", () => {
    it("should create system messages", () => {
      const message = systemMessage("You are a helpful assistant");
      expect(message).toEqual({
        role: "system",
        content: "You are a helpful assistant",
        consent_required: false,
      });
    });

    it("should create assistant messages", () => {
      const message = assistantMessage("Hello! How can I help you?");
      expect(message).toEqual({
        role: "assistant",
        content: "Hello! How can I help you?",
        consent_required: false,
      });
    });

    it("should create user messages", () => {
      const message = userMessage("What is your purpose?");
      expect(message).toEqual({
        role: "user",
        content: "What is your purpose?",
        consent_required: false,
      });
    });
  });

  describe("Constructor", () => {
    it("should create agent with default configuration", () => {
      const agent = new ChatAgent();
      expect(agent.messages).toEqual([]);
    });

    it("should create agent with initial messages", () => {
      const initialMessages = [
        systemMessage("You are a helpful assistant"),
        userMessage("Hello"),
        assistantMessage("Hi there!"),
      ];
      const agent = new ChatAgent({ initialMessages });
      expect(agent.messages).toEqual(initialMessages);
    });
  });

  describe("Message management", () => {
    let agent: ChatAgent;

    beforeEach(() => {
      agent = new ChatAgent();
    });

    it("should start with empty messages", () => {
      expect(agent.messages).toEqual([]);
    });

    it("should have messages property accessible", () => {
      expect(agent.messages).toBeDefined();
      expect(Array.isArray(agent.messages)).toBe(true);
    });
  });

  describe("Singleton pattern", () => {
    it("should return the same instance when calling getChatAgent multiple times", () => {
      const agent1 = getChatAgent();
      const agent2 = getChatAgent();
      expect(agent1).toBe(agent2);
    });

    it("should reset the singleton when calling resetChatAgent", () => {
      const agent1 = getChatAgent();
      agent1.messages.push(userMessage("test message"));

      resetChatAgent();

      const agent2 = getChatAgent();
      expect(agent2).not.toBe(agent1);
      expect(agent2.messages).toEqual([]);
    });

    it("should maintain conversation state across multiple calls", () => {
      const agent1 = getChatAgent();
      agent1.messages.push(userMessage("Hello"));
      agent1.messages.push(assistantMessage("Hi there!"));

      const agent2 = getChatAgent();
      expect(agent2.messages).toEqual([
        userMessage("Hello"),
        assistantMessage("Hi there!"),
      ]);
    });
  });
});
