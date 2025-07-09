"use server";

import { headers } from "next/headers";

import { createEditableDocsLoader } from "@fern-api/docs-loader";

import { getCurrentSession } from "@/app/services/auth0/getCurrentSession";

export async function setMdxFile(
  docsUrl: string,
  filename: string,
  content: string
) {
  // TODO: bring headers logic to other places where we instantiate EditableDocsLoader
  const _headers = await headers();
  const session = await getCurrentSession();
  const loader = await createEditableDocsLoader(
    // We expect headers to always include host, but fallback to localhost:3000 just in case
    _headers.get("host") ?? "localhost:3000",
    docsUrl,
    session?.accessToken
  );
  console.log("setMdxFile", filename, content);
  return loader.setMdxFile(filename, content);
}
