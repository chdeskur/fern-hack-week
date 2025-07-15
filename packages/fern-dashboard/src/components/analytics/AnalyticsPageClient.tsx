"use client";

import { useEffect, useState } from "react";

import { FernFai } from "@fern-api/fai-sdk";

import { getDomainAnalytics } from "@/app/actions/getAnalytics";

import { AnalyticsHistogram } from "./AnalyticsHistogram";
import { TimeRangeSelect } from "./AnalyticsHistogramRangeSelector";
import { AnalyticsHistogramTabBar } from "./AnalyticsHistogramTabBar";
import { ConversationsTable } from "./ConversationsTable";
import { TimeRange } from "./get-request-params";

export type RenderType = "QUESTIONS" | "CONVERSATIONS";

export function AnalyticsPageClient({
  baseDocsUrl,
  initialConversationsData,
  initialHistogramData,
}: {
  baseDocsUrl: string;
  initialConversationsData: FernFai.Conversation[];
  initialHistogramData: FernFai.HistogramAnalytics;
}) {
  const [renderType, setRenderType] = useState<RenderType>("QUESTIONS");
  const [timeRange, setTimeRange] = useState<TimeRange>(TimeRange.LAST_WEEK);
  const [histogramData, setHistogramData] = useState(initialHistogramData);

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
    count: renderType === "QUESTIONS" ? bar.queryCount : bar.conversationCount,
  }));

  return (
    <div className="flex w-full flex-col items-center p-4">
      <div className="border-gray-0 mb-4 flex w-4/5 flex-col items-center rounded-2xl border p-4">
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
      <div className="border-gray-0 flex w-4/5 flex-col items-center rounded-2xl border p-4">
        <ConversationsTable conversations={initialConversationsData} />
      </div>
    </div>
  );
}
