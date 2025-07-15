import { FernFai } from "@fern-api/fai-sdk";

export enum TimeRange {
  LAST_WEEK = "LAST_WEEK",
  LAST_MONTH = "LAST_MONTH",
}

const getToday = (): string => {
  const date = new Date();
  return date.toISOString();
};

const getLastWeekStart = (): string => {
  const date = new Date();
  date.setDate(date.getDate() - 7);
  return date.toISOString();
};

const getLastMonthStart = (): string => {
  const date = new Date();
  date.setMonth(date.getMonth() - 1);
  date.setDate(1);
  return date.toISOString();
};

export const getRequestParams = (
  timeRange: TimeRange
): FernFai.GetHistogramAnalyticsRequest => {
  const endDate = getToday();

  switch (timeRange) {
    case TimeRange.LAST_WEEK:
      return {
        start_date: getLastWeekStart(),
        end_date: endDate,
        groupBy: "DAY",
      };

    case TimeRange.LAST_MONTH:
      return {
        start_date: getLastMonthStart(),
        end_date: endDate,
        groupBy: "WEEK",
      };
  }
};
