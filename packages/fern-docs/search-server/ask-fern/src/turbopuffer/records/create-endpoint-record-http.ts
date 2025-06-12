import { createHash } from "crypto";
import { flatten } from "es-toolkit/array";

import { ApiDefinition, FernNavigation } from "@fern-api/fdr-sdk";
import { withDefaultProtocol } from "@fern-api/ui-core-utils";
import { maybePrepareMdxContent, toDescription } from "@fern-docs/search-utils";

import { TurbopufferRecord, TurbopufferRecordWithoutVector } from "../types";

interface CreateEndpointBaseRecordOptions {
  node: FernNavigation.EndpointNode;
  base: Omit<TurbopufferRecordWithoutVector, "attributes"> & {
    attributes: Omit<TurbopufferRecordWithoutVector["attributes"], "chunk">;
  };
  endpoint: ApiDefinition.EndpointDefinition;
  types: Record<ApiDefinition.TypeId, ApiDefinition.TypeDefinition>;
}

export function createEndpointBaseRecordHttp({
  base,
  node,
  endpoint,
  types,
}: CreateEndpointBaseRecordOptions): TurbopufferRecord {
  const prepared = maybePrepareMdxContent(toDescription(endpoint.description));

  // here, we parse request properties
  // TODO: make this more comprehensive (handle enums, etc.)
  const request_properties: {
    key: string;
    type: string;
    description?: string;
  }[] = [];
  endpoint.requests?.forEach((request) => {
    if (request.body.type === "object") {
      request.body.properties.forEach((property) => {
        if (property.valueShape.type === "alias") {
          let property_type = JSON.stringify(property.valueShape);
          if (property.valueShape.value.type === "id") {
            property_type = JSON.stringify(types[property.valueShape.value.id]);
          } else if (property.valueShape.value.type === "optional") {
            if (
              property.valueShape.value.shape.type === "alias" &&
              property.valueShape.value.shape.value.type === "id"
            ) {
              property_type = JSON.stringify(
                types[property.valueShape.value.shape.value.id]
              );
            }
          }
          request_properties.push({
            key: property.key.toString(),
            type: property_type,
            description: property.description,
          });
        } else if (property.valueShape.type === "enum") {
          request_properties.push({
            key: property.key.toString(),
            type: JSON.stringify(property.valueShape),
            description: property.description,
          });
        }
      });
    }
  });
  const description =
    JSON.stringify(request_properties, null, 2) +
    "\n\n" +
    base.attributes.code_snippets?.join("\n\n");

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

  keywords.push("endpoint", "api", "http", "rest", "openapi");

  const response_type =
    endpoint.responses?.[0]?.body.type === "streamingText" ||
    endpoint.responses?.[0]?.body.type === "stream"
      ? "stream"
      : endpoint.responses?.[0]?.body.type === "fileDownload"
        ? "file"
        : endpoint.responses?.[0]?.body != null
          ? "json"
          : undefined;

  if (response_type != null) {
    keywords.push(response_type);
  }

  // TODO: optimize keywords
  const keywords_as_string = keywords.join(" ");

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
  }).endpoint(endpoint, endpoint.id);

  const endpoint_path = ApiDefinition.toColonEndpointPathLiteral(endpoint.path);
  const endpoint_path_curly = ApiDefinition.toCurlyBraceEndpointPathLiteral(
    endpoint.path
  );

  return {
    ...base,
    id: createHash("sha256").update(node.id).digest("hex"),
    attributes: {
      ...base.attributes,
      chunk: prepared.content ?? "",
      code_snippets: prepared.code_snippets?.map(
        (code_snippet) => code_snippet.code
      ),
      api_type: "http",
      api_definition_id: node.apiDefinitionId,
      api_endpoint_id: node.endpointId,
      method: node.method,
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
      response_type,
      description,
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
