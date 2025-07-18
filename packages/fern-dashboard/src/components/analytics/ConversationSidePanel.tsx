import { ChatBubbleLeftEllipsisIcon } from "@heroicons/react/24/outline";
import { Sparkles, X } from "lucide-react";

import { FernFai } from "@fern-api/fai-sdk";
import { FootnoteSup } from "@fern-docs/search-ui/components/chatbot/footnote";
import { ChatbotTurnContextProvider } from "@fern-docs/search-ui/components/chatbot/turn-context";
import { MarkdownContent } from "@fern-docs/search-ui/components/md-content";

interface ConversationSidePanelProps {
  conversation: FernFai.Conversation;
  onClose: () => void;
}
export function ConversationSidePanel({
  conversation,
  onClose,
}: ConversationSidePanelProps) {
  return (
    <div className="flex w-full max-w-lg flex-col">
      <div className="flex items-center justify-between border-b px-4 py-6">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 items-center justify-center">
            <ChatBubbleLeftEllipsisIcon className="h-6 w-6" />
          </div>
          <div className="flex flex-col gap-1">
            <h2 className="text-lg font-semibold">Conversation</h2>
            <div className="text-sm text-gray-700">
              {new Date(conversation.created_at).toLocaleString()}
            </div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="rounded-md p-1 text-gray-600 hover:cursor-pointer hover:text-gray-900"
        >
          <X className="h-6 w-6" />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        {conversation.turns.map((message) => {
          return (
            <ChatbotTurnContextProvider key={message.created_at}>
              <article>
                {message.role === "USER" && (
                  <div className="relative mb-2 ml-auto w-fit max-w-[70%] whitespace-pre-wrap rounded-md bg-gray-300 px-5 py-2">
                    <section className="prose cursor-auto text-sm">
                      <MarkdownContent>{message.text}</MarkdownContent>
                    </section>
                  </div>
                )}
                <div className="flex items-start justify-start gap-4">
                  {message.role !== "USER" && (
                    <Sparkles className="my-1 size-4 shrink-0" />
                  )}
                  <section className="prose min-w-0 flex-1 shrink cursor-text text-sm">
                    {message.role !== "USER" && (
                      <MarkdownContent
                        components={{
                          // ...components,
                          sup: FootnoteSup,
                          section: ({
                            children,
                            ...props
                          }: React.ComponentProps<"section">) => {
                            return <section {...props}>{children}</section>;
                          },
                        }}
                        plugins={["remarkGfm", "remarkTest"]}
                      >
                        {message.text}
                      </MarkdownContent>
                    )}
                  </section>
                </div>
              </article>
            </ChatbotTurnContextProvider>
          );
        })}
      </div>
    </div>
  );
}
