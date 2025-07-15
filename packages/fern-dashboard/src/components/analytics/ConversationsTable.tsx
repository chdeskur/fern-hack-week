"use client";

import { FernFai } from "@fern-api/fai-sdk";

import { ConversationsDataTable, columns } from "./ConversationsDataTable";

export function ConversationsTable({
  conversations,
}: {
  conversations: FernFai.Conversation[];
}) {
  return (
    <div>
      <ConversationsDataTable columns={columns} data={conversations} />
    </div>
  );
}
