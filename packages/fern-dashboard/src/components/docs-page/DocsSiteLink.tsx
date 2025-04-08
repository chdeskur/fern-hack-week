"use client";

import { useState } from "react";

import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";

import { FdrAPI } from "@fern-api/fdr-sdk";

import { cn } from "@/utils/utils";

export declare namespace DocsSiteLink {
  export interface Props {
    docsSiteUrl: FdrAPI.dashboard.DocsSiteUrl;
  }
}

export function DocsSiteLink({ docsSiteUrl }: DocsSiteLink.Props) {
  const { domain, path } = docsSiteUrl;

  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="w-full">
      <a
        href={new URL(path ?? "", `https://${domain}`).toString()}
        target="_blank"
        className="text-gray-1100 hover:border-b-gray-1100 inline-flex min-w-0 max-w-full items-center gap-1 whitespace-nowrap border-b border-b-transparent"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <span className="truncate">
          {domain}
          {path}
        </span>
        <ArrowTopRightOnSquareIcon
          className={cn("size-4 shrink-0", !isHovered && "invisible")}
        />
      </a>
    </div>
  );
}
