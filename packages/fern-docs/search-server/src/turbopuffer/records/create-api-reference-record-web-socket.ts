import { TurbopufferRecord } from "../types";

interface CreateApiReferenceRecordWebSocketOptions {
  endpointBase: TurbopufferRecord;
}

export function createApiReferenceRecordWebSocket({
  endpointBase,
}: CreateApiReferenceRecordWebSocketOptions): TurbopufferRecord {
  return {
    ...endpointBase,
    attributes: {
      ...endpointBase.attributes,
      type: "api-reference",
    },
  };
}
