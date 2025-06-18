"use client";

import * as Tabs from "@radix-ui/react-tabs";

import { cn } from "../cn";
import { useCurrentTabId } from "../state/navigation";

export function SidebarTabsRoot({
  children,
  mobileOnly,
}: {
  children: React.ReactNode;
  mobileOnly?: boolean;
}) {
  const currentTabId = useCurrentTabId();
  return (
    <Tabs.Root
      value={currentTabId}
      className={cn({
        "lg:hidden": mobileOnly,
      })}
    >
      {children}
    </Tabs.Root>
  );
}
