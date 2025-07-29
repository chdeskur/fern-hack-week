import { createOpenAI } from "@ai-sdk/openai";
import { ToolSet, generateObject, generateText } from "ai";
import { z } from "zod";

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

const defaultTools: ToolSet = {};

export interface ChatAgentConfig {
  additionalTools?: ToolSet;
  initialMessages?: ChatMessage[];
}

export class ChatAgent {
  private readonly tools: ToolSet;

  public messages: ChatMessage[] = [];

  constructor(config?: ChatAgentConfig) {
    this.tools = {
      ...defaultTools,
      ...(config?.additionalTools ?? {}),
    };
    this.messages = config?.initialMessages ?? [];
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
