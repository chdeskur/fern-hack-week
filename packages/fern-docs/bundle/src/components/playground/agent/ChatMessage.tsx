import { Bot, User } from "lucide-react";

import { FernTooltip } from "@fern-docs/components";
import { FernCard } from "@fern-docs/components";
import { mdxToHtml } from "@fern-docs/mdx";
import { useCopyToClipboard } from "@fern-ui/react-commons";

import { ChatMessage } from "./ChatAgent";

// Separate component for chat message with copy functionality
export function ChatMessageComponent({ message }: { message: ChatMessage }) {
  const { copyToClipboard, wasJustCopied } = useCopyToClipboard(
    message.content
  );

  return (
    <div
      className={`flex gap-3 ${
        message.role === "user" ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`flex max-w-[80%] gap-3 ${
          message.role === "user" ? "flex-row-reverse" : "flex-row"
        }`}
      >
        <div
          className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full ${
            message.role === "user"
              ? "bg-(color:--accent) text-(color:--accent-contrast)"
              : "bg-(color:--grayscale-a3) text-(color:--grayscale-a11)"
          }`}
        >
          {message.role === "user" ? (
            <User className="h-4 w-4" />
          ) : (
            <Bot className="h-4 w-4" />
          )}
        </div>
        <FernTooltip
          content={wasJustCopied ? "Copied!" : "Click to copy"}
          open={wasJustCopied ? true : undefined}
        >
          <FernCard
            className={`rounded-2 w-full cursor-pointer px-3 py-2 text-sm transition-colors ${
              message.role === "user"
                ? "bg-(color:--accent) text-(color:--accent-contrast) hover:bg-accent/90"
                : "bg-card-background border-border-default border hover:bg-black/5"
            }`}
            onClick={() => {
              // don't copy if user is selecting text
              const selection = window.getSelection();
              if (selection && selection.toString().length > 0) {
                return;
              }
              void copyToClipboard?.();
            }}
          >
            <div
              className="select-text whitespace-pre-wrap"
              dangerouslySetInnerHTML={{
                __html: mdxToHtml(
                  message.content.includes("{")
                    ? `\`\`\`json\n${message.content}\n\`\`\``
                    : message.content
                ).html,
              }}
            />
          </FernCard>
        </FernTooltip>
      </div>
    </div>
  );
}
