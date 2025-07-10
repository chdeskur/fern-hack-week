"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

import GradientExclamation from "@fern-docs/components/GradientExclamation";

import { Button } from "@/components/ui/button";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  const { orgName } = useParams();
  return (
    <main className="flex h-full w-full items-center justify-center">
      <div className="flex max-w-[500px] flex-col items-center justify-center gap-6 text-center">
        <GradientExclamation
          colors={["var(--gray-400)", "var(--gray-500)", "var(--gray-600)"]}
        />
        <h2 className="text-muted-foreground">{error.message}</h2>
        <div className="flex gap-2">
          <Button asChild>
            <Link href={`/${orgName}/docs`}>Return home</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
