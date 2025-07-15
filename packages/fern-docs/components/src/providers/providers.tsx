"use client";

import { ProgressProvider } from "@bprogress/next/app";
import { TooltipProvider } from "@radix-ui/react-tooltip";

import { Toaster } from "../FernToast";
import { JotaiProvider } from "../state/jotai-provider";
import StyledJsxRegistry from "./registry";

export function Providers({
  children,
  loaderColor,
}: {
  children: React.ReactNode;
  loaderColor?: string;
}) {
  return (
    <StyledJsxRegistry>
      <JotaiProvider>
        <TooltipProvider>
          <Toaster />
          <ProgressProvider
            height="3px"
            color={loaderColor ?? "var(--accent)"}
            options={{ showSpinner: false }}
            disableSameURL
            delay={300}
            memo
            shouldCompareComplexProps
          >
            {children}
          </ProgressProvider>
        </TooltipProvider>
      </JotaiProvider>
    </StyledJsxRegistry>
  );
}
