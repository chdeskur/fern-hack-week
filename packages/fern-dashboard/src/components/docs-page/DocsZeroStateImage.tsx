"use client";

import { useTheme } from "next-themes";
import Image from "next/image";

import { useIsFirstClientSideRender } from "@/utils/useIsFirstClientSideRender";

import exampleDocsSiteDark from "../../../public/example-docs-site-dark.avif";
import exampleDocsSiteLight from "../../../public/example-docs-site-light.avif";

export function DocsZeroStateImage() {
  const { resolvedTheme = "light" } = useTheme();

  // render `null` on the first render to match the SSR and avoid hydration errors
  const isFirstClientSideRender = useIsFirstClientSideRender();
  if (isFirstClientSideRender) {
    return null;
  }

  return (
    <div className="relative mx-[5%] flex max-w-[700px] flex-1 justify-center">
      <Image
        className="absolute top-0 opacity-50"
        src={
          resolvedTheme === "light" ? exampleDocsSiteLight : exampleDocsSiteDark
        }
        alt="example doc site"
      />
    </div>
  );
}
