"use client";

import { FdrAPI } from "@fern-api/fdr-sdk";

import { DocsUrl } from "@/utils/types";

import { DocsSiteLink } from "./DocsSiteLink";
import { GithubSource } from "./GithubSource";

export declare namespace DocsSiteInfo {
  export interface Props {
    docsSite: FdrAPI.dashboard.DocsSite;
    docsUrl: DocsUrl;
  }
}

export function DocsSiteInfo({ docsSite, docsUrl }: DocsSiteInfo.Props) {
  return (
    <div className="flex min-w-0 flex-col gap-4 text-gray-900">
      <div className="flex flex-col gap-2">
        <p>Domains</p>
        <div className="flex flex-col items-start gap-1">
          {docsSite.urls.map((url) => (
            <DocsSiteLink key={`${url.domain}${url.path}`} docsSiteUrl={url} />
          ))}
        </div>
      </div>
      <GithubSource docsUrl={docsUrl} />
    </div>
  );
}
