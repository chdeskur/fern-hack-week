import { createHash } from "crypto";

import { ApiDefinition, FernNavigation } from "@fern-api/fdr-sdk";
import { truncateToBytes } from "@fern-api/ui-core-utils";
import { maybePrepareMdxContent, toDescription } from "@fern-docs/search-utils";

import { BaseRecordIr, RecordIr } from "../types";

export function createEndpointBaseRecordWebhook({
  base,
  node,
  endpoint,
  types,
}: {
  node: FernNavigation.WebhookNode;
  base: BaseRecordIr;
  endpoint: ApiDefinition.WebhookDefinition;
  types: Record<ApiDefinition.TypeId, ApiDefinition.TypeDefinition>;
}): RecordIr {
  const prepared = maybePrepareMdxContent(toDescription(endpoint.description));

  const keywords: string[] = [];
  if (
    typeof base.attributes.keywords !== "undefined" &&
    typeof base.attributes.keywords === "string"
  ) {
    keywords.push(base.attributes.keywords);
  } else if (
    typeof base.attributes.keywords !== "undefined" &&
    Array.isArray(base.attributes.keywords)
  ) {
    keywords.push(...base.attributes.keywords);
  }

  keywords.push("endpoint", "api", "webhook");

  ApiDefinition.Transformer.with({
    TypeShape: (type) => {
      if (type.type === "alias" && type.value.type === "id") {
        const definition = types[type.value.id];
        if (definition != null) {
          keywords.push(definition.name);
        }
      }
      return type;
    },
  }).webhookDefinition(endpoint, endpoint.id);

  const keywords_as_string = keywords.join(" ");

  return {
    ...base,
    id: createHash("sha256").update(node.webhookId).digest("hex"),
    attributes: {
      ...base.attributes,
      chunk: prepared.content?.slice(0, 50) ?? "",
      api_type: "webhook",
      api_definition_id: node.apiDefinitionId,
      api_endpoint_id: node.webhookId,
      method: node.method,
      endpoint_path: endpoint.path.join(""),
      description:
        prepared.content != null
          ? truncateToBytes(prepared.content, 50 * 1000)
          : undefined,
      keywords: keywords_as_string,
    },
  };
}
