import { ToolInvocation } from "ai";
import { Message } from "ai/react";
import { z } from "zod";

import { isNonNullish } from "@fern-api/ui-core-utils";

import { AlgoliaRecordHit } from "../../types";

const SearchResult = z.object({
  title: z.string(),
  url: z.string(),
  icon: z.string().optional(),
  type: z.string(),
  api_type: z.string().optional(),
});

export type SearchResult = z.infer<typeof SearchResult>;

export interface SqueezedMessage {
  user?: {
    id: string;
    createdAt?: Date;
    content: string;
  };
  assistant?: {
    id: string;
    createdAt?: Date;
    content: string;
  };
  toolInvocations?: ToolInvocation[];
}

// this is necessary to fix the discrepancy between claude 3.5 and 3.7
// claude 3.5 automatically adds new lines after tool invocations, specifically
// after the messages that say `Let me search for that...`
// claude 3.7 does not do this, which creates bad formatting in the UI
// this function ensures that message parts have new lines.
// hopefully this is a temporary fix that can be removed with better model behavior
export function ensureMessagePartsHaveNewLines(messages: Message[]): Message[] {
  return messages.map((message) => {
    if (message.role === "assistant") {
      let step = 0;
      if (message.parts) {
        message.parts = message.parts.map((part) => {
          if (part.type === "step-start") {
            step++;
            return part;
          } else if (part.type === "text") {
            if (step > 1) {
              if (!part.text.startsWith("\n")) {
                part.text = "\n\n" + part.text;
                return part;
              } else {
                return part;
              }
            }
          }
          return part;
        });
        message.content = message.parts
          .filter((part) => part.type === "text")
          .map((part) => part.text)
          .join("");
      }
      return message;
    } else {
      return message;
    }
  });
}

export function squeezeMessages(messages: Message[]): SqueezedMessage[] {
  const squeezed: SqueezedMessage[] = [];

  for (const message of messages) {
    let lastMessage = squeezed[squeezed.length - 1];

    if (message.role === "user") {
      squeezed.push({
        user: {
          id: message.id,
          createdAt: message.createdAt,
          content: message.content,
        },
        toolInvocations: message.toolInvocations,
      });
    } else if (message.role === "assistant") {
      if (lastMessage == null) {
        const newMessage: SqueezedMessage = {};
        lastMessage = newMessage;
        squeezed.push(newMessage);
      }

      lastMessage.assistant ??= {
        id: message.id,
        createdAt: message.createdAt,
        content: "",
      };

      lastMessage.assistant.content = [
        lastMessage.assistant.content,
        message.content,
      ]
        .filter((content) => content.trimStart().length > 0)
        .join("\n\n");

      lastMessage.toolInvocations = [
        ...(lastMessage.toolInvocations ?? []),
        ...(message.toolInvocations ?? []),
      ];
    }
  }

  return squeezed;
}

export function combineSearchResults(
  messages: SqueezedMessage[]
): AlgoliaRecordHit[] {
  return (
    messages
      .flatMap((message) => message.toolInvocations ?? [])
      .flatMap((invocation) =>
        invocation.state === "result" &&
        invocation.toolName === "search" &&
        Array.isArray(invocation.result)
          ? invocation.result
          : []
      )
      // .map((result) => SearchResult.safeParse(result).data)
      .filter(isNonNullish)
  );
}
