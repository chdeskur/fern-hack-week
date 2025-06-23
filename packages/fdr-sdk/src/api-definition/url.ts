import qs from "qs";

import { unknownToString } from "@fern-api/ui-core-utils";

import type { EndpointDefinition, PathPart } from "./latest";

function buildQueryParams(
  queryParameters: Record<string, unknown> | undefined
): string {
  if (queryParameters == null) {
    return "";
  }

  const filteredParams = Object.entries(queryParameters).reduce(
    (acc, [key, value]) => {
      if (value != null) {
        acc[key] = value;
      }
      return acc;
    },
    {} as Record<string, unknown>
  );

  if (Object.keys(filteredParams).length === 0) {
    return "";
  }

  const queryString = qs.stringify(filteredParams, {
    encode: false,
    arrayFormat: "repeat",
    skipNulls: true,
    serializeDate: (date: Date) => date.toISOString(),
  });

  return queryString ? "?" + queryString : "";
}

function buildPath(
  path: PathPart[] = [],
  pathParameters?: Record<string, unknown>
): string {
  return path
    .map((part) => {
      if (part.type === "pathParameter") {
        const key = part.value;
        const stateValue = unknownToString(pathParameters?.[key]);
        return stateValue.length > 0
          ? encodeURIComponent(stateValue)
          : ":" + key;
      }
      return part.value;
    })
    .join("");
}

interface BuildRequestUrlOptions {
  path?: PathPart[];
  pathParameters?: Record<string, unknown>;
  queryParameters?: Record<string, unknown>;
  baseUrl?: string;
}
export function buildRequestUrl({
  baseUrl = "",
  path,
  pathParameters,
  queryParameters,
}: BuildRequestUrlOptions): string {
  return (
    baseUrl +
    buildPath(path, pathParameters) +
    buildQueryParams(queryParameters)
  );
}

interface BuildEndpointUrlOptions {
  endpoint?: EndpointDefinition;
  pathParameters?: Record<string, unknown>;
  queryParameters?: Record<string, unknown>;
  baseUrl?: string;
}
export function buildEndpointUrl({
  endpoint,
  pathParameters,
  queryParameters,
  baseUrl,
}: BuildEndpointUrlOptions): string {
  return buildRequestUrl({
    baseUrl:
      baseUrl ??
      (
        endpoint?.environments?.find(
          (env) => env.id === endpoint.defaultEnvironment
        ) ?? endpoint?.environments?.[0]
      )?.baseUrl,
    path: endpoint?.path,
    pathParameters,
    queryParameters,
  });
}
