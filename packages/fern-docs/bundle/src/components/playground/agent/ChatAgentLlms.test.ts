import { beforeEach, describe, expect, it, vi } from "vitest";

import { userMessage } from "./ChatAgent";
import {
  analyzeEndpointForSingleCall,
  classifyUserAction,
  extractParameters,
  generateResponseSummary,
} from "./ChatAgentLlms";

// Mock the AI SDK functions
vi.mock("ai", () => ({
  generateObject: vi.fn(),
  generateText: vi.fn(),
  streamText: vi.fn(),
}));

// Mock the OpenAI client
vi.mock("@ai-sdk/openai", () => ({
  createOpenAI: vi.fn(() => vi.fn((model: string) => ({ model }))),
}));

// Mock PlaygroundLogger
vi.mock("./PlaygroundLogger", () => ({
  PlaygroundLogger: {
    debug: vi.fn(),
    error: vi.fn(),
    warn: vi.fn(),
  },
}));

describe("ChatAgentLlms", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("classifyUserAction", () => {
    it("should classify user action with required parameters", async () => {
      const { generateObject } = await import("ai");
      vi.mocked(generateObject).mockResolvedValue({
        object: {
          action: "single_call",
          reasoning: "User wants to make one API call",
          confidence: 0.9,
        },
      } as any);

      const messages = [userMessage("Make an API call")];
      const result = await classifyUserAction({
        messages,
        currentEndpointId: "test-endpoint",
        sequence: [],
      });

      expect(result.action).toBe("single_call");
      expect(result.confidence).toBe(0.9);
      expect(generateObject).toHaveBeenCalledTimes(1);
    });

    it("should handle multi-call classification", async () => {
      const { generateObject } = await import("ai");
      vi.mocked(generateObject).mockResolvedValue({
        object: {
          action: "multi_call",
          reasoning: "User wants multiple API calls",
          confidence: 0.8,
        },
      } as any);

      const messages = [userMessage("Get user data then update profile")];
      const result = await classifyUserAction({
        messages,
        currentEndpointId: "test-endpoint",
        sequence: [],
      });

      expect(result.action).toBe("multi_call");
      expect(result.confidence).toBe(0.8);
    });
  });

  describe("analyzeEndpointForSingleCall", () => {
    it("should analyze endpoint recommendation", async () => {
      const { generateObject } = await import("ai");
      vi.mocked(generateObject).mockResolvedValue({
        object: {
          recommendedEndpointId: "users-get",
          reasoning: "User wants to get user data",
          confidence: 0.85,
        },
      } as any);

      const mockListEndpoints = vi.fn(() =>
        JSON.stringify([
          { id: "users-get", method: "GET", path: "/users/{id}" },
        ])
      );

      const messages = [userMessage("Get user by ID")];
      const result = await analyzeEndpointForSingleCall({
        messages,
        currentEndpointId: "other-endpoint",
        listEndpoints: mockListEndpoints,
      });

      expect(result.recommendedEndpointId).toBe("users-get");
      expect(result.confidence).toBe(0.85);
      expect(mockListEndpoints).toHaveBeenCalledTimes(1);
    });
  });

  describe("extractParameters", () => {
    it("should extract parameters from user messages", async () => {
      const { generateObject } = await import("ai");
      vi.mocked(generateObject).mockResolvedValue({
        object: {
          path_userId: "123",
          header_Authorization: "Bearer token",
          body_name: "John Doe",
        },
      } as any);

      const availableParameters = {
        pathParameters: [{ name: "userId", currentValue: "" }],
        queryParameters: [],
        headers: [{ name: "Authorization", currentValue: "" }],
        bodyProperties: [
          {
            key: "name",
            type: "string",
            description: "User name",
            path: ["name"],
            currentValue: "",
          },
        ],
      };

      const messages = [
        userMessage(
          "Set userId to 123, Authorization to Bearer token, name to John Doe"
        ),
      ];
      const result = await extractParameters({
        messages,
        availableParameters,
      });

      expect(result.path_userId).toBe("123");
      expect(result.header_Authorization).toBe("Bearer token");
      expect(result.body_name).toBe("John Doe");
    });

    it("should throw error when availableParameters is missing", async () => {
      const messages = [userMessage("Set some parameters")];

      await expect(extractParameters({ messages })).rejects.toThrow(
        "availableParameters is required for parameter extraction"
      );
    });
  });

  describe("generateResponseSummary", () => {
    it("should generate summary for successful response", async () => {
      const { generateText } = await import("ai");
      vi.mocked(generateText).mockResolvedValue({
        text: "The API call was successful and returned user data.",
      } as any);

      const result = await generateResponseSummary({
        responseData: { id: 1, name: "John" },
        statusCode: 200,
      });

      expect(result).toBe(
        "The API call was successful and returned user data."
      );
      expect(generateText).toHaveBeenCalledTimes(1);
    });

    it("should return null for error responses", async () => {
      const result = await generateResponseSummary({
        responseData: { error: "Not found" },
        statusCode: 404,
      });

      expect(result).toBeNull();
    });

    it("should handle streaming response", async () => {
      const { streamText } = await import("ai");
      const mockTextStream = {
        [Symbol.asyncIterator]: async function* () {
          yield "The API ";
          yield "call was ";
          yield "successful.";
        },
      };

      vi.mocked(streamText).mockReturnValue({
        textStream: mockTextStream,
      } as any);

      const chunks: string[] = [];
      const result = await generateResponseSummary({
        responseData: { success: true },
        statusCode: 200,
        onChunk: (chunk) => chunks.push(chunk),
      });

      expect(result).toBe("The API call was successful.");
      expect(chunks).toEqual(["The API ", "call was ", "successful."]);
    });
  });
});
