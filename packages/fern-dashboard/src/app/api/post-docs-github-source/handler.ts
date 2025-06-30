import { FdrAPI } from "@fern-api/fdr-sdk";

import { getFdrClient } from "@/app/services/fdr/getFdrClient";

export default async function postDocsGithubSourceHandler({
  url,
  token,
  githubUrl,
}: {
  url: string;
  token: string;
  githubUrl: string;
}): Promise<void> {
  const client = getFdrClient({ token });

  // Use the setDocsUrlMetadata function from the docs read service
  const response = await client.docs.v2.write.setDocsUrlMetadata({
    url: FdrAPI.Url(url),
    githubUrl: FdrAPI.Url(githubUrl),
  });

  if (!response.ok) {
    console.error(
      "Failed to set docs URL metadata",
      JSON.stringify(response.error)
    );
    throw new Error("Failed to set docs URL metadata");
  }
}
