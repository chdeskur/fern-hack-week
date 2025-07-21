import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Table } from "@tanstack/react-table";
import { MessageSquare } from "lucide-react";

import { Input } from "@/components/ui/input";

import { ExportButton } from "./ExportButton";
import { TimeRangeOption, TimeRangeSelect } from "./TimeRangeSelect";
import { TimeRange } from "./utils/get-request-params";

const QUERIES_TIME_RANGE_OPTIONS: TimeRangeOption[] = [
  { label: "Last Week", value: TimeRange.LAST_WEEK },
  { label: "Last Month", value: TimeRange.LAST_MONTH },
  { label: "Last Year", value: TimeRange.LAST_YEAR },
  { label: "All Data", value: TimeRange.ALL },
];

interface QueriesDataTableHeaderProps<TData> {
  table: Table<TData>;
  queryTimeRange: TimeRange;
  setQueryTimeRange: (range: TimeRange) => void;
  onExport: () => void;
  isExporting?: boolean;
}

export function QueriesDataTableHeader<TData>({
  table,
  queryTimeRange,
  setQueryTimeRange,
  onExport,
  isExporting,
}: QueriesDataTableHeaderProps<TData>) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <MessageSquare className="h-4 w-4" />
        <span>Conversations</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="relative">
          <MagnifyingGlassIcon className="text-radix-gray-9 absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
          <Input
            placeholder="Search..."
            value={(table.getColumn("query")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("query")?.setFilterValue(event.target.value)
            }
            className="text-radix-gray-9 placeholder:text-radix-gray-9 h-9 max-w-sm rounded-full pl-9"
            autoFocus
          />
        </div>
        <TimeRangeSelect
          value={queryTimeRange}
          onChange={setQueryTimeRange}
          options={QUERIES_TIME_RANGE_OPTIONS}
        />
        <ExportButton onClick={onExport} isLoading={isExporting} />
      </div>
    </div>
  );
}
