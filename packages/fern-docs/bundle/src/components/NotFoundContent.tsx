import "server-only";

import { FaIcon } from "@fern-docs/components";

import { HiddenSidebar } from "@/state/layout";

import ReturnHomeButton from "./ReturnHomeButton";

// todo: don't hide the sidebar if disable-header is true
export default async function NotFoundContent() {
  return (
    <>
      <HiddenSidebar />
      <div className="flex h-[calc(100svh-var(--header-height)-6rem)] w-screen flex-col items-center justify-center gap-6">
        <FaIcon
          icon="fa-solid fa-triangle-exclamation"
          className="h-[96px] w-[96px]"
          strokeWidth={4}
          fill="url(#404-background)"
          stroke="url(#404-border)"
          gradients={[
            {
              id: "404-background",
              stops: [
                { offset: "0%", color: "var(--grayscale-a4)" },
                { offset: "100%", color: "var(--grayscale-a6)" },
              ],
            },
            {
              id: "404-border",
              stops: [
                { offset: "0%", color: "var(--grayscale-a6)" },
                { offset: "100%", color: "var(--grayscale-a11)" },
              ],
            },
          ]}
        />
        <div className="flex flex-col text-center">
          <h1>Page not found!</h1>
          <p className="text-(color:--grayscale-a9)">
            We&apos;re sorry, we couldn&apos;t find the page you were looking
            for.
          </p>
        </div>

        <ReturnHomeButton />
      </div>
    </>
  );
}
