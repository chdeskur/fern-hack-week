"use client";

import { useEffect, useState } from "react";

import { FernFai } from "@fern-api/fai-sdk";

import { getDomainAnalytics } from "@/app/actions/getAnalytics";
import { getQueries } from "@/app/actions/getQueries";
import { Pagination } from "@/components/ui/pagination";
import { cn } from "@/utils/utils";

import { AnalyticsHistogram } from "./AnalyticsHistogram";
import { TimeRangeSelect } from "./AnalyticsHistogramRangeSelector";
import { AnalyticsHistogramTabBar } from "./AnalyticsHistogramTabBar";
import { AnalyticsPageHeader } from "./AnalyticsPageHeader";
import { ConversationSidePanel } from "./ConversationSidePanel";
import { QueriesTable } from "./QueriesTable";
import { TimeRange } from "./get-request-params";

export type RenderType = "QUERIES" | "CONVERSATIONS";

const borderStyles = "mb-4 flex w-full flex-col items-center rounded-2xl p-4";

const ITEMS_PER_PAGE = 10;

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

  const totalPages = Math.ceil(initialTotalQueries / ITEMS_PER_PAGE);

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
            onSelectConversation={setSelectedConversation}
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
