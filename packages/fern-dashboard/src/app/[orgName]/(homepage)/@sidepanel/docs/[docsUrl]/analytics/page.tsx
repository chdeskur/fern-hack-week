"use client";

import { useSidepanel } from "@/components/layout/SidepanelContext";

export default function AnalyticsSidepanel() {
  const { content } = useSidepanel();

  return (
    <div
      className={`border-border overflow-y-auto border-x border-t bg-white transition-all duration-500 ease-out md:mr-4 md:rounded-t-2xl dark:bg-black ${content ? "w-[480px] px-6 pt-8 opacity-100 lg:px-12 lg:pt-12" : "w-0 px-0 pt-0 opacity-0 lg:px-0 lg:pt-0"} `}
    >
      {content}
    </div>
  );
}
