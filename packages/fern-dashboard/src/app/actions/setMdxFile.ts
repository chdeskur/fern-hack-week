"use server";

import { createEditableDocsLoader } from "@fern-api/docs-loader";

import { getCurrentSession } from "@/app/services/auth0/getCurrentSession";
import { getHostFromHeaders } from "@/utils/getHostFromHeaders";

export async function setMdxFile(
  docsUrl: string,
  filename: string,
  content: string
) {
  const host = await getHostFromHeaders();
  const session = await getCurrentSession();
  const loader = await createEditableDocsLoader(
    host,
    docsUrl,
    session?.accessToken
  );
  console.log("setMdxFile", filename, content);
  return loader.setMdxFile(filename, content);
}
