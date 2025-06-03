import { createHash } from "crypto";

import { ApiDefinition } from "@fern-api/fdr-sdk";

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

  const {
    content: request_description,
    code_snippets: request_description_code_snippets,
  } = maybePrepareMdxContent(
    toDescription(endpoint.requests?.[0]?.description)
  );

  const record = {
    ...base,
    id: createHash("sha256").update(base.id).digest("hex"),
    attributes: {
      ...base.attributes,
    },
  };

  // if request exists, update record
  if (
    request_description != null ||
    request_description_code_snippets?.length
  ) {
    record.attributes.description =
      request_description != null ? request_description : undefined;
    record.attributes.code_snippets = request_description_code_snippets?.map(
      (code_snippet) => code_snippet.code
    );
  }

  const {
    content: response_description,
    code_snippets: response_description_code_snippets,
  } = maybePrepareMdxContent(
    toDescription(endpoint.responses?.[0]?.description)
  );

  // if response exists, update record
  if (
    response_description != null ||
    response_description_code_snippets?.length
  ) {
    if (record.attributes.description != null) {
      if (response_description != null) {
        record.attributes.description += "\n\n" + response_description;
      } else {
        record.attributes.description = response_description;
      }
    }
    if (response_description_code_snippets?.length) {
      if (record.attributes.code_snippets != null) {
        record.attributes.code_snippets = [
          ...record.attributes.code_snippets,
          ...response_description_code_snippets.map(
            (code_snippet) => code_snippet.code
          ),
        ];
      } else {
        record.attributes.code_snippets =
          response_description_code_snippets.map(
            (code_snippet) => code_snippet.code
          );
      }
    }
  }

  return [record];
}
