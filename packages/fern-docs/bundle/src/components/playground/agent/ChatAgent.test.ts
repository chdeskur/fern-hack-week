import { beforeEach, describe, expect, it } from "vitest";
import { z } from "zod";

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
      });
    });

    it("should create assistant messages", () => {
      const message = assistantMessage("Hello! How can I help you?");
      expect(message).toEqual({
        role: "assistant",
        content: "Hello! How can I help you?",
      });
    });

    it("should create user messages", () => {
      const message = userMessage("What is your purpose?");
      expect(message).toEqual({
        role: "user",
        content: "What is your purpose?",
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

  describe("Response generation", () => {
    it("responds to user messages", async () => {
      const agent = new ChatAgent();
      const response = await agent.generateResponse(
        userMessage("What is your purpose?")
      );
      expect(response).toBeDefined();
    });

    it("generates schema responses", async () => {
      const agent = new ChatAgent();
      const response = await agent.generateSchemaResponse(
        userMessage(
          "I'd like to add a sound effect to the Fern website that plays in a loop.. Maybe a babbling brook?"
        ),
        z.object({
          text: z
            .string()
            .describe("The text that will get converted into a sound effect."),
          duration_seconds: z
            .number()
            .describe(
              "The duration of the sound which will be generated in seconds. Must be at least 0.5 and at most 22. If set to None we will guess the optimal duration using the prompt. Defaults to None."
            ),
          prompt_influence: z
            .number()
            .describe(
              "A higher prompt influence makes your generation follow the prompt more closely while also making generations less variable. Must be a value between 0 and 1. Defaults to 0.3."
            ),
        })
      );
      console.log(response);
      expect(response).toBeDefined();
    });
  });
});
