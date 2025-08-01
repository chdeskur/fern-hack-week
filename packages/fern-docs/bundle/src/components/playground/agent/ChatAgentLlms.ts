import { createOpenAI } from "@ai-sdk/openai";
import {
  RepairTextFunction,
  ToolSet,
  generateObject,
  generateText,
  streamText,
} from "ai";
import { z } from "zod";

import {
  AvailableParameters,
  ChatMessage,
  assistantMessage,
  systemMessage,
  userMessage,
} from "./ChatAgent";
import { PlaygroundLogger } from "./PlaygroundLogger";

const openai = createOpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  organization: "org-EdIIJRQNvyUgF54KIY64fW9i",
});

/**
 * Attempt to repair malformed JSON where multiple objects are concatenated.
 */
async function repairJsonObject({
  text,
}: Parameters<RepairTextFunction>[0]): Promise<string> {
  // Find the first complete JSON object
  let braceCount = 0;
  let startIndex = -1;
  let endIndex = -1;

  for (let i = 0; i < text.length; i++) {
    if (text[i] === "{") {
      if (startIndex === -1) {
        startIndex = i;
      }
      braceCount++;
    } else if (text[i] === "}") {
      braceCount--;
      if (braceCount === 0 && startIndex !== -1) {
        endIndex = i;
        break;
      }
    }
  }

  if (startIndex !== -1 && endIndex !== -1) {
    return text.substring(startIndex, endIndex + 1);
  }

  // Fallback: try to add closing brace if we have an opening brace
  if (text.includes("{") && !text.includes("}")) {
    return text + "}";
  }

  return text;
}

// Schema definitions
const actionSchema = z.object({
  action: z.enum([
    "single_call",
    "multi_call",
    "ask_parameters",
    "general_response",
  ]),
  reasoning: z
    .string()
    .describe("Brief explanation of why this action was chosen"),
  confidence: z.number().min(0).max(1).describe("Confidence in this decision"),
});

const endpointAnalysisSchema = z.object({
  recommendedEndpointId: z
    .string()
    .describe(
      "The endpoint ID that best matches the user's intent, or undefined if current endpoint is appropriate"
    ),
  reasoning: z
    .string()
    .describe("Brief explanation of why this endpoint was chosen"),
  confidence: z
    .number()
    .min(0)
    .max(1)
    .describe("Confidence in this recommendation"),
});

const sequenceSchema = z.object({
  endpoints: z
    .array(z.string())
    .describe("Array of endpoint IDs in execution order"),
  explanation: z.string().describe("Brief explanation of the plan"),
});

export interface LlmCallOptions {
  messages: ChatMessage[];
  currentEndpointId?: string;
  sequence?: string[];
  availableParameters?: AvailableParameters;
  tools?: ToolSet;
  listEndpoints?: () => string;
  onChunk?: (chunk: string) => void;
}

/**
 * Classifies user message to determine what type of action is needed
 */
export async function classifyUserAction(options: LlmCallOptions) {
  const { messages, currentEndpointId, sequence = [], listEndpoints } = options;

  if (!listEndpoints) {
    throw new Error(
      "listEndpoints function is required for action classification"
    );
  }

  const systemPrompt =
    systemMessage(`Analyze the latest user message and determine what type of action is needed.

[Available actions]

- single_call: User wants to make one API call with the current endpoint. IMPORTANT: if there is an active sequence, use single_call to make the next call in the sequence.
- multi_call: User wants to perform ANY sequence of multiple related API calls that might require different endpoints. IMPORTANT: if there is an active sequence, never use multi_call. Instead, use single_call to make the next call in the sequence.
- ask_parameters: User is providing parameter values (like setting headers, providing names, IDs, etc.) for API calls, OR user is explicitly setting parameter values, OR user is responding to a request for parameters (including saying they don't have values)
- general_response: General question or conversation that doesn't fit into the other categories

IMPORTANT: If the user message contains parameter values (like "Set X to Y", "The name is Z", "Authorization header to Bearer token", etc.) OR if user says they don't have parameter values, classify as ask_parameters.

[All endpoints]

${listEndpoints()}

[Current endpoint]

${currentEndpointId ? `Currently on endpoint: ${currentEndpointId}` : "No current endpoint"}

[Active sequence?]

${sequence.length > 0 ? `Remaining endpoints in active sequence: ${sequence.join(", ")}` : "No active sequence"}`);

  const { object: actionDecision } = await generateObject({
    model: openai("gpt-4.1-mini"),
    messages: [...messages, systemPrompt],
    schema: actionSchema,
    experimental_repairText: repairJsonObject,
  });

  PlaygroundLogger.debug("[classifyUserAction] AI action decision", {
    action: actionDecision.action,
    confidence: actionDecision.confidence,
    reasoning: actionDecision.reasoning,
  });

  return actionDecision;
}

/**
 * Analyzes if a different endpoint should be used for a single call
 */
export async function analyzeEndpointForSingleCall(options: LlmCallOptions) {
  const { messages, currentEndpointId, listEndpoints } = options;

  if (!listEndpoints) {
    throw new Error("listEndpoints function is required for endpoint analysis");
  }

  const systemPrompt =
    systemMessage(`Analyze the user's message to determine if it requires a different endpoint than the current one. Use endpoints displayName, description, and path to help you determine this.

[All endpoints]

${listEndpoints()}

[Current endpoint]

${currentEndpointId ? `Currently on endpoint: ${currentEndpointId}` : "No current endpoint"}

IMPORTANT: Use the current endpoint unless the user's query clearly indicates they want to perform an action better suited to a different endpoint.
IMPORTANT: If an endpoint is versioned e.g. v1, v2, etc. ALWAYS use the latest version.`);

  const { object: endpointAnalysis } = await generateObject({
    model: openai("gpt-4.1-mini"),
    messages: [systemPrompt, ...messages],
    schema: endpointAnalysisSchema,
    experimental_repairText: repairJsonObject,
  });

  PlaygroundLogger.debug("[analyzeEndpointForSingleCall] Endpoint analysis", {
    recommendedEndpointId: endpointAnalysis.recommendedEndpointId,
    currentEndpointId,
    confidence: endpointAnalysis.confidence,
    reasoning: endpointAnalysis.reasoning,
  });

  return endpointAnalysis;
}

/**
 * HACK: helper function to find API keys in chat message history
 */
function findApiKeysInHistory(messages: ChatMessage[]): Record<string, string> {
  const apiKeys: Record<string, string> = {};

  // Common API key patterns
  const patterns = [
    // Bearer tokens
    /(?:bearer\s+|authorization[:\s]+bearer\s+)([a-zA-Z0-9._-]+)/gi,
    // API key formats
    /(?:api[_\s-]*key[:\s]+)([a-zA-Z0-9._-]+)/gi,
    // Token formats
    /(?:token[:\s]+)([a-zA-Z0-9._-]+)/gi,
    // Authorization header values
    /authorization[:\s]+([a-zA-Z0-9._\s-]+)/gi,
  ];

  messages.forEach((message) => {
    const content = message.content.toLowerCase();

    patterns.forEach((pattern) => {
      const matches = [...content.matchAll(pattern)];
      matches.forEach((match) => {
        const value = match[1]?.trim();
        if (value && value.length > 8) {
          // Basic validation for reasonable key length
          // Detect common header names from context
          if (content.includes("authorization") && !apiKeys.Authorization) {
            apiKeys.Authorization = match[0].includes("bearer") ? value : value;
          } else if (
            content.includes("api") &&
            content.includes("key") &&
            !apiKeys["X-API-Key"]
          ) {
            apiKeys["X-API-Key"] = value;
          } else if (content.includes("xi-api-key") && !apiKeys["xi-api-key"]) {
            apiKeys["xi-api-key"] = value;
          } else if (content.includes("token") && !apiKeys.Authorization) {
            apiKeys.Authorization = `Bearer ${value}`;
          }
        }
      });
    });
  });

  return apiKeys;
}

/**
 * HACK: helper function to check if a header value looks like a valid API key
 */
function isValidApiKey(value: string): boolean {
  if (!value || typeof value !== "string") return false;

  const trimmed = value.trim();
  // Consider it valid if it's longer than 8 characters and contains alphanumeric characters
  return trimmed.length > 8 && /^[a-zA-Z0-9._\s-]+$/.test(trimmed);
}

/**
 * Extracts parameter values from user messages
 */
export async function extractParameters(options: LlmCallOptions) {
  const { messages, availableParameters } = options;

  if (!availableParameters) {
    throw new Error("availableParameters is required for parameter extraction");
  }

  // HACK: find API keys from message history
  const historicalApiKeys = findApiKeysInHistory(messages);

  // Create schema for all available parameters
  const schema: Record<string, z.ZodString> = {};

  availableParameters.pathParameters.forEach((param) => {
    schema[`path_${param.name}`] = z.string();
  });

  availableParameters.queryParameters.forEach((param) => {
    schema[`query_${param.name}`] = z.string();
  });

  availableParameters.headers.forEach((header) => {
    schema[`header_${header.name}`] = z.string();
  });

  availableParameters.bodyProperties.forEach((prop) => {
    schema[`body_${prop.key}`] = z.string();
  });

  const parameterSchema = z.object(schema);

  // Format available parameters for the prompt
  let formatted = "";

  if (availableParameters.pathParameters.length > 0) {
    formatted +=
      "Path Parameters: " +
      availableParameters.pathParameters
        .map((p) => `${p.name} (current: ${p.currentValue || "empty"})`)
        .join(", ") +
      "\n";
  }

  if (availableParameters.queryParameters.length > 0) {
    formatted +=
      "Query Parameters: " +
      availableParameters.queryParameters
        .map((p) => `${p.name} (current: ${p.currentValue || "empty"})`)
        .join(", ") +
      "\n";
  }

  if (availableParameters.headers.length > 0) {
    formatted +=
      "Headers: " +
      availableParameters.headers
        .map((h) => `${h.name} (current: ${h.currentValue || "empty"})`)
        .join(", ") +
      "\n";
  }

  if (availableParameters.bodyProperties.length > 0) {
    formatted +=
      "Body Properties: " +
      availableParameters.bodyProperties
        .map(
          (p) => `${p.key} (${p.type}, current: ${p.currentValue || "empty"})`
        )
        .join(", ") +
      "\n";
  }

  const systemPrompt =
    systemMessage(`Extract parameter values from the user's message for making an API call.

Available parameters:
${formatted}

IMPORTANT: Look for values being specified in the user message. Examples:
- "Set the Authorization header to token123" → header_Authorization: "token123"
- "The user's name is Alice" → body_name: "Alice"
- "Set user_id to 12345" → path_user_id: "12345"

For headers that are mentioned but no specific value is provided, do not set a placeholder value. Instead, ask the user for more context.
Return parameter values in the correct format. Use empty strings for parameters that cannot be extracted from the user's message.`);

  const { object: parameters } = await generateObject({
    model: openai("gpt-4.1-mini"),
    messages: [systemPrompt, ...messages],
    schema: parameterSchema,
    experimental_repairText: repairJsonObject,
  });

  // Enhance parameters with API keys from history if needed
  const enhancedParameters = { ...parameters };

  // HACK: check each header parameter to see if we should use a historical API key
  availableParameters.headers.forEach((header) => {
    const headerKey = `header_${header.name}`;
    const currentValue = enhancedParameters[headerKey] || header.currentValue;

    // If no valid API key is present but we have one from history, use it
    if (!isValidApiKey(currentValue)) {
      // Check for exact header name match first
      const exactMatch = historicalApiKeys[header.name];
      if (exactMatch) {
        enhancedParameters[headerKey] = exactMatch;
        PlaygroundLogger.debug(
          `[extractParameters] Using historical API key for ${header.name}`
        );
      }
      // Check for common API key header patterns
      else if (
        header.name.toLowerCase().includes("authorization") &&
        historicalApiKeys.Authorization
      ) {
        enhancedParameters[headerKey] = historicalApiKeys.Authorization;
        PlaygroundLogger.debug(
          `[extractParameters] Using historical Authorization header`
        );
      } else if (
        header.name.toLowerCase().includes("api") &&
        historicalApiKeys["X-API-Key"]
      ) {
        enhancedParameters[headerKey] = historicalApiKeys["X-API-Key"];
        PlaygroundLogger.debug(
          `[extractParameters] Using historical X-API-Key header`
        );
      } else if (
        header.name.toLowerCase().includes("xi-api-key") &&
        historicalApiKeys["xi-api-key"]
      ) {
        enhancedParameters[headerKey] = historicalApiKeys["xi-api-key"];
        PlaygroundLogger.debug(
          `[extractParameters] Using historical xi-api-key header`
        );
      }
    }
  });

  PlaygroundLogger.debug("[extractParameters] AI extracted parameters", {
    rawParameters: parameters,
    enhancedParameters,
    historicalApiKeys,
  });

  return enhancedParameters;
}

/**
 * Creates a multi-call plan with optional streaming
 */
export async function createMultiCallPlan(options: LlmCallOptions) {
  const { messages, tools, listEndpoints, onChunk } = options;

  if (!tools || !listEndpoints) {
    throw new Error(
      "tools and listEndpoints are required for multi-call planning"
    );
  }

  const systemPrompt =
    systemMessage(`Create a plan for multiple API calls to fulfill the user's request. Use endpoints displayName, description, and path to help you determine the best sequence.

[All endpoints]

${listEndpoints()}

IMPORTANT: DO NOT USE displayName or path in sequence, only use endpoint IDs. Be very specific about which endpoints IDs to call, and in what order.
IMPORTANT: If an endpoint is versioned e.g. v1, v2, etc. ALWAYS use the latest version.`);

  let text = "";
  if (onChunk) {
    const { textStream } = streamText({
      model: openai("gpt-4.1-mini"),
      messages: [systemPrompt, ...messages],
      tools,
    });

    for await (const textPart of textStream) {
      text += textPart;
      onChunk(textPart);
    }
  } else {
    const { text: _text } = await generateText({
      model: openai("gpt-4.1-mini"),
      messages: [systemPrompt, ...messages],
      tools,
    });
    text = _text;
  }

  return text;
}

/**
 * Extracts endpoint sequence from a multi-call plan
 */
export async function extractEndpointSequence(
  options: LlmCallOptions & { planText: string }
) {
  const { planText, listEndpoints } = options;

  if (!listEndpoints) {
    throw new Error(
      "listEndpoints function is required for sequence extraction"
    );
  }

  const systemPrompt = systemMessage(
    `Find all endpoint IDs mentioned in the previous message and return them in the exact order they appear. 

IMPORTANT: Match the endpoint IDs exactly as they appear. Do not modify or invent endpoint IDs.`
  );

  const { object: sequence } = await generateObject({
    model: openai("gpt-4.1-mini"),
    messages: [systemPrompt, assistantMessage(planText)],
    schema: sequenceSchema,
    experimental_repairText: repairJsonObject,
  });

  PlaygroundLogger.debug("[extractEndpointSequence] Extracted sequence", {
    endpoints: sequence.endpoints,
    explanation: sequence.explanation,
  });

  return sequence;
}

/**
 * Generates a response summary from API data with optional streaming
 */
export async function generateResponseSummary(options: {
  responseData: unknown;
  statusCode: number;
  onChunk?: (chunk: string) => void;
}) {
  const { responseData, statusCode, onChunk } = options;

  if (statusCode >= 200 && statusCode < 300) {
    // SUCCESS - use streaming if onChunk is provided
    let text = "";

    const systemPrompt = systemMessage(
      "Summarize this API response in a helpful, human-readable way. Focus on the key information and results."
    );
    const userPrompt = userMessage(
      typeof responseData === "string"
        ? responseData
        : JSON.stringify(responseData)
    );

    if (onChunk) {
      const { textStream } = streamText({
        model: openai("gpt-4.1-mini"),
        messages: [systemPrompt, userPrompt],
      });

      for await (const textPart of textStream) {
        text += textPart;
        onChunk(textPart);
      }
    } else {
      const { text: _text } = await generateText({
        model: openai("gpt-4.1-mini"),
        messages: [systemPrompt, userPrompt],
      });
      text = _text;
    }

    return text;
  }

  // For error responses, return the data as-is since error handling uses askFern
  return null;
}

/**
 * Makes a call to Fern AI with optional streaming support
 */
export async function callFernAi(options: {
  userQuery?: string;
  includeMessages?: boolean;
  messages?: ChatMessage[];
  onChunk?: (chunk: string) => void;
}) {
  const { userQuery, includeMessages, messages = [], onChunk } = options;

  try {
    // Generate a conversation ID for this chat session
    const conversationId = crypto.randomUUID();

    // Get base URL from environment or default to current origin in browser
    const BASE_URL =
      typeof window !== "undefined"
        ? window.location.origin
        : process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    // Prepare the chat request for the chat endpoint
    const chatRequest = {
      messages: [
        ...(includeMessages
          ? messages.map((message) => ({
              // Treat all our messages as user, since askFern treats itself as the assistant
              role: "user",
              parts: [{ type: "text", text: message.content }],
            }))
          : []),
        ...(userQuery
          ? [
              {
                role: "user",
                parts: [{ type: "text", text: userQuery }],
              },
            ]
          : []),
      ],
      url: BASE_URL,
      conversationId,
    };

    // Make the API call to the chat endpoint
    const response = await fetch(`${BASE_URL}/api/fern-docs/search/v2/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-fern-host": "buildwithfern.com",
      },
      body: JSON.stringify(chatRequest),
    });

    // Check if the response is ok
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    if (onChunk) {
      // Handle streaming with callback
      return await handleStreamingFernResponse(response, onChunk);
    } else {
      // Parse the stream and extract human-readable text
      const streamText = await response.text();
      return parseStreamResponse(streamText);
    }
  } catch (error) {
    PlaygroundLogger.error("Error calling Fern AI:", error);
    const errorMessage = `Error calling Fern AI: ${error instanceof Error ? error.message : "Unknown error"}`;

    if (onChunk) {
      onChunk(errorMessage);
    }

    return errorMessage;
  }
}

/**
 * Handle streaming response from Fern AI with callback
 */
async function handleStreamingFernResponse(
  response: Response,
  onChunk: (chunk: string) => void
): Promise<string> {
  if (!response.body) {
    throw new Error("Response body is null");
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let fullText = "";

  try {
    while (true) {
      const { done, value } = await reader.read();

      if (done) {
        break;
      }

      const chunk = decoder.decode(value, { stream: true });
      const lines = chunk.split("\n");

      for (const line of lines) {
        if (line.startsWith("data: ")) {
          const data = line.slice(6); // Remove 'data: ' prefix

          // Skip the [DONE] message
          if (data === "[DONE]") {
            continue;
          }

          try {
            const parsed = JSON.parse(data);

            // Extract text from text-delta events
            if (parsed.type === "text-delta" && parsed.delta) {
              fullText += parsed.delta;
              onChunk(parsed.delta);
            }
          } catch (_error) {
            // Skip malformed JSON lines
            PlaygroundLogger.debug("Skipping malformed JSON in stream", {
              line: line.slice(0, 100),
            });
          }
        }
      }
    }
  } finally {
    reader.releaseLock();
  }

  return fullText.trim();
}

/**
 * Parse the SSE stream response and extract human-readable text
 */
function parseStreamResponse(streamText: string): string {
  const lines = streamText.split("\n");
  let fullText = "";

  for (const line of lines) {
    if (line.startsWith("data: ")) {
      const data = line.slice(6); // Remove 'data: ' prefix

      // Skip the [DONE] message
      if (data === "[DONE]") {
        continue;
      }

      try {
        const parsed = JSON.parse(data);

        // Extract text from text-delta events
        if (parsed.type === "text-delta" && parsed.delta) {
          fullText += parsed.delta;
        }

        // Handle text-start (optional, for debugging)
        if (parsed.type === "text-start") {
          // Text is starting, we can add a newline if needed
          if (fullText && !fullText.endsWith("\n")) {
            fullText += "\n";
          }
        }

        // Handle text-end (optional, for debugging)
        if (parsed.type === "text-end") {
          // Text has ended, we can add a newline if needed
          if (fullText && !fullText.endsWith("\n")) {
            fullText += "\n";
          }
        }
      } catch (_error) {
        // Skip malformed JSON lines
        PlaygroundLogger.debug("Skipping malformed JSON in stream", {
          line: line.slice(0, 100),
        });
      }
    }
  }

  return fullText.trim();
}
