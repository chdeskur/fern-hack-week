"use client";

import { useRouter } from "next/navigation";
import React from "react";

import { removeTrailingSlash } from "@fern-docs/utils";

import { useCurrentPathname } from "@/hooks/use-current-pathname";

export function PlaygroundKeyboardTrigger() {
  const pathname = removeTrailingSlash(useCurrentPathname());
  const router = useRouter();
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check for Ctrl + ` (backtick)
      if (e.ctrlKey && e.key === "`") {
        e.preventDefault();
        router.replace(
          pathname.endsWith("/?explorer=true")
            ? pathname.slice(0, -9)
            : `${pathname}/?explorer=true`,
          { scroll: false }
        );
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [pathname, router]);

  return null;
}
