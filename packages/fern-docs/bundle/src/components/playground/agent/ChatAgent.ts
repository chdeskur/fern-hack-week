import { createOpenAI } from "@ai-sdk/openai";
import { ToolSet, generateObject, generateText } from "ai";
import { z } from "zod";

import { ApiDefinition } from "@fern-api/fdr-sdk";

const openai = createOpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  organization: "org-EdIIJRQNvyUgF54KIY64fW9i",
});

export interface ChatMessage {
  role: "system" | "assistant" | "user";
  content: string;
}

interface SystemMessage extends ChatMessage {
  role: "system";
}

export function systemMessage(content: string): SystemMessage {
  return { role: "system", content };
}

interface AssistantMessage extends ChatMessage {
  role: "assistant";
}

export function assistantMessage(content: string): AssistantMessage {
  return { role: "assistant", content };
}

interface UserMessage extends ChatMessage {
  role: "user";
}

export function userMessage(content: string): UserMessage {
  return { role: "user", content };
}

export interface ChatAgentConfig {
  additionalTools?: ToolSet;
  initialMessages?: ChatMessage[];
  apiDefinition?: ApiDefinition.ApiDefinition;
}

export class ChatAgent {
  private readonly tools: ToolSet;
  private readonly apiDefinition?: ApiDefinition.ApiDefinition;

  public messages: ChatMessage[] = [];

  constructor(config?: ChatAgentConfig) {
    this.apiDefinition = config?.apiDefinition;
    this.tools = {
      ...this.createApiTools(),
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
        execute: async () => {
          const endpoints = Object.entries(
            this.apiDefinition?.endpoints || {}
          ).map(([id, endpoint]) => ({
            id,
            method: endpoint.method,
            path:
              endpoint.path
                ?.map((part: any) =>
                  part.type === "literal" ? part.value : `{${part.value}}`
                )
                .join("") || "",
            description: endpoint.description,
          }));
          return JSON.stringify(endpoints);
        },
      },

      getEndpointDetails: {
        description:
          "Get detailed information about a specific endpoint including parameters and request/response schemas",
        inputSchema: z.object({
          endpointId: z
            .string()
            .describe("The ID of the endpoint to get details for"),
        }),
        execute: async ({ endpointId }: { endpointId: string }) => {
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
            requestHeaders:
              endpoint.requestHeaders?.map((h: any) => ({
                key: h.key,
                description: h.description,
                type: h.valueShape?.type,
              })) || [],
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
        },
      },
    };
  }

  private get generateResponseMessages() {
    return [
      systemMessage(`[Date] ${new Date().toLocaleString()}`),
      ...this.messages,
    ];
  }

  private get generateSchemaResponsePrompt() {
    return (
      "Based on the user's latest message, generate an object that matches the schema.\n" +
      "[Messages]\n" +
      this.messages.map((msg) => JSON.stringify(msg)).join("\n")
    );
  }

  public async generateResponse(
    userMsg: UserMessage
  ): Promise<AssistantMessage> {
    this.messages.push(userMsg);
    const { text } = await generateText({
      model: openai("gpt-4.1-mini"),
      messages: this.generateResponseMessages,
      tools: this.tools,
    });

    const assistantMsg = assistantMessage(text);

    this.messages.push(assistantMsg);
    return assistantMsg;
  }

  public async generateSchemaResponse(
    userMsg: UserMessage,
    schema: z.ZodSchema
  ) {
    this.messages.push(userMsg);

    try {
      const { object } = await generateObject({
        model: openai("gpt-4.1-mini"),
        prompt: this.generateSchemaResponsePrompt,
        schema: schema,
      });

      const assistantMsg = assistantMessage(JSON.stringify(object));
      this.messages.push(assistantMsg);
      return assistantMsg;
    } catch (error) {
      console.error("Error in generateSchemaResponse:", error);
      throw error;
    }
  }

  public async generateMultiStepResponse(
    userMsg: UserMessage
  ): Promise<[AssistantMessage, endpointCallSequence: string[]]> {
    this.messages.push(userMsg);

    // STEP 1: Determine which endpoints are relevant to the user's request
    const planPrompt = systemMessage(
      `You are an API assistant that can help users make multiple sequential API calls to fulfill complex requests. 
      You have access to tools that can:
      1. List available endpoints
      2. Get detailed endpoint information
      
      When a user asks for something that might require multiple API calls, use the tools to:
      1. First explore available endpoints with listEndpoints
      2. Get details about relevant endpoints with getEndpointDetails
      3. Determine which endpoints are relevant to the user's request. Prefer fewer endpoints over more endpoints.
      4. Create a plan for a sequence of API calls to fulfill the user's request.
      5. If there is not enough information to create a plan, prompt the user for more information.`
    );

    const { text: plan } = await generateText({
      model: openai("gpt-4.1-mini"),
      messages: [planPrompt, ...this.generateResponseMessages],
      tools: this.tools,
    });

    this.messages.push(assistantMessage(plan));

    // STEP 2: Determine if there is sufficient information to make the API call(s)
    const sufficientInfoPrompt = systemMessage(
      `Determine if there is sufficient information to make the API call(s).
      Pay particular attention to whether the user has provided all the required parameters for each endpoint.
      If there is, return an array of the endpoint IDs that are needed to execute the plan in order of execution.
      If there is not, just return an empty array.`
    );

    const { object: endpointCallSequence } = await generateObject({
      model: openai("gpt-4.1-mini"),
      prompt: [sufficientInfoPrompt, ...this.generateResponseMessages].join(
        "\n"
      ),
      schema: z.array(z.string()),
    });

    if (endpointCallSequence.length === 0) {
      const missingInfoPrompt = systemMessage(
        `The user has provided a plan for a sequence of API calls to fulfill the user's request, but there is not enough information to make the API call(s).
        Ask the user for the missing information.`
      );

      const { text: missingInfo } = await generateText({
        model: openai("gpt-4.1-mini"),
        messages: [missingInfoPrompt, ...this.generateResponseMessages],
        tools: this.tools,
      });
      this.messages.push(assistantMessage(missingInfo));
      return [assistantMessage(missingInfo), endpointCallSequence];
    }
    return [assistantMessage(plan), endpointCallSequence];
  }

  public async generateParameterSettingResponse(
    userMsg: UserMessage,
    missingValues: {
      missingPathParameters: string[];
      missingQueryParameters: string[];
      missingHeaders: string[];
      missingBodyProperties: {
        key: string;
        type: string;
        description?: string;
        path: string[];
      }[];
    }
  ) {
    this.messages.push(userMsg);

    // Create a schema for the missing values
    const parameterSchema: Record<string, z.ZodString> = {};

    missingValues.missingPathParameters.forEach((param) => {
      parameterSchema[`path_${param}`] = z.string();
    });

    missingValues.missingQueryParameters.forEach((param) => {
      parameterSchema[`query_${param}`] = z.string();
    });

    missingValues.missingHeaders.forEach((header) => {
      parameterSchema[`header_${header}`] = z.string();
    });

    missingValues.missingBodyProperties.forEach((prop) => {
      parameterSchema[`body_${prop.key}`] = z.string();
    });

    const schema = z.object(parameterSchema);

    const prompt =
      "The user is providing values for missing required parameters. " +
      "Extract the parameter values from their message and return them in the correct format.\n\n" +
      "Available parameters to set:\n" +
      Object.keys(parameterSchema)
        .map((key) => `- ${key}`)
        .join("\n") +
      "\n\n" +
      "User message: " +
      userMsg.content +
      "\n\n" +
      "If the user's message doesn't contain values for the required parameters, return an empty object {}.";

    try {
      const { object } = await generateObject({
        model: openai("gpt-4.1-mini"),
        prompt: prompt,
        schema: schema,
      });

      const assistantMsg = assistantMessage(JSON.stringify(object));
      this.messages.push(assistantMsg);
      return assistantMsg;
    } catch (error) {
      // If the AI fails to extract parameters, return an empty response
      console.warn("Failed to extract parameters from user message:", error);
      const assistantMsg = assistantMessage("{}");
      this.messages.push(assistantMsg);
      return assistantMsg;
    }
  }

  public async generateSummary(assistantMsg: AssistantMessage) {
    const { text } = await generateText({
      model: openai("gpt-4.1-mini"),
      messages: [
        systemMessage(
          "Given this JSON object, summarize its contents. If there are multiple items, summarize each item."
        ),
        assistantMsg,
      ],
    });
    return assistantMessage(text);
  }
}

// Singleton instance for the chat agent
let singletonChatAgent: ChatAgent | null = null;

/**
 * Get the singleton ChatAgent instance.
 * This ensures only one instance exists per user session.
 */
export function getChatAgent(): ChatAgent {
  if (!singletonChatAgent) {
    singletonChatAgent = new ChatAgent();
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
