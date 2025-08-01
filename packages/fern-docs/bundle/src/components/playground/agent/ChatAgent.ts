import { createOpenAI } from "@ai-sdk/openai";
import {
  RepairTextFunction,
  ToolSet,
  generateObject,
  generateText,
  streamText,
} from "ai";
import { z } from "zod";

import { ApiDefinition } from "@fern-api/fdr-sdk";

import { PlaygroundLogger } from "./PlaygroundContext";

const openai = createOpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  organization: "org-EdIIJRQNvyUgF54KIY64fW9i",
});

// These types help us handle responses from the agent in a structured way
// They mirror the action types for simplicity, but could be decoupled if needed
type ResponseClassification =
  | "single_call"
  | "multi_call"
  | "ask_parameters"
  | "general_response";

type ChatAgentResponse = {
  classification: ResponseClassification;
  message: ChatMessage;
  parameters?: Record<string, unknown>;
  endpointSequence?: string[];
};

export interface ChatMessage {
  role: "system" | "assistant" | "user";
  content: string;
  consent_required: boolean;
}

interface SystemMessage extends ChatMessage {
  role: "system";
}

export function systemMessage(content: string): SystemMessage {
  return { role: "system", content, consent_required: false };
}

interface AssistantMessage extends ChatMessage {
  role: "assistant";
}

export interface ParameterState {
  name: string;
  currentValue: any;
}

export interface AvailableParameters {
  pathParameters: ParameterState[];
  queryParameters: ParameterState[];
  headers: ParameterState[];
  bodyProperties: {
    key: string;
    type: string;
    description?: string;
    path: string[];
    currentValue: any;
  }[];
}

export function assistantMessage(
  content: string,
  options?: {
    consent_required: boolean;
  }
): AssistantMessage {
  return {
    role: "assistant",
    content,
    consent_required: options?.consent_required ?? false,
  };
}

interface UserMessage extends ChatMessage {
  role: "user";
}

export function userMessage(content: string): UserMessage {
  return { role: "user", content, consent_required: false };
}

export interface ChatAgentConfig {
  additionalTools?: ToolSet;
  initialMessages?: ChatMessage[];
  apiDefinition?: ApiDefinition.ApiDefinition;
}

export class ChatAgent {
  private readonly tools: ToolSet;
  private apiDefinition?: ApiDefinition.ApiDefinition;
  public messages: ChatMessage[] = [];
  public sequence: string[] = [];

  constructor(config?: ChatAgentConfig) {
    this.apiDefinition = config?.apiDefinition;
    this.tools = {
      ...this.createApiTools(),
      ...this.createAskFernTools(),
      ...(config?.additionalTools ?? {}),
    };
    this.messages = config?.initialMessages ?? [];
  }

  private createApiTools(): ToolSet {
    if (!this.apiDefinition) return {};

    return {
      listEndpoints: {
        description:
          "List all available API endpoints with their methods and paths",
        execute: this.listEndpoints,
      },

      getEndpointDetails: {
        description:
          "Get detailed information about a specific endpoint including parameters and request/response schemas",
        inputSchema: z.object({
          endpointId: z
            .string()
            .describe("The ID of the endpoint to get details for"),
        }),
        execute: this.getEndpointDetails,
      },
    };
  }

  private createAskFernTools(): ToolSet {
    return {
      askDocsAi: {
        description:
          "Ask a question to the Fern AI service trained on the documentation for this API domain",
        inputSchema: z.object({
          userQuery: z
            .string()
            .describe("The question to ask the Fern AI service"),
        }),
        execute: ({ userQuery }) => this.askFern({ userQuery }),
      },
    };
  }

  /**
   * Ask Fern AI a question with optional streaming support
   *
   * @param userQuery - The question to ask
   * @param includeMessages - Whether to include conversation history
   * @param onChunk - Optional callback for streaming chunks (enables streaming mode)
   * @returns Promise<string> - The complete response
   */
  private askFern = async ({
    userQuery,
    includeMessages,
    onChunk,
  }: {
    userQuery?: string;
    includeMessages?: boolean;
    onChunk?: (chunk: string) => void;
  }): Promise<string> => {
    try {
      // Generate a conversation ID for this chat session
      const conversationId = crypto.randomUUID();

      // TODO: get from the environment
      const BASE_URL = "http://localhost:3000";

      // Prepare the chat request for the chat endpoint
      const chatRequest = {
        messages: [
          ...(includeMessages
            ? this.messages.map((message) => ({
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
        return await this.handleStreamingResponse(response, onChunk);
      } else {
        // Parse the stream and extract human-readable text
        const streamText = await response.text();
        return this.parseStreamResponse(streamText);
      }
    } catch (error) {
      PlaygroundLogger.error("Error calling Fern AI:", error);
      const errorMessage = `Error calling Fern AI: ${error instanceof Error ? error.message : "Unknown error"}`;

      if (onChunk) {
        onChunk(errorMessage);
      }

      return errorMessage;
    }
  };

  /**
   * Handle streaming response with callback
   *
   * Usage example:
   * const result = await this.askFern({
   *   userQuery: "What is the API?",
   *   onChunk: (chunk) => console.log("Received chunk:", chunk)
   * });
   */
  private async handleStreamingResponse(
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

  private listEndpoints = () => {
    const endpoints = Object.entries(this.apiDefinition?.endpoints || {}).map(
      ([id, endpoint]) => ({
        id,
        method: endpoint.method,
        path:
          endpoint.path
            ?.map((part: any) =>
              part.type === "literal" ? part.value : `{${part.value}}`
            )
            .join("") || "",
        description: endpoint.description,
      })
    );
    PlaygroundLogger.debug("Listing available API endpoints", {
      count: endpoints.length,
    });
    return JSON.stringify(endpoints);
  };

  private getEndpointDetails = async ({
    endpointId,
  }: {
    endpointId: string;
  }) => {
    PlaygroundLogger.debug("Retrieving endpoint details", { endpointId });
    const endpoints = this.apiDefinition?.endpoints;
    if (!endpoints) {
      return "No endpoints available";
    }

    // Find endpoint by matching the ID as string
    const endpointEntry = Object.entries(endpoints).find(
      ([id, _]) => id === endpointId
    );
    if (!endpointEntry) {
      return `Endpoint with ID "${endpointId}" not found`;
    }

    const [, endpoint] = endpointEntry;
    const details = {
      id: endpointId,
      method: endpoint.method,
      path:
        endpoint.path
          ?.map((part: any) =>
            part.type === "literal" ? part.value : `{${part.value}}`
          )
          .join("") || "",
      description: endpoint.description,
      pathParameters:
        endpoint.pathParameters?.map((p: any) => ({
          key: p.key,
          description: p.description,
          type: p.valueShape?.type,
        })) || [],
      queryParameters:
        endpoint.queryParameters?.map((p: any) => ({
          key: p.key,
          description: p.description,
          type: p.valueShape?.type,
        })) || [],
      requestHeaders: [
        ...(this.apiDefinition?.globalHeaders?.map((h: any) => ({
          key: h.key,
          description: h.description,
          type: h.valueShape?.type,
        })) || []),
        ...(endpoint.requestHeaders?.map((h: any) => ({
          key: h.key,
          description: h.description,
          type: h.valueShape?.type,
        })) || []),
      ],
      requestBody: endpoint.requests?.[0]?.body
        ? {
            type: endpoint.requests[0].body.type,
          }
        : null,
      responses:
        endpoint.responses?.map((r: any) => ({
          statusCode: r.statusCode,
          description: r.description,
          type: r.body?.type,
        })) || [],
    };

    return JSON.stringify(details);
  };

  private get baseSystemPrompt() {
    return systemMessage(
      `[Date] ${new Date().toLocaleString()}
You are an intelligent API assistant that helps users interact with APIs. 

Capabilities:
1. Analyze user requests to determine if they need single or multiple API calls
2. Extract parameter values from user messages
3. Generate structured parameter objects for API calls
4. Plan and execute multi-step API sequences
5. Navigate to different endpoints when needed

Always be helpful and concise. When you need more information, ask specific questions.`
    );
  }

  private getMessagesWithSystem() {
    return [this.baseSystemPrompt, ...this.messages];
  }

  /**
   * Main method to handle user input and determine the appropriate action
   *
   * @param userMsg - The user message to process
   * @param availableParameters - Available parameters for API calls
   * @param currentEndpointId - Current endpoint ID
   * @param apiDefinition - API definition
   * @param onChunk - Optional callback for streaming chunks (enables streaming mode)
   * @returns Promise<ChatAgentResponse> - The response with classification and message
   *
   * Usage example:
   * const response = await chatAgent.processUserMessage(
   *   userMessage("What is this API?"),
   *   undefined,
   *   undefined,
   *   apiDefinition,
   *   (chunk) => console.log("Received chunk:", chunk)
   * );
   */
  public async processUserMessage(
    userMsg: UserMessage,
    availableParameters?: AvailableParameters,
    currentEndpointId?: string,
    apiDefinition?: ApiDefinition.ApiDefinition,
    onChunk?: (chunk: string) => void
  ): Promise<ChatAgentResponse> {
    this.apiDefinition = apiDefinition;
    this.messages.push(userMsg);

    // First, determine what action is needed
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
      confidence: z
        .number()
        .min(0)
        .max(1)
        .describe("Confidence in this decision"),
    });

    const { object: actionDecision } = await generateObject({
      model: openai("gpt-4.1-mini"),
      messages: [
        ...this.getMessagesWithSystem(),
        systemMessage(`Analyze the latest user message and determine what type of action is needed.

Available actions:
- single_call: User wants to make one API call with the current endpoint. IMPORTANT: if there is an active sequence, use single_call to make the next call in the sequence.
- multi_call: User wants to perform ANY sequence of multiple related API calls that might require different endpoints. IMPORTANT: if there is an active sequence, never use multi_call. Instead, use single_call to make the next call in the sequence.
- ask_parameters: User is providing parameter values (like setting headers, providing names, IDs, etc.) for API calls, OR user is explicitly setting parameter values, OR user is responding to a request for parameters (including saying they don't have values)
- general_response: General question or conversation that doesn't fit into the other categories

IMPORTANT: If the user message contains parameter values (like "Set X to Y", "The name is Z", "Authorization header to Bearer token", etc.) OR if user says they don't have parameter values, classify as ask_parameters.

Context:
${this.sequence.length > 0 ? `Remaining endpoints in active sequence: ${this.sequence.join(", ")}` : "No active sequence"}
${currentEndpointId ? `Currently on endpoint: ${currentEndpointId}` : "No current endpoint"}`),
      ],
      schema: actionSchema,
    });

    PlaygroundLogger.debug("AI action decision", {
      action: actionDecision.action,
      confidence: actionDecision.confidence,
      reasoning: actionDecision.reasoning,
    });

    // Handle different action types
    switch (actionDecision.action) {
      case "single_call":
        return await this.handleSingleCall(
          availableParameters,
          currentEndpointId
        );
      case "multi_call":
        return await this.handleMultiCall(onChunk);
      case "ask_parameters":
        return await this.handleParameterExtraction(availableParameters);
      case "general_response":
      default:
        return await this.handleGeneralResponse(onChunk);
    }
  }

  private async handleSingleCall(
    availableParameters?: AvailableParameters,
    currentEndpointId?: string
  ): Promise<ChatAgentResponse> {
    // First, determine which endpoint should be used for this single call
    let targetEndpointId: string | undefined;
    let shouldNavigate = false;

    // Check if user's query might require a different endpoint
    if (this.apiDefinition) {
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

      try {
        const { object: endpointAnalysis } = await generateObject({
          model: openai("gpt-4.1-nano"),
          messages: [
            systemMessage(`Analyze the user's message to determine if it requires a different endpoint than the current one.

Available endpoints:
${this.listEndpoints()}

Current endpoint: ${currentEndpointId || "none"}

Look for clues in the user's message about what they want to accomplish. If the user's intent is better served by a different endpoint, recommend it. Otherwise, use the current endpoint. Try to AVOID legacy endpoints if possible.

IMPORTANT: Only recommend a different endpoint if the user's query clearly indicates they want to perform an action that's better suited to a different endpoint.`),
            ...this.getMessagesWithSystem(),
          ],
          schema: endpointAnalysisSchema,
        });

        PlaygroundLogger.debug("Endpoint analysis for single_call", {
          recommendedEndpointId: endpointAnalysis.recommendedEndpointId,
          currentEndpointId,
          confidence: endpointAnalysis.confidence,
          reasoning: endpointAnalysis.reasoning,
        });

        if (
          endpointAnalysis.recommendedEndpointId &&
          endpointAnalysis.recommendedEndpointId !== currentEndpointId &&
          endpointAnalysis.confidence > 0.7
        ) {
          targetEndpointId = endpointAnalysis.recommendedEndpointId;
          shouldNavigate = true;
        }
      } catch (error) {
        PlaygroundLogger.warn(
          "Failed to analyze endpoint for single_call",
          error
        );
        // Continue with current endpoint on analysis failure
      }
    }

    // If we need to navigate to a different endpoint, return navigation instructions
    if (shouldNavigate && targetEndpointId) {
      const response = assistantMessage(
        `I need to navigate to a different endpoint (${targetEndpointId}) to handle your request.`
      );
      this.messages.push(response);
      return {
        classification: "single_call",
        message: response,
        endpointSequence: [targetEndpointId],
      };
    }

    if (!availableParameters) {
      const response = assistantMessage(
        "I need to know what parameters are available for this endpoint."
      );
      this.messages.push(response);
      // Re-classify response as ask_parameters
      return {
        classification: "ask_parameters",
        message: response,
      };
    }

    // Check if there are actually any parameters available
    const hasAvailableParameters =
      availableParameters.pathParameters.length > 0 ||
      availableParameters.queryParameters.length > 0 ||
      availableParameters.headers.length > 0 ||
      availableParameters.bodyProperties.length > 0;

    if (!hasAvailableParameters) {
      const response = assistantMessage("I've will make an API call");
      this.messages.push(response);
      return {
        classification: "single_call",
        message: response,
        parameters: {},
      };
    }

    // Create schema for all available parameters
    const parameterSchema = this.createParameterSchema(availableParameters);

    try {
      const { object: parameters } = await generateObject({
        model: openai("gpt-4.1-mini"),
        messages: [
          systemMessage(`Extract parameter values from the user's message for making an API call.

Available parameters:
${this.formatAvailableParameters(availableParameters)}

IMPORTANT: Look for values being set in the user message. Examples:
- "Set the Authorization header to token123" → header_Authorization: "token123"
- "The user's name is Alice" → body_name: "Alice"
- "Set user_id to 12345" → path_user_id: "12345"

For headers that are mentioned but no specific value is provided, do not set a placeholder value. Instead, ask the user for more context.
Return parameter values in the correct format. Use empty strings for parameters that cannot be extracted from the user's message.`),
          ...this.getMessagesWithSystem(),
        ],
        schema: parameterSchema,
      });

      // Create a complete parameters object preserving existing values for missing parameters
      const completeParameters = this.createParametersObjectPreservingExisting(
        availableParameters,
        parameters
      );

      // Check if any non-empty parameters were extracted
      const hasExtractedParameters = Object.values(parameters).some(
        (value) => value && value.trim() !== ""
      );

      if (hasExtractedParameters) {
        const response = assistantMessage(
          `I've extracted the parameters from your message and will make the API call: ${JSON.stringify(completeParameters)}`
        );
        this.messages.push(response);
        return {
          classification: "single_call",
          message: response,
          parameters: completeParameters,
        };
      } else {
        const response = assistantMessage(
          "I need more information about the parameters for this API call."
        );
        this.messages.push(response);
        // Re-classify response as ask_parameters
        return {
          classification: "ask_parameters",
          message: response,
          parameters: completeParameters,
        };
      }
    } catch (error) {
      PlaygroundLogger.error(
        "Failed to extract parameters from user message",
        error
      );
      const response = assistantMessage(
        "I had trouble understanding the parameters. Could you provide them more clearly?"
      );
      this.messages.push(response);

      // Even on error, return parameters object preserving existing values
      const preservedParams = this.createParametersObjectPreservingExisting(
        availableParameters,
        {}
      );
      // Re-classify response as ask_parameters
      return {
        classification: "ask_parameters",
        message: response,
        parameters: preservedParams,
      };
    }
  }

  private async handleMultiCall(
    onChunk?: (chunk: string) => void
  ): Promise<ChatAgentResponse> {
    let text = "";
    if (onChunk) {
      const { textStream } = streamText({
        model: openai("gpt-4.1-mini"),
        messages: [
          systemMessage(`Create a plan for multiple API calls to fulfill the user's request. 
Use the available tools to explore endpoints and determine the sequence needed.
Be specific about which endpoints to call and in what order.
IMPORTANT: Make sure to use the tools to explore endpoints and include the endpoint IDs in the plan.

Here are the available endpoints:
${this.listEndpoints()}
`),
          ...this.getMessagesWithSystem(),
        ],
        tools: this.tools,
      });

      for await (const textPart of textStream) {
        text += textPart;
        onChunk(textPart);
      }
    } else {
      // Use tools to explore API and create a plan
      const { text: _text } = await generateText({
        model: openai("gpt-4.1-mini"),
        messages: [
          systemMessage(`Create a plan for multiple API calls to fulfill the user's request. 
Use the available tools to explore endpoints and determine the sequence needed.
Be specific about which endpoints to call and in what order.  Try to AVOID legacy endpoints if possible.
IMPORTANT: Make sure to use the tools to explore endpoints and include the endpoint IDs in the plan.

Here are the available endpoints:
${this.listEndpoints()}
`),
          ...this.getMessagesWithSystem(),
        ],
        tools: this.tools,
      });
      text = _text;
    }

    // Extract endpoint sequence from the plan
    const sequenceSchema = z.object({
      endpoints: z
        .array(z.string())
        .describe("Array of endpoint IDs in execution order"),
      explanation: z.string().describe("Brief explanation of the plan"),
    });

    const { object: sequence } = await generateObject({
      model: openai("gpt-4.1-nano"),
      messages: [
        systemMessage("Extract the sequence of endpoint IDs from the plan."),
        assistantMessage(text),
      ],
      schema: sequenceSchema,
    });

    if (onChunk) {
      const textPart = `\n\n${sequence.explanation}\n\n${JSON.stringify(
        sequence.endpoints
      )}`;
      PlaygroundLogger.debug("Appending multi-call sequence to response", {
        endpoints: sequence.endpoints,
        explanationLength: sequence.explanation.length,
      });
      text += textPart;
      onChunk(textPart);
    }

    const response = assistantMessage(text);
    this.messages.push(response);
    this.sequence = sequence.endpoints;

    return {
      classification: "multi_call",
      message: response,
      endpointSequence: sequence.endpoints,
    };
  }

  private async handleParameterExtraction(
    availableParameters?: AvailableParameters
  ): Promise<ChatAgentResponse> {
    if (!availableParameters) {
      const response = assistantMessage(
        "I need to know what parameters are available."
      );
      this.messages.push(response);
      return {
        classification: "ask_parameters",
        message: response,
      };
    }

    // Check if there are actually any parameters available
    const hasAvailableParameters =
      availableParameters.pathParameters.length > 0 ||
      availableParameters.queryParameters.length > 0 ||
      availableParameters.headers.length > 0 ||
      availableParameters.bodyProperties.length > 0;

    if (!hasAvailableParameters) {
      const response = assistantMessage("Making a call to the endpoint.");
      this.messages.push(response);
      // Re-classify response as single_call
      return {
        classification: "single_call",
        message: response,
      };
    }

    const parameterSchema = this.createParameterSchema(availableParameters);

    try {
      const { object: parameters } = await generateObject({
        model: openai("gpt-4.1-mini"),
        messages: [
          systemMessage(`Extract parameter values from the user's message:

Available parameters:
${this.formatAvailableParameters(availableParameters)}

IMPORTANT: Look for values being set in the user message. Examples:
- "Set the Authorization header to token123" → header_Authorization: "token123"
- "The user's name is Alice" → body_name: "Alice"
- "Set user_id to 12345" → path_user_id: "12345"

For headers that are mentioned but no specific value is provided, do not set a placeholder value. Instead, ask the user for more context.
Return parameter values in the correct format. Use empty strings for parameters that cannot be extracted from the user's message.`),
          ...this.getMessagesWithSystem(),
        ],
        schema: parameterSchema,
        experimental_repairText: repairJsonObject,
      });

      // Create a complete parameters object preserving existing values for missing parameters
      const completeParameters = this.createParametersObjectPreservingExisting(
        availableParameters,
        parameters
      );

      // Check if any non-empty parameters were extracted
      const hasExtractedParameters = Object.values(parameters).some(
        (value) => value && value.trim() !== ""
      );

      if (hasExtractedParameters) {
        const response = assistantMessage(
          `I've extracted the parameters from your message and will make the API call: ${JSON.stringify(completeParameters)}`
        );
        this.messages.push(response);
        // If there is enough information, re-classify response as single_call
        return {
          classification: "single_call",
          message: response,
          parameters: completeParameters,
        };
      } else {
        const response = assistantMessage(
          "I couldn't find parameter values in your message. Could you be more specific?"
        );
        this.messages.push(response);
        return {
          classification: "ask_parameters",
          message: response,
          parameters: completeParameters,
        };
      }
    } catch (error) {
      // Truncate long lines to first 100 characters to avoid log spam
      PlaygroundLogger.error("Parameter extraction failed", error);
      const response = assistantMessage(
        "I had trouble extracting parameters. Could you provide them more clearly?"
      );
      this.messages.push(response);

      // Even on error, return parameters object preserving existing values
      const preservedParams = this.createParametersObjectPreservingExisting(
        availableParameters,
        {}
      );
      return {
        classification: "ask_parameters",
        message: response,
        parameters: preservedParams,
      };
    }
  }

  private async handleGeneralResponse(
    onChunk?: (chunk: string) => void
  ): Promise<ChatAgentResponse> {
    // Use the askDocsAi tool for general responses
    const lastUserMessage = this.messages[this.messages.length - 1];
    if (!lastUserMessage || lastUserMessage.role !== "user") {
      const response = assistantMessage(
        "I couldn't find your question. Could you please ask again?"
      );
      this.messages.push(response);
      return {
        classification: "general_response",
        message: response,
      };
    }

    const aiResponse = await this.askFern({
      includeMessages: true,
      onChunk,
    });

    const response = assistantMessage(
      aiResponse || "I couldn't get a response from Fern AI. Please try again."
    );
    this.messages.push(response);

    return {
      classification: "general_response",
      message: response,
    };
  }

  // Helper methods
  private createParameterSchema(availableParameters: AvailableParameters) {
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

    return z.object(schema);
  }

  private createParametersObjectPreservingExisting(
    availableParameters: AvailableParameters,
    extractedParameters: Record<string, string>
  ): Record<string, string> {
    const completeParams: Record<string, string> = {};

    // For path parameters, use extracted value or current value or empty string
    availableParameters.pathParameters.forEach((param) => {
      const key = `path_${param.name}`;
      const extractedValue = extractedParameters[key];
      completeParams[key] =
        extractedValue && extractedValue.trim() !== ""
          ? extractedValue
          : param.currentValue || "";
    });

    // For query parameters, use extracted value or current value or empty string
    availableParameters.queryParameters.forEach((param) => {
      const key = `query_${param.name}`;
      const extractedValue = extractedParameters[key];
      completeParams[key] =
        extractedValue && extractedValue.trim() !== ""
          ? extractedValue
          : param.currentValue || "";
    });

    // For headers, use extracted value or current value or empty string
    availableParameters.headers.forEach((header) => {
      const key = `header_${header.name}`;
      const extractedValue = extractedParameters[key];
      completeParams[key] =
        extractedValue && extractedValue.trim() !== ""
          ? extractedValue
          : header.currentValue || "";
    });

    // For body properties, use extracted value or current value or empty string
    availableParameters.bodyProperties.forEach((prop) => {
      const key = `body_${prop.key}`;
      const extractedValue = extractedParameters[key];
      completeParams[key] =
        extractedValue && extractedValue.trim() !== ""
          ? extractedValue
          : prop.currentValue || "";
    });

    return completeParams;
  }

  private formatAvailableParameters(
    availableParameters: AvailableParameters
  ): string {
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

    return formatted;
  }

  /**
   * Generate a summary of API response data with optional streaming support
   *
   * @param responseData - The response data to summarize
   * @param statusCode - The HTTP status code
   * @param onChunk - Optional callback for streaming chunks (enables streaming mode)
   * @returns Promise<AssistantMessage> - The summary message
   */
  public async generateSummary(
    responseData: unknown,
    statusCode: number,
    onChunk?: (chunk: string) => void
  ): Promise<AssistantMessage> {
    if (statusCode >= 200 && statusCode < 300) {
      // SUCCESS - use streaming if onChunk is provided
      let text = "";

      if (onChunk) {
        const { textStream } = streamText({
          model: openai("gpt-4.1-mini"),
          messages: [
            systemMessage(
              "Summarize this API response in a helpful, human-readable way. Focus on the key information and results."
            ),
            userMessage(
              typeof responseData === "string"
                ? responseData
                : JSON.stringify(responseData)
            ),
          ],
        });

        for await (const textPart of textStream) {
          text += textPart;
          onChunk(textPart);
        }
      } else {
        const { text: _text } = await generateText({
          model: openai("gpt-4.1-mini"),
          messages: [
            systemMessage(
              "Summarize this API response in a helpful, human-readable way. Focus on the key information and results."
            ),
            userMessage(
              typeof responseData === "string"
                ? responseData
                : JSON.stringify(responseData)
            ),
          ],
        });
        text = _text;
      }

      const summary = assistantMessage(text);
      this.messages.push(summary);
      return summary;
    } else {
      // ERROR
      const aiResponse = await this.askFern({
        userQuery: `I received the following API error response when I made a call to the API. Explain the following in a concise, helpful way:
  ${JSON.stringify(responseData)}
  
  IMPORTANT: I am aware that you are unable to make API calls, so no need to mention that. Just focus on explaining the error in a helpful way.`,
        includeMessages: true,
        onChunk,
      });
      const summary = assistantMessage(aiResponse);
      this.messages.push(summary);
      return summary;
    }
  }

  // Reset the agent's state
  public reset(): void {
    this.messages = [];
  }

  /**
   * Parse the SSE stream response and extract human-readable text
   */
  private parseStreamResponse(streamText: string): string {
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
}

// Singleton instance for the chat agent
let singletonChatAgent: ChatAgent | null = null;

/**
 * Get the singleton ChatAgent instance.
 * This ensures only one instance exists per user session.
 */
export function getChatAgent(config?: ChatAgentConfig): ChatAgent {
  if (!singletonChatAgent) {
    singletonChatAgent = new ChatAgent(config);
  }

  return singletonChatAgent;
}

/**
 * Reset the singleton ChatAgent instance.
 * This is useful for testing or when you want to start a fresh conversation.
 */
export function resetChatAgent(): void {
  singletonChatAgent = null;
}

/**
 * Attempt to malformed JSON where multiple objects are concatenated.
 */
async function repairJsonObject({
  text,
}: Parameters<RepairTextFunction>[0]): ReturnType<RepairTextFunction> {
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
