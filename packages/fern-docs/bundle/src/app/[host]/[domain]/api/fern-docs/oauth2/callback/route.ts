import { NextRequest, NextResponse } from "next/server";

/**
 * this endpoint will eventually serve as the callback for a generalized oauth2 flow
 * for now, it returns the parameters sent in the request
 */
export async function GET(req: NextRequest): Promise<NextResponse> {
  const requestDetails = {
    url: req.url,
    searchParams: Object.fromEntries(req.nextUrl.searchParams.entries()),
    headers: Object.fromEntries(req.headers.entries()),
  };

  return NextResponse.json({
    status: 200,
    requestDetails,
  });
}
