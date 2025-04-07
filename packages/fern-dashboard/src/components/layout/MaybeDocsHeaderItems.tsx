"use client";

import { usePathname } from "next/navigation";

import { DocsSiteSwitcher } from "./DocsSiteSwitcher";

const DOCS_SITE_URL_REGEX = /^\/docs\/.+$/;

export function MaybeDocsHeaderItems() {
  const pathname = usePathname();
  if (!DOCS_SITE_URL_REGEX.test(pathname)) {
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
