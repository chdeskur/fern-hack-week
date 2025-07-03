import { uniqBy } from "es-toolkit/array";

import { TurbopufferRecord } from "../types";

export function convertTpufRecordToCitation(results: TurbopufferRecord[]) {
  return results.map((result) => {
    return {
      type: "file",
      data: `# ${result.attributes.title}\n\n${result.attributes.document}\n\n${result.attributes.description}`,
      mediaType: "text/plain",
      filename: `${result.attributes.domain}${result.attributes.pathname}${result.attributes.hash ?? ""}`,
    };
  });
}

export function convertTpufRecordsToDocuments(
  results: TurbopufferRecord[]
): string[] {
  return uniqBy(
    results.map((result) => {
      return {
        document: result.attributes.document,
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
      `# ${result.title}\n Citation URL: ${result.domain}${result.pathname}${result.hash ?? ""}\n\n${result.document}${result.description}`
  );
}
