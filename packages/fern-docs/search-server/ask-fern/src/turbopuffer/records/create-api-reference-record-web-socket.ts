import { RecordIr, TurbopufferRecord } from "../types";

export function createApiReferenceRecordWebSocket({
  endpointBase,
}: {
  endpointBase: RecordIr;
}): TurbopufferRecord {
  const fields = {
    api_type: "websocket",
    api_definition_id: endpointBase.attributes.api_definition_id,
    api_endpoint_id: endpointBase.attributes.api_endpoint_id,
    method: endpointBase.attributes.method,
    endpoint_path: endpointBase.attributes.endpoint_path,
    endpoint_path_alternates: endpointBase.attributes.endpoint_path_alternates,
    description: endpointBase.attributes.description,
    environments: endpointBase.attributes.environments,
    default_environment_id: endpointBase.attributes.default_environment_id,
  };

  return {
    ...endpointBase,
    attributes: {
      ...endpointBase.attributes,
      type: "api-reference",
      document: JSON.stringify(fields, null, 2),
    },
  };
}
