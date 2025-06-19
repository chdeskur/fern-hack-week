import { createHash } from "crypto";
import { flatten } from "es-toolkit/array";

import { ApiDefinition } from "@fern-api/fdr-sdk";
import { truncateToBytes } from "@fern-api/ui-core-utils";
import { maybePrepareMdxContent, toDescription } from "@fern-docs/search-utils";

import { RecordIr, TurbopufferRecord } from "../types";

export function createApiReferenceRecordWebhook({
  endpointBase,
  endpoint,
}: {
  endpointBase: RecordIr;
  endpoint: ApiDefinition.WebhookDefinition;
}): TurbopufferRecord[] {
  const fields = {
    api_type: "webhook",
    api_definition_id: endpointBase.attributes.api_definition_id,
    api_endpoint_id: endpointBase.attributes.api_endpoint_id,
    method: endpointBase.attributes.method,
    endpoint_path: endpointBase.attributes.endpoint_path,
    endpoint_path_alternates: endpointBase.attributes.endpoint_path_alternates,
    description: endpointBase.attributes.description,
    keywords: endpointBase.attributes.keywords,
  };
  const base: TurbopufferRecord = {
    ...endpointBase,
    attributes: {
      ...endpointBase.attributes,
      type: "api-reference",
      document: JSON.stringify(fields, null, 2),
    },
  };

  const records: TurbopufferRecord[] = [base];

  const {
    content: payload_description,
    code_snippets: payload_description_code_snippets,
  } = maybePrepareMdxContent(
    toDescription(endpoint.payloads?.[0]?.description)
  );

  const code_snippets: string[] | undefined = flatten(
    payload_description_code_snippets
      ? payload_description_code_snippets.map((codeSnippet) => {
          const output: string[] = [];
          if (codeSnippet.code) {
            output.push(codeSnippet.code);
          }
          if (codeSnippet.lang) {
            output.push(codeSnippet.lang);
          }
          if (codeSnippet.meta) {
            output.push(codeSnippet.meta);
          }
          return output;
        })
      : []
  );

  if (payload_description != null || code_snippets?.length) {
    records.push({
      ...base,
      id: createHash("sha256")
        .update(base.id + payload_description)
        .digest("hex"),
      attributes: {
        ...base.attributes,
        title: `${base.attributes.title} - Payload`,
        hash: "#payload",
        description:
          payload_description != null
            ? truncateToBytes(payload_description, 50 * 1000)
            : undefined,
        page_position: 1,
      },
    });
  }

  return records;
}
