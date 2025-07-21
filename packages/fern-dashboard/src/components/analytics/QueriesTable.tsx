"use client";

import { FernFai } from "@fern-api/fai-sdk";

import { cn } from "@/utils/utils";

import { Pagination } from "../ui/pagination";
import { BORDER_STYLES } from "./AnalyticsPageClient";
import { columns } from "./ConversationColumnDef";
import { QueriesDataTable } from "./QueriesDataTable";
import { TimeRange } from "./utils/get-request-params";

export function QueriesTable({
  queries,
  baseDocsUrl,
  onSelectConversation,
  selectedConversation,
  totalPages,
  currentPage,
  setCurrentPage,
  isLoading,
  queryTimeRange,
  setQueryTimeRange,
}: {
  queries: FernFai.Query[];
  baseDocsUrl: string;
  onSelectConversation: (conversation: FernFai.Conversation) => void;
  selectedConversation: FernFai.Conversation | null;
  totalPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  isLoading: boolean;
  queryTimeRange: TimeRange;
  setQueryTimeRange: (range: TimeRange) => void;
}) {
  return (
    <div className={cn(BORDER_STYLES, "border-gray-0 w-full border")}>
      <QueriesDataTable
        columns={columns}
        data={queries}
        baseDocsUrl={baseDocsUrl}
        onSelectConversation={onSelectConversation}
        selectedConversation={selectedConversation}
        queryTimeRange={queryTimeRange}
        setQueryTimeRange={setQueryTimeRange}
      />
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        isLoading={isLoading}
      />
    </div>
  );
}
