"use client";

import { useEffect, useState } from "react";

import { FernFai } from "@fern-api/fai-sdk";

import { getDomainAnalytics } from "@/app/actions/getAnalytics";
import { cn } from "@/utils/utils";

import { AnalyticsHistogram } from "./AnalyticsHistogram";
import { TimeRangeSelect } from "./AnalyticsHistogramRangeSelector";
import { AnalyticsHistogramTabBar } from "./AnalyticsHistogramTabBar";
import { AnalyticsPageHeader } from "./AnalyticsPageHeader";
import { ConversationSidePanel } from "./ConversationSidePanel";
import { QueriesTable } from "./QueriesTable";
import { TimeRange } from "./get-request-params";

export type RenderType = "QUERIES" | "CONVERSATIONS";

const borderStyles =
  "border-gray-0 mb-4 flex w-full flex-col items-center rounded-2xl border p-4";

export function AnalyticsPageClient({
  baseDocsUrl,
  initialQueriesData,
  initialHistogramData,
}: {
  baseDocsUrl: string;
  initialQueriesData: FernFai.Query[];
  initialHistogramData: FernFai.HistogramAnalytics;
}) {
  const [renderType, setRenderType] = useState<RenderType>("QUERIES");
  const [timeRange, setTimeRange] = useState<TimeRange>(TimeRange.LAST_WEEK);
  const [histogramData, setHistogramData] = useState(initialHistogramData);
  const [selectedConversation, setSelectedConversation] =
    useState<FernFai.Conversation | null>(null);

  useEffect(() => {
    async function fetchHistogramData() {
      try {
        const data = await getDomainAnalytics({
          docsUrl: baseDocsUrl,
          timeRange,
        });
        setHistogramData(data);
      } catch (error) {
        console.error("Failed to fetch histogram data:", error);
      }
    }

    void fetchHistogramData();
  }, [baseDocsUrl, timeRange]);

  const chartConfig = {
    queries: {
      label: "Queries",
      color: "var(--chart-1)",
    },
  };

  const chartData = histogramData.bars.map((bar) => ({
    label: bar.label,
    count: renderType === "QUERIES" ? bar.queryCount : bar.conversationCount,
  }));

  return (
    <div className="flex w-full flex-row gap-4 p-4">
      <div
        className={cn(
          "flex min-w-0 flex-col items-center transition-[flex] duration-500 ease-out",
          selectedConversation ? "flex-[2]" : "flex-1"
        )}
      >
        <div className={cn(borderStyles, "w-full")}>
          <AnalyticsPageHeader />
        </div>
        <div className={cn(borderStyles, "w-full")}>
          <div className="border-gray-0 mb-4 flex w-full justify-between border-b">
            <AnalyticsHistogramTabBar
              renderType={renderType}
              onChangeRenderType={setRenderType}
            />
            <TimeRangeSelect value={timeRange} onChange={setTimeRange} />
          </div>
          <AnalyticsHistogram
            chartData={chartData}
            renderType={renderType}
            chartConfig={chartConfig}
          />
        </div>
        <div className={cn(borderStyles, "w-full")}>
          <QueriesTable
            queries={initialQueriesData}
            baseDocsUrl={baseDocsUrl}
            onSelectConversation={setSelectedConversation}
            selectedConversation={selectedConversation}
          />
        </div>
      </div>

      <div
        className={cn(
          "flex-shrink-0 overflow-hidden transition-[width,opacity] duration-500 ease-out",
          selectedConversation ? "w-80 opacity-100" : "w-0 opacity-0"
        )}
      >
        {selectedConversation && (
          <div className={cn(borderStyles, "h-full w-80")}>
            <ConversationSidePanel
              conversation={selectedConversation}
              onClose={() => setSelectedConversation(null)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
