import "server-only";

import * as Tabs from "@radix-ui/react-tabs";
import { Lock } from "lucide-react";

import { TabChild, hasRedirect } from "@fern-api/fdr-sdk/navigation";
import { cn } from "@fern-docs/components";
import { slugToHref } from "@fern-docs/utils";

import { FernLinkTab } from "../FernLinkTab";
import { processIcon } from "../util/processIcon";

export function HeaderTabsList({
  tabs,
  children,
}: {
  tabs: readonly TabChild[];
  children?: React.ReactNode;
}) {
  return (
    <Tabs.TabsList>
      {tabs.map((tab) => (
        <Tabs.TabsTrigger key={tab.id} value={tab.id} asChild>
          <FernLinkTab
            className={cn({ "opacity-50": tab.type !== "link" && tab.hidden })}
            href={
              tab.type === "link"
                ? tab.url
                : slugToHref(hasRedirect(tab) ? tab.pointsTo : tab.slug)
            }
            scroll={true}
            id={tab.id}
          >
            {tab.type !== "link" && tab.authed ? <Lock /> : processIcon(tab)}
            <span className="truncate">{tab.title}</span>
          </FernLinkTab>
        </Tabs.TabsTrigger>
      ))}
      {children}
    </Tabs.TabsList>
  );
}
