"use client";

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

interface AnalyticsHistogramProps {
  chartData: {
    label: string;
    queryCount: number;
  }[];
  chartConfig: {
    queries: {
      label: string;
      color: string;
    };
  };
}

export function AnalyticsHistogram({
  chartData,
  chartConfig,
}: AnalyticsHistogramProps) {
  return (
    <div
      style={{ width: "80%", height: "auto", minWidth: "0", minHeight: "0" }}
    >
      <ChartContainer config={chartConfig}>
        <ResponsiveContainer>
          <BarChart data={chartData}>
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip content={<ChartTooltipContent />} />
            <Bar dataKey="queryCount" name="Queries" />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
}
