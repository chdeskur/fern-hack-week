"use client";

import { FdrAPI } from "@fern-api/fdr-sdk";

import { GithubLogo } from "../auth/GithubLogo";
import { Button } from "../ui/button";
import { DocsSiteLink } from "./DocsSiteLink";

export declare namespace DocsSiteInfo {
  export interface Props {
    docsSite: FdrAPI.dashboard.DocsSite;
  }
}

export function DocsSiteInfo({ docsSite }: DocsSiteInfo.Props) {
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
      <div className="flex w-fit flex-col gap-2">
        <p>Source</p>
        <Button size="sm">
          <GithubLogo />
          Connect Repo
        </Button>
      </div>
    </div>
  );
}
