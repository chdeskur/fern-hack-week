import { NextResponse } from "next/server";

import { isLocal } from "@/server/isLocal";
import { isSelfHosted } from "@/server/isSelfHosted";

export async function GET() {
  if (!isLocal() || !isSelfHosted()) {
    return NextResponse.json(
      {
        error:
          "local revalidation is not accessible outside of local development mode",
      },
      { status: 400 }
    );
  }

  try {
    return NextResponse.json({
      backendPort: process.env.NEXT_PUBLIC_FDR_ORIGIN_PORT,
      now: Date.now(),
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "[revalidate-local] failed to revalidate",
        message: error instanceof Error ? error.message : "unknown error",
      },
      { status: 500 }
    );
  }
}
