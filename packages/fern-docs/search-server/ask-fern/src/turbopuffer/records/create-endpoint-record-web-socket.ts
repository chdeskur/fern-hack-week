import { createHash } from "crypto";
import { flatten } from "es-toolkit/array";

import { ApiDefinition, FernNavigation } from "@fern-api/fdr-sdk";
import { truncateToBytes, withDefaultProtocol } from "@fern-api/ui-core-utils";
import { maybePrepareMdxContent, toDescription } from "@fern-docs/search-utils";

import { BaseRecordIr, RecordIr } from "../types";

export function createEndpointBaseRecordWebSocket({
  base,
  node,
  endpoint,
  types,
}: {
  node: FernNavigation.WebSocketNode;
  base: BaseRecordIr;
  endpoint: ApiDefinition.WebSocketChannel;
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

  keywords.push("endpoint", "api", "websocket", "web socket", "stream");

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
  }).webSocketChannel(endpoint, endpoint.id);

  const keywords_as_string = keywords.join(" ");

  const endpoint_path = ApiDefinition.toColonEndpointPathLiteral(endpoint.path);
  const endpoint_path_curly = ApiDefinition.toCurlyBraceEndpointPathLiteral(
    endpoint.path
  );

  return {
    ...base,
    id: createHash("sha256").update(node.webSocketId).digest("hex"),
    attributes: {
      ...base.attributes,
      chunk: prepared.content ?? "",
      api_type: "websocket",
      api_definition_id: node.apiDefinitionId,
      api_endpoint_id: node.webSocketId,
      method: "GET",
      description:
        prepared.content != null
          ? truncateToBytes(prepared.content, 50 * 1000)
          : undefined,
      endpoint_path,
      endpoint_path_alternates: [
        endpoint_path_curly,
        ...(endpoint.environments?.map((environment) =>
          String(
            new URL(endpoint_path, withDefaultProtocol(environment.baseUrl))
          )
        ) ?? []),
        ...(endpoint.environments?.map((environment) =>
          String(
            new URL(
              endpoint_path_curly,
              withDefaultProtocol(environment.baseUrl)
            )
          )
        ) ?? []),
      ],
      environments: flatten(
        endpoint.environments?.map((environment) => [
          environment.id,
          environment.baseUrl,
        ]) ?? []
      ),
      default_environment_id: endpoint.defaultEnvironment,
      keywords: keywords_as_string,
    },
  };
}
