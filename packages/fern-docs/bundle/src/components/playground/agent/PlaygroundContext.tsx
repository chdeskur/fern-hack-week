"use client";

import React, { Dispatch, SetStateAction } from "react";

import { noop } from "ts-essentials";

import {
  EndpointContext,
  WebSocketContext,
} from "@fern-api/fdr-sdk/api-definition";
import { Loadable } from "@fern-ui/loadable";

import {
  PlaygroundEndpointRequestFormState,
  PlaygroundWebSocketRequestFormState,
} from "../types";
import { PlaygroundResponse } from "../types/playgroundResponse";
import { getEmptyValueForHttpRequestBody } from "../utils/default-values";

// Structured logging utility for chat agent integration
const PlaygroundLogger = {
  debug: (message: string, data?: any) => {
    if (process.env.NODE_ENV === "development") {
      console.log(`[Playground] ${message}`, data);
    }
  },

  info: (message: string, data?: any) => {
    console.log(`[Playground] ${message}`, data);
  },

  warn: (message: string, data?: any) => {
    console.warn(`[Playground] ${message}`, data);
  },

  error: (message: string, error?: any) => {
    console.error(`[Playground] ${message}`, error);
  },

  // Specialized logging for chat agent integration
  agentAction: (action: string, details: any) => {
    console.log(`[Agent] ${action}`, details);
  },

  // Log state changes that are relevant for the agent
  stateChange: (component: string, change: any) => {
    PlaygroundLogger.debug(`State change in ${component}:`, change);
  },

  // Log parameter updates
  parameterUpdate: (
    type: "header" | "path" | "query" | "body",
    key: string,
    value: any
  ) => {
    PlaygroundLogger.debug(`${type} parameter updated`, { key, value });
  },

  // Log request lifecycle events
  requestLifecycle: (
    event: "started" | "completed" | "failed",
    details?: any
  ) => {
    PlaygroundLogger.info(`Request ${event}`, details);
  },

  // Log response analysis for debugging
  responseAnalysis: (analysis: any) => {
    PlaygroundLogger.debug("Response analysis", analysis);
  },

  // Log context changes
  contextChange: (change: any) => {
    PlaygroundLogger.debug("Context changed", change);
  },
};

// Helper function to resolve alias types recursively
function resolveAliasType(
  typeShape: any,
  types: Record<string, any>,
  visitedTypeIds = new Set<string>()
): any {
  if (!typeShape) return typeShape;

  // Handle alias types
  if (typeShape.type === "alias") {
    return resolveAliasType(typeShape.value, types, visitedTypeIds);
  }

  // Handle type references (id)
  if (typeShape.type === "id") {
    const typeId = typeShape.id || typeShape.value;
    if (visitedTypeIds.has(typeId)) {
      // Circular reference detected
      PlaygroundLogger.warn(`Circular reference detected for type: ${typeId}`);
      return typeShape;
    }

    const typeDefinition = types[typeId];
    if (!typeDefinition) {
      PlaygroundLogger.warn(`Type definition not found for: ${typeId}`);
      return typeShape;
    }

    visitedTypeIds.add(typeId);
    return resolveAliasType(typeDefinition.shape, types, visitedTypeIds);
  }

  // Handle optional types
  if (typeShape.type === "optional") {
    return resolveAliasType(typeShape.shape, types, visitedTypeIds);
  }

  // Handle nullable types
  if (typeShape.type === "nullable") {
    return resolveAliasType(typeShape.shape, types, visitedTypeIds);
  }

  // Handle list/array types
  if (typeShape.type === "list") {
    return {
      ...typeShape,
      shape: resolveAliasType(
        typeShape.shape || typeShape.itemShape,
        types,
        visitedTypeIds
      ),
    };
  }

  // Handle set types (similar to list)
  if (typeShape.type === "set") {
    return {
      ...typeShape,
      shape: resolveAliasType(
        typeShape.shape || typeShape.itemShape,
        types,
        visitedTypeIds
      ),
    };
  }

  // Handle map types
  if (typeShape.type === "map") {
    return {
      ...typeShape,
      keyType: resolveAliasType(typeShape.keyType, types, visitedTypeIds),
      valueType: resolveAliasType(typeShape.valueType, types, visitedTypeIds),
    };
  }

  // Handle union types
  if (typeShape.type === "union") {
    return {
      ...typeShape,
      union: typeShape.union.map((member: any) =>
        resolveAliasType(member, types, visitedTypeIds)
      ),
    };
  }

  // For object types, resolve properties recursively
  if (typeShape.type === "object" && typeShape.properties) {
    return {
      ...typeShape,
      properties: typeShape.properties.map((property: any) => ({
        ...property,
        valueShape: resolveAliasType(
          property.valueShape,
          types,
          visitedTypeIds
        ),
      })),
    };
  }

  // For other types, return as is
  return typeShape;
}

// Helper function to get type information for a shape
function getTypeInfo(typeShape: any): { type: string; description?: string } {
  if (!typeShape) return { type: "unknown" };

  switch (typeShape.type) {
    case "string":
      return { type: "string", description: typeShape.description };
    case "integer":
    case "long":
    case "double":
    case "float":
      return { type: "number", description: typeShape.description };
    case "boolean":
      return { type: "boolean", description: typeShape.description };
    case "date":
    case "datetime":
      return { type: "date", description: typeShape.description };
    case "list":
      return {
        type: "array",
        description: typeShape.description || "Array of items",
      };
    case "set":
      return {
        type: "set",
        description: typeShape.description || "Set of unique items",
      };
    case "map":
      return {
        type: "object",
        description: typeShape.description || "Key-value pairs",
      };
    case "object":
      return {
        type: "object",
        description: typeShape.description || "Object with properties",
      };
    case "union":
      return {
        type: "union",
        description: typeShape.description || "One of multiple types",
      };
    case "optional":
      return getTypeInfo(typeShape.shape);
    case "nullable":
      return getTypeInfo(typeShape.shape);
    case "alias":
      return getTypeInfo(typeShape.value);
    case "id":
      return { type: "reference", description: typeShape.description };
    default:
      return { type: "unknown", description: typeShape.description };
  }
}

// Helper function to recursively extract properties from complex types
function extractProperties(
  typeShape: any,
  basePath: string[] = [],
  types: Record<string, any> = {},
  visitedTypes = new Set<string>()
): {
  key: string;
  type: string;
  description?: string;
  isRequired: boolean;
  defaultValue: unknown;
  path: string[];
  currentValue: unknown;
  setValue: (value: unknown) => void;
  isArray?: boolean;
  isNested?: boolean;
  children?: any[];
}[] {
  const properties: any[] = [];

  if (!typeShape) return properties;

  // Resolve the type shape first
  const resolvedShape = resolveAliasType(typeShape, types, visitedTypes);

  if (resolvedShape.type === "object" && resolvedShape.properties) {
    // Handle object properties
    resolvedShape.properties.forEach((property: any) => {
      const propertyPath = [...basePath, property.key];
      const propertyTypeInfo = getTypeInfo(property.valueShape);

      // Special handling for list/set types - they should be treated as arrays
      const isListType =
        property.valueShape?.type === "list" ||
        property.valueShape?.type === "set";
      const actualType = isListType ? "array" : propertyTypeInfo.type;

      // Debug logging for list types
      if (isListType) {
        PlaygroundLogger.debug("Found list type property", {
          key: property.key,
          shape: property.valueShape,
        });
      }

      properties.push({
        key: property.key,
        type: actualType,
        description: property.description || propertyTypeInfo.description,
        isRequired: !property.isOptional,
        defaultValue: isListType ? [] : undefined,
        path: propertyPath,
        currentValue: undefined, // Will be set by caller
        setValue: () => {
          // Will be set by caller
        }, // Will be set by caller
        isArray: isListType || propertyTypeInfo.type === "array",
        isNested:
          propertyTypeInfo.type === "object" ||
          propertyTypeInfo.type === "array" ||
          isListType,
        children:
          propertyTypeInfo.type === "object" ||
          propertyTypeInfo.type === "array" ||
          isListType
            ? extractProperties(
                property.valueShape,
                propertyPath,
                types,
                visitedTypes
              )
            : undefined,
      });
    });
  } else if (resolvedShape.type === "list" || resolvedShape.type === "set") {
    // Handle array/set types - extract the item shape for better type information
    const itemShape = resolvedShape.shape || resolvedShape.itemShape;
    const itemTypeInfo = getTypeInfo(itemShape);

    properties.push({
      key: "items",
      type: "array",
      description: resolvedShape.description || `Array of ${itemTypeInfo.type}`,
      isRequired: true,
      defaultValue: [],
      path: [...basePath, "items"],
      currentValue: undefined,
      setValue: () => {
        // Will be set by caller
      },
      isArray: true,
      isNested: itemTypeInfo.type === "object" || itemTypeInfo.type === "array",
      children:
        itemTypeInfo.type === "object" || itemTypeInfo.type === "array"
          ? extractProperties(
              itemShape,
              [...basePath, "items"],
              types,
              visitedTypes
            )
          : undefined,
    });
  } else if (resolvedShape.type === "map") {
    // Handle map types
    const keyTypeInfo = getTypeInfo(resolvedShape.keyType);
    const valueTypeInfo = getTypeInfo(resolvedShape.valueType);
    properties.push({
      key: "entries",
      type: "object",
      description:
        resolvedShape.description ||
        `Map of ${keyTypeInfo.type} to ${valueTypeInfo.type}`,
      isRequired: true,
      defaultValue: {},
      path: [...basePath, "entries"],
      currentValue: undefined,
      setValue: () => {
        // Will be set by caller
      },
      isNested:
        valueTypeInfo.type === "object" || valueTypeInfo.type === "array",
      children:
        valueTypeInfo.type === "object" || valueTypeInfo.type === "array"
          ? extractProperties(
              resolvedShape.valueType,
              [...basePath, "entries"],
              types,
              visitedTypes
            )
          : undefined,
    });
  } else if (resolvedShape.type === "union") {
    // Handle union types
    resolvedShape.union.forEach((member: any, index: number) => {
      const memberTypeInfo = getTypeInfo(member);
      properties.push({
        key: `option_${index}`,
        type: memberTypeInfo.type,
        description: memberTypeInfo.description || `Union option ${index + 1}`,
        isRequired: false,
        defaultValue: undefined,
        path: [...basePath, `option_${index}`],
        currentValue: undefined,
        setValue: () => {
          // Will be set by caller
        },
        isNested:
          memberTypeInfo.type === "object" || memberTypeInfo.type === "array",
        children:
          memberTypeInfo.type === "object" || memberTypeInfo.type === "array"
            ? extractProperties(
                member,
                [...basePath, `option_${index}`],
                types,
                visitedTypes
              )
            : undefined,
      });
    });
  }

  return properties;
}

// Helper function to safely navigate to a path in a nested object/array
function navigateToPath(obj: any, path: (string | number)[]): any {
  let current = obj;

  for (const key of path) {
    if (current == null) return undefined;

    if (Array.isArray(current)) {
      // Handle array navigation
      const index = typeof key === "string" ? parseInt(key, 10) : key;
      if (isNaN(index) || index < 0 || index >= current.length) {
        return undefined;
      }
      current = current[index];
    } else if (typeof current === "object") {
      // Handle object navigation
      current = current[key];
    } else {
      return undefined;
    }
  }

  return current;
}

// Helper function to safely set a value at a path in a nested object/array
function setValueAtPath(
  obj: any,
  path: (string | number)[],
  value: unknown
): any {
  if (path.length === 0) return value;

  // Create a deep copy to avoid mutating the original
  const newObj =
    obj != null && typeof obj === "object"
      ? Array.isArray(obj)
        ? [...obj]
        : { ...obj }
      : Array.isArray(obj)
        ? []
        : {};

  let current = newObj;

  // Navigate to the parent of the target
  for (let i = 0; i < path.length - 1; i++) {
    const key = path[i];
    if (key == null) continue;

    if (Array.isArray(current)) {
      const index = typeof key === "string" ? parseInt(key, 10) : key;
      if (isNaN(index) || index < 0) {
        // Create array if needed
        (current as any)[key] = typeof path[i + 1] === "number" ? [] : {};
      } else {
        // Ensure the array element exists
        if (!(index in current)) {
          (current as any)[index] = typeof path[i + 1] === "number" ? [] : {};
        }
      }
      current = (current as any)[key];
    } else if (typeof current === "object" && current != null) {
      if (!(key in current)) {
        (current as any)[key] = typeof path[i + 1] === "number" ? [] : {};
      }
      current = (current as any)[key];
    } else {
      // Create new object/array as needed
      (current as any)[key] = typeof path[i + 1] === "number" ? [] : {};
      current = (current as any)[key];
    }
  }

  // Set the final value
  const lastKey = path[path.length - 1];
  if (lastKey != null) {
    (current as any)[lastKey] = value;
  }

  return newObj;
}

export interface PlaygroundContextValue {
  // Current playground state
  formState:
    | PlaygroundEndpointRequestFormState
    | PlaygroundWebSocketRequestFormState
    | undefined;
  setFormState: Dispatch<SetStateAction<any>>;

  // Response state
  response: Loadable<PlaygroundResponse>;
  setResponse: (response: Loadable<PlaygroundResponse>) => void;

  // Context information
  context: EndpointContext | WebSocketContext | undefined;

  // Available actions
  sendRequest: () => Promise<void>;
  resetWithExample: () => void;
  resetWithoutExample: () => void;

  // Available values that can be set by AI
  availableValues: {
    headers: Record<string, unknown>;
    pathParameters: Record<string, unknown>;
    queryParameters: Record<string, unknown>;
    body: unknown;
    auth?: {
      bearerToken?: string;
      basicAuth?: {
        username: string;
        password: string;
      };
      headerAuth?: Record<string, string>;
    };
  };

  // Methods for AI to set values
  setHeader: (key: string, value: unknown) => void;
  setPathParameter: (key: string, value: unknown) => void;
  setQueryParameter: (key: string, value: unknown) => void;
  setBody: (body: unknown) => void;
  setAuth: (auth: PlaygroundContextValue["availableValues"]["auth"]) => void;

  // Response analysis for debugging
  responseAnalysis: {
    isSuccess: boolean;
    statusCode: number | undefined;
    statusText: string | undefined;
    responseTime: number | undefined;
    responseSize: string | undefined;
    contentType: string | undefined;
    hasErrors: boolean;
    errorDetails: {
      type:
        | "http_error"
        | "network_error"
        | "parsing_error"
        | "validation_error"
        | "none";
      message: string | undefined;
      details: unknown;
    };
    responseBody: unknown;
    responseHeaders: Record<string, string> | undefined;
    requestUrl: string | undefined;
    requestMethod: string | undefined;
  };

  // Utility methods
  getAvailablePathParameters: () => string[];
  getAvailableQueryParameters: () => string[];
  getAvailableHeaders: () => string[];
  getRequestBodySchema: () => unknown;
  unpackRequestBody: () => {
    schema: unknown;
    defaultValues: unknown;
    contentType: string | undefined;
    isRequired: boolean;
    properties: {
      key: string;
      type: string;
      description?: string;
      isRequired: boolean;
      defaultValue: unknown;
      path: string[];
      currentValue: unknown;
      setValue: (value: unknown) => void;
    }[];
  };
  setRequestBodyParameter: (path: (string | number)[], value: unknown) => void;
  getRequestBodyParameter: (path: (string | number)[]) => unknown;

  // Debugging helpers
  getResponseDebugInfo: () => {
    request: {
      url: string | undefined;
      method: string | undefined;
      headers: Record<string, unknown>;
      body: unknown;
    };
    response: {
      status: number | undefined;
      headers: Record<string, string> | undefined;
      body: unknown;
      time: number | undefined;
      size: string | undefined;
    };
    analysis: {
      isSuccess: boolean;
      hasErrors: boolean;
      errorType: string;
      suggestions: string[];
    };
  };
}

export const PlaygroundContext = React.createContext<PlaygroundContextValue>({
  formState: undefined,
  setFormState: noop,
  response: { type: "notStartedLoading" },
  setResponse: noop,
  context: undefined,
  sendRequest: async () => {
    // Default implementation - will be overridden by provider
  },
  resetWithExample: noop,
  resetWithoutExample: noop,
  availableValues: {
    headers: {},
    pathParameters: {},
    queryParameters: {},
    body: undefined,
  },
  setHeader: noop,
  setPathParameter: noop,
  setQueryParameter: noop,
  setBody: noop,
  setAuth: noop,
  responseAnalysis: {
    isSuccess: false,
    statusCode: undefined,
    statusText: undefined,
    responseTime: undefined,
    responseSize: undefined,
    contentType: undefined,
    hasErrors: false,
    errorDetails: {
      type: "none",
      message: undefined,
      details: undefined,
    },
    responseBody: undefined,
    responseHeaders: undefined,
    requestUrl: undefined,
    requestMethod: undefined,
  },
  getAvailablePathParameters: () => [],
  getAvailableQueryParameters: () => [],
  getAvailableHeaders: () => [],
  getRequestBodySchema: () => undefined,
  unpackRequestBody: () => ({
    schema: undefined,
    defaultValues: undefined,
    contentType: undefined,
    isRequired: false,
    properties: [],
  }),
  setRequestBodyParameter: noop,
  getRequestBodyParameter: () => undefined,
  getResponseDebugInfo: () => ({
    request: {
      url: undefined,
      method: undefined,
      headers: {},
      body: undefined,
    },
    response: {
      status: undefined,
      headers: undefined,
      body: undefined,
      time: undefined,
      size: undefined,
    },
    analysis: {
      isSuccess: false,
      hasErrors: false,
      errorType: "none",
      suggestions: [],
    },
  }),
});

export function PlaygroundContextProvider({
  children,
  context,
  formState,
  setFormState,
  response,
  setResponse,
  sendRequest,
  resetWithExample,
  resetWithoutExample,
}: {
  children: React.ReactNode;
  context: EndpointContext | WebSocketContext;
  formState:
    | PlaygroundEndpointRequestFormState
    | PlaygroundWebSocketRequestFormState;
  setFormState: Dispatch<SetStateAction<any>>;
  response: Loadable<PlaygroundResponse>;
  setResponse: (response: Loadable<PlaygroundResponse>) => void;
  sendRequest: () => Promise<void>;
  resetWithExample: () => void;
  resetWithoutExample: () => void;
}) {
  // Simplified setter methods using the context information
  const setHeader = React.useCallback(
    (key: string, value: unknown) => {
      PlaygroundLogger.parameterUpdate("header", key, value);

      // Check if the value is empty (undefined, null, empty string, or NaN)
      const isEmpty =
        value == null ||
        value === "" ||
        (typeof value === "number" && isNaN(value));

      setFormState((prev: typeof formState) => {
        if (prev.type !== "endpoint") return prev;

        if (isEmpty) {
          // Remove the header entirely if it's empty
          const { [key]: _removed, ...rest } = prev.headers || {};
          PlaygroundLogger.debug("Removing empty header", { key });
          return {
            ...prev,
            headers: rest,
          };
        } else {
          // Set the value if it's not empty
          PlaygroundLogger.debug("Setting header", { key, value });
          return {
            ...prev,
            headers: {
              ...prev.headers,
              [key]: value,
            },
          };
        }
      });
    },
    [setFormState]
  );

  const setPathParameter = React.useCallback(
    (key: string, value: unknown) => {
      PlaygroundLogger.parameterUpdate("path", key, value);

      // Check if the value is empty (undefined, null, empty string, or NaN)
      const isEmpty =
        value == null ||
        value === "" ||
        (typeof value === "number" && isNaN(value));

      setFormState((prev: typeof formState) => {
        if (prev.type !== "endpoint") return prev;

        if (isEmpty) {
          // Remove the parameter entirely if it's empty
          const { [key]: _removed, ...rest } = prev.pathParameters || {};
          PlaygroundLogger.debug("Removing empty path parameter", { key });
          return {
            ...prev,
            pathParameters: rest,
          };
        } else {
          // Set the value if it's not empty
          PlaygroundLogger.debug("Setting path parameter", { key, value });
          return {
            ...prev,
            pathParameters: {
              ...prev.pathParameters,
              [key]: value,
            },
          };
        }
      });
    },
    [setFormState]
  );

  const setQueryParameter = React.useCallback(
    (key: string, value: unknown) => {
      PlaygroundLogger.parameterUpdate("query", key, value);

      // Check if the value is empty (undefined, null, empty string, or NaN)
      const isEmpty =
        value == null ||
        value === "" ||
        (typeof value === "number" && isNaN(value));

      setFormState((prev: typeof formState) => {
        if (prev.type !== "endpoint") return prev;

        if (isEmpty) {
          // Remove the parameter entirely if it's empty
          const { [key]: _removed, ...rest } = prev.queryParameters || {};
          PlaygroundLogger.debug("Removing empty query parameter", { key });
          return {
            ...prev,
            queryParameters: rest,
          };
        } else {
          // Set the value if it's not empty
          PlaygroundLogger.debug("Setting query parameter", { key, value });
          return {
            ...prev,
            queryParameters: {
              ...prev.queryParameters,
              [key]: value,
            },
          };
        }
      });
    },
    [setFormState]
  );

  const setBody = React.useCallback(
    (body: unknown) => {
      PlaygroundLogger.parameterUpdate("body", "body", body);
      if (formState.type === "endpoint") {
        setFormState((prev: typeof formState) => ({
          ...prev,
          body: {
            type: "json",
            value: body,
          } as PlaygroundEndpointRequestFormState["body"],
        }));
      }
    },
    [setFormState, formState.type]
  );

  const setAuth = React.useCallback(
    (auth: PlaygroundContextValue["availableValues"]["auth"]) => {
      if (context && "auth" in context) {
        setFormState((prev: typeof formState) => ({
          ...prev,
          auth: auth,
        }));
      }
    },
    [context, setFormState]
  );

  // Simplified utility methods using context information
  const getAvailablePathParameters = React.useCallback(() => {
    if (context && "endpoint" in context) {
      return context.endpoint.pathParameters?.map((param) => param.key) || [];
    }
    return [];
  }, [context]);

  const getAvailableQueryParameters = React.useCallback(() => {
    if (context && "endpoint" in context) {
      return context.endpoint.queryParameters?.map((param) => param.key) || [];
    }
    return [];
  }, [context]);

  const getAvailableHeaders = React.useCallback(() => {
    let headers: string[] = [];

    if (context && "endpoint" in context) {
      headers =
        context.endpoint.requestHeaders?.map((header) => header.key) || [];
    }

    if (context && "globalHeaders" in context) {
      headers = [
        ...headers,
        ...context.globalHeaders.map((header) => header.key),
      ];
    }
    return headers;
  }, [context]);

  const getRequestBodySchema = React.useCallback(() => {
    if (
      context &&
      "endpoint" in context &&
      context.endpoint.requests?.[0]?.body
    ) {
      const requestBody = context.endpoint.requests[0].body;
      return resolveAliasType(requestBody, context.types);
    }
    return undefined;
  }, [context]);

  // Request body parameter control methods
  const setRequestBodyParameter = React.useCallback(
    (path: (string | number)[], value: unknown) => {
      PlaygroundLogger.parameterUpdate("body", path.join("."), value);
      if (formState.type !== "endpoint") return;

      setFormState((prev: typeof formState) => {
        if (prev.type !== "endpoint") return prev;

        const current = prev.body;
        PlaygroundLogger.debug("Current body:", current);
        if (current?.type !== "json") return prev;

        // Get current body value or create empty object
        const currentBodyValue = current.value || {};

        // Use the helper function to safely set the value
        const newBodyValue = setValueAtPath(currentBodyValue, path, value);

        PlaygroundLogger.debug("Updated body value:", newBodyValue);

        const newFormState = {
          ...prev,
          body: {
            type: "json",
            value: newBodyValue,
          },
        };
        PlaygroundLogger.debug("New form state:", newFormState);
        return newFormState;
      });
    },
    [setFormState, formState.type]
  );

  const getRequestBodyParameter = React.useCallback(
    (path: (string | number)[]) => {
      PlaygroundLogger.debug("getRequestBodyParameter called", { path });
      if (formState.type !== "endpoint") return undefined;

      const body = formState.body;
      PlaygroundLogger.debug("Body:", body);
      if (body?.type === "json") {
        const current = body.value;
        PlaygroundLogger.debug("Body value", { current });

        // Use the helper function to safely navigate to the path
        const result = navigateToPath(current, path);
        PlaygroundLogger.debug("Final value for path", { path, result });
        return result;
      }
      return undefined;
    },
    [formState]
  );

  // Enhanced request body unpacking using type context
  const unpackRequestBody = React.useCallback(() => {
    if (!context || !("endpoint" in context)) {
      return {
        schema: undefined,
        defaultValues: undefined,
        contentType: undefined,
        isRequired: false,
        properties: [],
      };
    }

    const requestBody = context.endpoint.requests?.[0]?.body;
    if (!requestBody) {
      return {
        schema: undefined,
        defaultValues: undefined,
        contentType: undefined,
        isRequired: false,
        properties: [],
      };
    }

    // Resolve alias types to get the actual schema
    const resolvedRequestBody = resolveAliasType(requestBody, context.types);

    // Get default values using the existing utility
    const defaultValues = getEmptyValueForHttpRequestBody(
      requestBody,
      context.types
    );

    // Extract properties from the resolved request body schema using the new helper
    const extractedProperties = extractProperties(
      requestBody,
      [],
      context.types
    );

    PlaygroundLogger.debug("Extracted properties", {
      count: extractedProperties.length,
    });

    // Convert to the expected format and add current values and setters
    const properties = extractedProperties.map((prop) => ({
      key: prop.key,
      type: prop.type,
      description: prop.description,
      isRequired: prop.isRequired,
      defaultValue: prop.defaultValue,
      path: prop.path,
      currentValue: getRequestBodyParameter(prop.path),
      setValue: (value: unknown) => {
        setRequestBodyParameter(prop.path, value);
      },
      isArray: prop.isArray,
      isNested: prop.isNested,
      children: prop.children,
    }));

    // Determine content type based on resolved request body type
    let contentType: string | undefined;
    if (
      resolvedRequestBody.type === "object" ||
      resolvedRequestBody.type === "alias"
    ) {
      contentType = "application/json";
    } else if (resolvedRequestBody.type === "formData") {
      contentType = "multipart/form-data";
    } else if (resolvedRequestBody.type === "bytes") {
      contentType = "application/octet-stream";
    }

    PlaygroundLogger.debug("Resolved request body", {
      type: resolvedRequestBody.type,
    });

    return {
      schema: resolvedRequestBody,
      defaultValues,
      contentType,
      isRequired: true, // Assume required for now
      properties,
    };
  }, [context, getRequestBodyParameter, setRequestBodyParameter]);

  // Simplified response analysis
  const responseAnalysis = React.useMemo(() => {
    PlaygroundLogger.responseAnalysis({ responseType: response.type });
    if (response.type !== "loaded") {
      return {
        isSuccess: false,
        statusCode: undefined,
        statusText: undefined,
        responseTime: undefined,
        responseSize: undefined,
        contentType: undefined,
        hasErrors: false,
        errorDetails: {
          type: "none" as const,
          message: undefined,
          details: undefined,
        },
        responseBody: undefined,
        responseHeaders: undefined,
        requestUrl: undefined,
        requestMethod: undefined,
      };
    }

    const responseData = response.value;
    const statusCode = responseData.response?.status;
    const isSuccess = statusCode >= 200 && statusCode < 300;

    let errorType:
      | "http_error"
      | "network_error"
      | "parsing_error"
      | "validation_error"
      | "none" = "none";
    let errorMessage: string | undefined;

    if (!isSuccess) {
      if (statusCode >= 400 && statusCode < 500) {
        errorType = "http_error";
        errorMessage = `HTTP ${statusCode} Error`;
      } else if (statusCode >= 500) {
        errorType = "http_error";
        errorMessage = `Server Error ${statusCode}`;
      }
    }

    const responseBody = responseData.response?.body;
    const responseHeaders =
      "headers" in responseData.response
        ? responseData.response.headers
        : undefined;
    const requestUrl =
      "url" in responseData.response ? responseData.response.url : undefined;
    const statusText =
      "statusText" in responseData.response
        ? responseData.response.statusText
        : undefined;
    const responseSize =
      "size" in responseData ? responseData.size || undefined : undefined;
    const contentType =
      "contentType" in responseData ? responseData.contentType : undefined;

    return {
      isSuccess,
      statusCode,
      statusText,
      responseTime: responseData.time,
      responseSize,
      contentType,
      hasErrors: !isSuccess,
      errorDetails: {
        type: errorType,
        message: errorMessage,
        details: undefined,
      },
      responseBody,
      responseHeaders,
      requestUrl,
      requestMethod:
        context && "endpoint" in context ? context.endpoint.method : undefined,
    };
  }, [response, context]);

  // Simplified debug info
  const getResponseDebugInfo = React.useCallback(() => {
    const requestUrl =
      context && "endpoint" in context ? `${context.endpoint.path}` : undefined;

    const suggestions: string[] = [];

    if (responseAnalysis.hasErrors && responseAnalysis.statusCode) {
      if (responseAnalysis.statusCode === 401) {
        suggestions.push("Check authentication credentials");
        suggestions.push("Verify API key or bearer token");
      } else if (responseAnalysis.statusCode === 403) {
        suggestions.push("Check permissions and access rights");
      } else if (responseAnalysis.statusCode === 404) {
        suggestions.push("Verify the endpoint URL is correct");
        suggestions.push("Check if the resource exists");
      } else if (responseAnalysis.statusCode === 422) {
        suggestions.push("Validate request body format");
        suggestions.push("Check required fields are provided");
      } else if (responseAnalysis.statusCode >= 500) {
        suggestions.push("This appears to be a server error");
        suggestions.push("Try again later or contact support");
      }
    }

    return {
      request: {
        url: requestUrl,
        method:
          context && "endpoint" in context
            ? context.endpoint.method
            : undefined,
        headers: formState.headers || {},
        body: formState.type === "endpoint" ? formState.body : undefined,
      },
      response: {
        status: responseAnalysis.statusCode,
        headers: responseAnalysis.responseHeaders,
        body: responseAnalysis.responseBody,
        time: responseAnalysis.responseTime,
        size: responseAnalysis.responseSize,
      },
      analysis: {
        isSuccess: responseAnalysis.isSuccess,
        hasErrors: responseAnalysis.hasErrors,
        errorType: responseAnalysis.errorDetails.type,
        suggestions,
      },
    };
  }, [responseAnalysis, context, formState]);

  // Simplified available values
  const availableValues = React.useMemo(() => {
    // Body value is already clean since we remove empty properties
    const bodyValue =
      formState.type === "endpoint" ? formState.body?.value : undefined;

    const baseValues = {
      headers: formState.headers || {},
      pathParameters: formState.pathParameters || {},
      queryParameters: formState.queryParameters || {},
      body: bodyValue,
    };

    // Add auth information if available
    const auth = context && "auth" in context ? context.auth : undefined;

    return {
      ...baseValues,
      auth: auth
        ? {
            bearerToken:
              auth.type === "bearerAuth" ? auth.tokenName : undefined,
            basicAuth:
              auth.type === "basicAuth"
                ? {
                    username: auth.usernameName || "username",
                    password: auth.passwordName || "password",
                  }
                : undefined,
            headerAuth:
              auth.type === "header"
                ? {
                    [auth.headerWireValue]:
                      auth.nameOverride || auth.headerWireValue,
                  }
                : undefined,
          }
        : undefined,
    };
  }, [formState, context]);

  const value = React.useMemo(
    () => ({
      formState,
      setFormState,
      response,
      setResponse,
      context,
      sendRequest,
      resetWithExample,
      resetWithoutExample,
      availableValues,
      setHeader,
      setPathParameter,
      setQueryParameter,
      setBody,
      setAuth,
      responseAnalysis,
      getAvailablePathParameters,
      getAvailableQueryParameters,
      getAvailableHeaders,
      getRequestBodySchema,
      unpackRequestBody,
      setRequestBodyParameter,
      getRequestBodyParameter,
      unpackResponseBody: () => ({
        schema: undefined,
        contentType: undefined,
        properties: [],
        responseBody: undefined,
        responseHeaders: undefined,
      }),
      setResponseParameter: noop,
      setResponseHeader: noop,
      getResponseParameter: () => undefined,
      getResponseDebugInfo,
    }),
    [
      formState,
      setFormState,
      response,
      setResponse,
      context,
      sendRequest,
      resetWithExample,
      resetWithoutExample,
      availableValues,
      setHeader,
      setPathParameter,
      setQueryParameter,
      setBody,
      setAuth,
      responseAnalysis,
      getAvailablePathParameters,
      getAvailableQueryParameters,
      getAvailableHeaders,
      getRequestBodySchema,
      unpackRequestBody,
      getResponseDebugInfo,
      setRequestBodyParameter,
      getRequestBodyParameter,
    ]
  );

  return (
    <PlaygroundContext.Provider value={value}>
      {children}
    </PlaygroundContext.Provider>
  );
}

export function usePlaygroundContext() {
  return React.useContext(PlaygroundContext);
}
