import { describeEval } from "vitest-evals";
import { z } from "zod";

import { getChatAgent, resetChatAgent, userMessage } from "./ChatAgent";

// Mock EndpointContext for testing
const createMockEndpointContext = () => ({
  node: {
    endpointId: "test-endpoint",
    type: "endpoint" as const,
  },
  endpoint: {
    id: "test-endpoint",
    method: "POST" as const,
    path: [{ type: "literal", value: "/users" }],
    displayName: "Create User",
    operationId: "createUser",
    auth: undefined,
    defaultEnvironment: undefined,
    environments: [],
    pathParameters: [
      {
        key: "user_id",
        valueShape: { type: "string" },
        description: "User ID",
        isOptional: false,
      },
    ],
    queryParameters: [
      {
        key: "status",
        valueShape: { type: "boolean" },
        description: "User status",
        isOptional: false,
      },
    ],
    requestHeaders: [
      {
        key: "Authorization",
        valueShape: { type: "string" },
        description: "Authorization header",
        isOptional: false,
      },
    ],
    responseHeaders: [],
    requests: [
      {
        body: {
          type: "object",
          properties: [
            {
              key: "name",
              valueShape: { type: "string" },
              description: "User name",
              isOptional: false,
            },
            {
              key: "age",
              valueShape: { type: "string" },
              description: "User email",
              isOptional: true,
            },
            {
              key: "email",
              valueShape: { type: "string" },
              description: "User email",
              isOptional: true,
            },
          ],
        },
        contentType: "application/json",
      },
    ],
    responses: [],
    errors: [],
    examples: [],
    snippetTemplates: undefined,
    protocol: undefined,
  },
  globalHeaders: [],
  auth: undefined,
  types: {},
});

// Mock form state for testing
const createMockFormState = () => ({
  type: "endpoint" as const,
  headers: {},
  pathParameters: {},
  queryParameters: {},
  body: {
    type: "json" as const,
    value: {},
  },
  auth: undefined,
});

// Mock response state for testing
const createMockResponse = () => ({
  type: "notStartedLoading" as const,
});

// Create a test environment that replicates production
const createTestEnvironment = () => {
  const context = createMockEndpointContext();
  const formState = createMockFormState();
  const response = createMockResponse();

  const setFormState = () => {
    // Mock implementation
  };
  const setResponse = () => {
    // Mock implementation
  };
  const sendRequest = async () => {
    // Mock implementation
  };
  const resetWithExample = () => {
    // Mock implementation
  };
  const resetWithoutExample = () => {
    // Mock implementation
  };

  return {
    context,
    formState,
    setFormState,
    response,
    setResponse,
    sendRequest,
    resetWithExample,
    resetWithoutExample,
  };
};

// Test wrapper that provides playground context to the agent
const createAgentWithContext = () => {
  const agent = getChatAgent();
  const testEnv = createTestEnvironment();

  // In a real test environment, we would wrap the agent with the context providers
  // For now, we'll simulate the context being available to the agent
  return { agent, testEnv };
};

// Helper function to safely parse JSON responses
const safeParseJSON = (content: string) => {
  try {
    // Try to extract JSON from the response if it's wrapped in text
    const jsonMatch = content.match(/\{.*\}/s);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    // If no JSON found, try parsing the entire content
    return JSON.parse(content);
  } catch (_error) {
    console.warn("Failed to parse JSON response:", content);
    return {};
  }
};

// Reset the singleton before each eval to ensure clean state
beforeEach(() => {
  resetChatAgent();
});

describeEval("evaluate generateParameterSettingResponse", {
  data: async () => [
    {
      input: "Set the user_id to 12345 and the status to active",
      expected: {
        path_user_id: "12345",
        query_status: "active",
      },
      description: "Path and query parameter extraction",
    },
    {
      input: "Set the Authorization header to Bearer token123",
      expected: {
        header_Authorization: "Bearer token123",
      },
      description: "Header parameter extraction",
    },
    {
      input: "The user's name is Alice",
      expected: {
        body_name: "Alice",
      },
      description: "Body property extraction",
    },
    {
      input: "I don't have any values to provide",
      expected: {
        path_user_id: "",
        query_status: "",
        header_Authorization: "",
        body_name: "",
      },
      description: "No parameter values provided",
    },
  ],
  task: async (input: string) => {
    try {
      const { agent } = createAgentWithContext();

      // For parameter extraction, we need to define the missing values inline
      // This is a limitation of the current eval structure
      const missingValues = {
        missingPathParameters: ["user_id"],
        missingQueryParameters: ["status"],
        missingHeaders: ["Authorization"],
        missingBodyProperties: [
          { key: "name", type: "string", path: ["name"] },
        ],
      };

      // Use a promise to handle the async call
      const response = await agent.generateParameterSettingResponse(
        userMessage(input),
        missingValues
      );

      const parsed = safeParseJSON(response.content);

      // Return as JSON string
      return JSON.stringify(parsed);
    } catch (error) {
      console.error("Error in task function:", error);
      return "{}";
    }
  },
  scorers: [
    async ({ output, expected }) => {
      // Parse the output as JSON
      let parsedOutput;
      try {
        parsedOutput = JSON.parse(output);
      } catch (error) {
        console.error("Failed to parse output as JSON:", error);
        return {
          score: 0.0,
          reasoning: `Failed to parse output as JSON: ${output}`,
        };
      }

      // Ensure output is an object
      if (!parsedOutput || typeof parsedOutput !== "object") {
        return {
          score: 0.0,
          reasoning: `Expected object, got: ${typeof parsedOutput} - ${JSON.stringify(parsedOutput)}`,
        };
      }

      const expectedKeys = Object.keys(expected);
      const outputKeys = Object.keys(parsedOutput);

      if (expectedKeys.length === 0) {
        // If expected is empty, output should also be empty
        return {
          score: outputKeys.length === 0 ? 1.0 : 0.0,
          reasoning: `Expected empty object, got: ${JSON.stringify(parsedOutput)}`,
        };
      }

      const score = expectedKeys.every(
        (key) => parsedOutput[key] === expected[key]
      )
        ? 1.0
        : 0.0;

      return {
        score,
        reasoning: `Expected: ${JSON.stringify(expected)}, Got: ${JSON.stringify(parsedOutput)}`,
      };
    },
  ],
  threshold: 0.75,
});

// Input-output mapping dictionary
const inputOutputMapping = {
  // Body parameters pattern
  body: {
    pattern: (input: string) =>
      input.includes("name") &&
      input.includes("age") &&
      input.includes("email"),
    schema: z.object({
      body_name: z.string(),
      body_age: z.string(),
      body_email: z.string(),
    }),
    expected: {
      body_name: "John",
      body_age: "30",
      body_email: "john@example.com",
    },
  },
  // Query parameters pattern
  query: {
    pattern: (input: string) =>
      input.includes("limit") && input.includes("offset"),
    schema: z.object({
      query_limit: z.string(),
      query_offset: z.string(),
    }),
    expected: {
      query_limit: "10",
      query_offset: "20",
    },
  },
  // Mixed parameters pattern
  mixed: {
    pattern: (input: string) =>
      input.includes("user ID") && input.includes("Authorization"),
    schema: z.object({
      path_userId: z.string(),
      header_Authorization: z.string(),
    }),
    expected: {
      path_userId: "123",
      header_Authorization: "Bearer YOUR_AUTH_TOKEN",
    },
  },
};

describeEval("schema-based API parameter formatting", {
  data: async () => [
    {
      input: "Create a user with name John, age 30, and email john@example.com",
      expected: inputOutputMapping.body.expected,
      description: "User creation with body parameters",
    },
    {
      input: "Set the limit to 10 and offset to 20 for pagination",
      expected: inputOutputMapping.query.expected,
      description: "Query parameter formatting",
    },
    {
      input: "Set the user ID to 123 and include the Authorization header",
      expected: inputOutputMapping.mixed.expected,
      description: "Mixed path and header parameters",
    },
  ],
  task: async (input: string) => {
    const { agent } = createAgentWithContext();

    // Find matching pattern and get schema
    let schema;
    for (const [_key, config] of Object.entries(inputOutputMapping)) {
      if (config.pattern(input)) {
        schema = config.schema;
        break;
      }
    }

    // Default schema if no pattern matches
    if (!schema) {
      schema = z.object({
        body_name: z.string(),
        body_age: z.string(),
        body_email: z.string(),
      });
    }

    try {
      const response = await agent.generateSchemaResponse(
        userMessage(input),
        schema
      );

      const parsed = safeParseJSON(response.content);
      return JSON.stringify(parsed);
    } catch (error) {
      console.error("Error in task function:", error);
      return "{}";
    }
  },
  scorers: [
    async ({ output, expected }) => {
      // Try to handle different output formats
      let processedOutput = output;
      if (typeof output === "string") {
        try {
          processedOutput = JSON.parse(output);
        } catch (e) {
          console.log("Failed to parse string output:", e);
        }
      }

      // Ensure output is an object
      if (!processedOutput || typeof processedOutput !== "object") {
        return {
          score: 0.0,
          reasoning: `Expected object, got: ${typeof processedOutput} - ${JSON.stringify(processedOutput)}`,
        };
      }

      // Check that all expected keys exist in the output
      const score = Object.keys(expected).every((key) => {
        const outputValue = processedOutput[key];

        // For headers, just check that the key exists and has a non-empty value
        // TODO: Agent should know that it cannot randomly set this value
        if (key.startsWith("header_")) {
          return outputValue && outputValue.length > 0;
        }

        // For other fields, check exact match
        const expectedValue = expected[key];
        if (Array.isArray(expectedValue)) {
          return (
            Array.isArray(outputValue) &&
            expectedValue.every((item) => outputValue.includes(item))
          );
        }

        return outputValue === expectedValue;
      })
        ? 1.0
        : 0.0;

      return {
        score,
        reasoning: `Expected keys: ${Object.keys(expected).join(", ")}, Got: ${JSON.stringify(processedOutput)}`,
      };
    },
  ],
  threshold: 0.6,
});
