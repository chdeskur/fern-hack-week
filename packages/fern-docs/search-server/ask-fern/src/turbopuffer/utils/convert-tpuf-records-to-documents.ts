import { uniqBy } from "es-toolkit/array";

import { TurbopufferRecord } from "../types";

export function convertTpufRecordsToDocuments(
  results: TurbopufferRecord[]
): string[] {
  return uniqBy(
    results.map((result) => {
      return {
        chunk: result.attributes.chunk,
        title: result.attributes.title,
        pathname: result.attributes.pathname,
        hash: result.attributes.hash,
        description: result.attributes.description,
        page_position: result.attributes.page_position,
        domain: result.attributes.domain,
      };
    }),
    (result) => `${result.pathname}${result.hash} - ${result.page_position}`
  ).map(
    (result) =>
      `# ${result.title}\n Citation URL: ${result.domain}${result.pathname}${result.hash ?? ""}\n\n${result.chunk}${result.description}`
  );
}
