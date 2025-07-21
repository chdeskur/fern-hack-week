"use client";

import { useEffect, useState } from "react";

import { FernFai } from "@fern-api/fai-sdk";

import { getDomainAnalytics } from "@/app/actions/getAnalytics";
import { getQueries } from "@/app/actions/getQueries";
import { useSidepanel } from "@/components/layout/SidepanelContext";
import { Pagination } from "@/components/ui/pagination";
import { cn } from "@/utils/utils";

import { AnalyticsHistogram } from "./AnalyticsHistogram";
import { AnalyticsHistogramTabBar } from "./AnalyticsHistogramTabBar";
import { ITEMS_PER_PAGE } from "./AnalyticsPage";
import { AnalyticsPageHeader } from "./AnalyticsPageHeader";
import { ConversationSidePanel } from "./ConversationSidePanel";
import { QueriesTable } from "./QueriesTable";
import { TimeRangeSelect } from "./TimeRangeSelect";
import { TimeRange } from "./utils/get-request-params";
import { parseLabel } from "./utils/parse-label";

export type RenderType = "QUERIES" | "CONVERSATIONS";

const borderStyles = "mb-4 flex w-full flex-col items-center rounded-2xl p-4";

export function AnalyticsPageClient({
  baseDocsUrl,
  initialQueriesData,
  initialHistogramData,
  initialTotalQueries,
  cutoffTime,
}: {
  baseDocsUrl: string;
  initialQueriesData: FernFai.Query[];
  initialHistogramData: FernFai.HistogramAnalytics;
  initialTotalQueries: number;
  cutoffTime: string;
}) {
  const [renderType, setRenderType] = useState<RenderType>("QUERIES");
  const [timeRange, setTimeRange] = useState<TimeRange>(TimeRange.LAST_WEEK);
  const [histogramData, setHistogramData] = useState(initialHistogramData);
  const [queriesData, setQueriesData] = useState(initialQueriesData);
  const [selectedConversation, setSelectedConversation] =
    useState<FernFai.Conversation | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [pageCache, setPageCache] = useState<Record<number, FernFai.Query[]>>(
    {}
  );
  const { setContent, clear } = useSidepanel();
  const totalPages = Math.ceil(initialTotalQueries / ITEMS_PER_PAGE);

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

  useEffect(() => {
    setPageCache({});
  }, [timeRange, cutoffTime]);

  useEffect(() => {
    async function fetchQueriesData() {
      const cachedData = pageCache[currentPage];
      if (cachedData) {
        setQueriesData(cachedData);
        return;
      }

      setIsLoading(true);
      try {
        const response = await getQueries({
          domain: baseDocsUrl,
          page: currentPage,
          limit: ITEMS_PER_PAGE,
          cutoffTime,
        });

        setPageCache((prev) => ({
          ...prev,
          [currentPage]: response.queries,
        }));

        setQueriesData(response.queries);
      } catch (error) {
        console.error("Failed to fetch queries data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    void fetchQueriesData();
  }, [baseDocsUrl, currentPage, timeRange, cutoffTime, pageCache]);

  function handleSelectConversation(convo: FernFai.Conversation | null) {
    if (convo) {
      setSelectedConversation(convo);
      setContent(
        <ConversationSidePanel
          conversation={convo}
          onClose={() => {
            clear();
            setSelectedConversation(null);
          }}
        />
      );
    } else {
      setSelectedConversation(null);
      clear();
    }
  }

  const chartConfig = {
    queries: {
      label: "Queries",
      color: "var(--chart-1)",
    },
  };

  const chartData = histogramData.bars.map((bar) => ({
    displayLabel: parseLabel(bar.label),
    count: renderType === "QUERIES" ? bar.queryCount : bar.conversationCount,
  }));

  return (
    <div
      className={
        "flex min-w-0 flex-1 flex-col items-center transition-[flex] duration-500 ease-out"
      }
    >
      <div className={cn(borderStyles, "w-full")}>
        <AnalyticsPageHeader />
      </div>
      <div className={cn(borderStyles, "border-gray-0 w-full border")}>
        <div className="mb-4 flex w-full justify-between gap-4">
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
      <div className={cn(borderStyles, "border-gray-0 w-full border")}>
        <QueriesTable
          queries={queriesData}
          baseDocsUrl={baseDocsUrl}
          onSelectConversation={handleSelectConversation}
          selectedConversation={selectedConversation}
        />
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
