import { createHash } from "crypto";

import { ApiDefinition } from "@fern-api/fdr-sdk";
import { truncateToBytes } from "@fern-api/ui-core-utils";

import { maybePrepareMdxContent } from "../../utils/prepare-mdx-content";
import { toDescription } from "../../utils/to-description";
import { TurbopufferRecord } from "../types";

interface CreateApiReferenceRecordHttpOptions {
  endpointBase: TurbopufferRecord;
  endpoint: ApiDefinition.EndpointDefinition;
}

export function createApiReferenceRecordHttp({
  endpointBase,
  endpoint,
}: CreateApiReferenceRecordHttpOptions): TurbopufferRecord[] {
  const base: TurbopufferRecord = {
    ...endpointBase,
    attributes: {
      ...endpointBase.attributes,
      type: "api-reference",
    },
  };

  const records: TurbopufferRecord[] = [base];
  const {
    content: request_description,
    code_snippets: request_description_code_snippets,
  } = maybePrepareMdxContent(
    toDescription(endpoint.requests?.[0]?.description)
  );

  if (
    request_description != null ||
    request_description_code_snippets?.length
  ) {
    records.push({
      ...base,
      id: createHash("sha256")
        .update(base.id + request_description)
        .digest("hex"),
      attributes: {
        ...base.attributes,
        hash: "#request",
        title: `${base.attributes.title} - Request`,
        description:
          request_description != null
            ? truncateToBytes(request_description, 50 * 1000)
            : undefined,
        page_position: 1,
      },
    });
  }

  const {
    content: response_description,
    code_snippets: response_description_code_snippets,
  } = maybePrepareMdxContent(
    toDescription(endpoint.responses?.[0]?.description)
  );

  if (
    response_description != null ||
    response_description_code_snippets?.length
  ) {
    records.push({
      ...base,
      id: createHash("sha256")
        .update(base.id + response_description)
        .digest("hex"),
      attributes: {
        ...base.attributes,
        hash: "#response",
        title: `${base.attributes.title} - Response`,
        description:
          response_description != null
            ? truncateToBytes(response_description, 50 * 1000)
            : undefined,
        page_position: 1,
      },
    });
  }

  return records;
}
