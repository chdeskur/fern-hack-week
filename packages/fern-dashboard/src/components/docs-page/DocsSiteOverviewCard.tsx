"use client";

import { getLoadableValue } from "@fern-ui/loadable";

import { useDocsSite } from "@/state/useMyDocsSites";
import { DocsUrl } from "@/utils/types";

import { DocsSiteInfo } from "./DocsSiteInfo";
import { DocsSiteImage } from "./docs-site-image/DocsSiteImage";
import { SkeletonDocsSiteImage } from "./docs-site-image/SkeletonDocsSiteImage";

export declare namespace DocsSiteOverviewCard {
  export interface Props {
    docsUrl: DocsUrl;
  }
}

export function DocsSiteOverviewCard({ docsUrl }: DocsSiteOverviewCard.Props) {
  const docsSite = getLoadableValue(useDocsSite(docsUrl));

  return (
    <div className="border-border flex min-w-0 flex-1 flex-col gap-6 rounded-xl border bg-gray-100 p-3 sm:p-4 md:flex-row md:p-5 lg:p-6">
      {docsSite != null ? (
        <DocsSiteImage docsSite={docsSite} />
      ) : (
        <SkeletonDocsSiteImage />
      )}
      {docsSite != null && <DocsSiteInfo docsSite={docsSite} />}
    </div>
  );
}
