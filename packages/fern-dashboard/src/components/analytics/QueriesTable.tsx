"use client";

import { FernFai } from "@fern-api/fai-sdk";

import { QueriesDataTable, columns } from "./QueriesDataTable";

export function QueriesTable({
  queries,
  baseDocsUrl,
  onSelectConversation,
  selectedConversation,
}: {
  queries: FernFai.Query[];
  baseDocsUrl: string;
  onSelectConversation: (conversation: FernFai.Conversation) => void;
  selectedConversation: FernFai.Conversation | null;
}) {
  return (
    <div>
      <QueriesDataTable
        columns={columns}
        data={queries}
        baseDocsUrl={baseDocsUrl}
        onSelectConversation={onSelectConversation}
        selectedConversation={selectedConversation}
      />
    </div>
  );
}
