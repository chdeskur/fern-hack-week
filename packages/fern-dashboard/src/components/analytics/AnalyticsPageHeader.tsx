import { Button } from "../ui/button";
import CircularGauge from "./CircularGauge";

const MOCK_PERCENTAGE = 22;

function getBillingPeriod() {
  const now = new Date();
  const oneYearAgo = new Date(now);
  oneYearAgo.setFullYear(now.getFullYear() - 1);
  return `${oneYearAgo.toLocaleDateString()} - ${now.toLocaleDateString()}`;
}

export function AnalyticsPageHeader() {
  // TODO(eden): Use the actual fai usage data.
  return (
    <div className="flex w-full justify-start">
      <CircularGauge percentage={MOCK_PERCENTAGE} />
      <div className="flex w-full items-center justify-between pl-4">
        <div className="flex flex-col items-center">
          <span className="text-radix-gray-9">Number of total queries</span>
          <span className="text-radix-gray-9 text-lg font-semibold">
            24,590 / 50,000
          </span>
        </div>
        <div className="flex flex-col items-end gap-2">
          <span className="text-radix-gray-9">
            Billing Period: {getBillingPeriod()}
          </span>
          <div className="group relative inline-block">
            <Button
              asChild
              className="relative min-w-40 rounded-md border border-gray-500 bg-transparent text-black"
            >
              <a className="block rounded-md bg-white px-4 py-2 transition-colors group-hover:bg-transparent">
                Get More Queries
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
