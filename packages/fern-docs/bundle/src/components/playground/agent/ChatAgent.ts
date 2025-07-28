import { createOpenAI } from "@ai-sdk/openai";
import { ToolSet, generateObject, generateText } from "ai";
import { z } from "zod";

import { mdxToHtml } from "@fern-docs/mdx";

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

    // Convert markdown to HTML
    const { html } = mdxToHtml(text);

    const assistantMsg = assistantMessage(html ?? text);
    this.messages.push(assistantMsg);
    return assistantMsg;
  }

  public async generateSchemaResponse(
    userMsg: UserMessage,
    schema: z.ZodSchema
  ) {
    this.messages.push(userMsg);
    const { object } = await generateObject({
      model: openai("gpt-4.1-mini"),
      prompt: this.generateSchemaResponsePrompt,
      schema: schema,
    });
    this.messages.push(assistantMessage(JSON.stringify(object)));
    return object;
  }
}
