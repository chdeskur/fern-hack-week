"use client";

import { useParams } from "next/navigation";

import { DocsSiteSwitcher } from "./DocsSiteSwitcher";

export function MaybeDocsHeaderItems() {
  const { docsUrl } = useParams();
  if (docsUrl == null) {
    return null;
  }
  return (
    <>
      <div className="flex items-center md:hidden">/</div>
      <div className="flex min-w-0 md:hidden">
        <DocsSiteSwitcher />
      </div>
    </>
  );
}
