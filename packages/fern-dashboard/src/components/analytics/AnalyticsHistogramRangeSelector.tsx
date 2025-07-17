"use client";

import { useState } from "react";

import { CalendarDaysIcon } from "@heroicons/react/24/outline";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { TimeRange } from "./get-request-params";

export interface TimeRangeSelectProps {
  value?: TimeRange;
  onChange?: (value: TimeRange) => void;
}

const TIME_RANGE_LABELS: Record<TimeRange, string> = {
  LAST_WEEK: "Last Week",
  LAST_MONTH: "Last Month",
  LAST_YEAR: "Last Year",
};

export const TimeRangeSelect = ({ value, onChange }: TimeRangeSelectProps) => {
  const [selected, setSelected] = useState<TimeRange>(
    value || TimeRange.LAST_WEEK
  );

  const handleChange = (val: string) => {
    const newValue = val as TimeRange;
    setSelected(newValue);
    onChange?.(newValue);
  };

  return (
    <Select value={selected} onValueChange={handleChange}>
      <SelectTrigger className="flex min-w-[140px] items-center gap-1 px-2">
        <CalendarDaysIcon className="h-4 w-4" />
        <SelectValue placeholder="Select Time Range" />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(TIME_RANGE_LABELS).map(([value, label]) => (
          <SelectItem key={value} value={value}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
