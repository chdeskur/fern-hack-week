"use client";

import { useMemo } from "react";

import { tool } from "ai";

import { usePlaygroundContext } from "./PlaygroundContext";
import { playgroundToolSchemas } from "./PlaygroundTools";

export function usePlaygroundTools() {
  const playground = usePlaygroundContext();

  return useMemo(
    () => ({
      setHeader: tool({
        description: "Set a header value for the API request",
        inputSchema: playgroundToolSchemas.setHeader,
        execute: async ({ key, value }: { key: string; value: string }) => {
          playground.setHeader(key, value);
          return {
            success: true,
            message: `Header '${key}' set to '${value}'`,
          };
        },
      }),

      setPathParameter: tool({
        description: "Set a path parameter value for the API request",
        inputSchema: playgroundToolSchemas.setPathParameter,
        execute: async ({ key, value }: { key: string; value: string }) => {
          playground.setPathParameter(key, value);
          return {
            success: true,
            message: `Path parameter '${key}' set to '${value}'`,
          };
        },
      }),

      setQueryParameter: tool({
        description: "Set a query parameter value for the API request",
        inputSchema: playgroundToolSchemas.setQueryParameter,
        execute: async ({ key, value }: { key: string; value: string }) => {
          playground.setQueryParameter(key, value);
          return {
            success: true,
            message: `Query parameter '${key}' set to '${value}'`,
          };
        },
      }),

      setBody: tool({
        description: "Set the request body for the API request",
        inputSchema: playgroundToolSchemas.setBody,
        execute: async ({ body }: { body: unknown }) => {
          playground.setBody(body);
          return {
            success: true,
            message: "Request body set successfully",
            body: body,
          };
        },
      }),

      setAuth: tool({
        description: "Set authentication for the API request",
        inputSchema: playgroundToolSchemas.setAuth,
        execute: async ({ auth }: { auth: any }) => {
          playground.setAuth(auth);
          return {
            success: true,
            message: "Authentication set successfully",
            auth: auth,
          };
        },
      }),

      setRequestBodyParameter: tool({
        description:
          "Set a specific parameter within the request body using a path",
        inputSchema: playgroundToolSchemas.setRequestBodyParameter,
        execute: async ({
          path,
          value,
        }: {
          path: (string | number)[];
          value: unknown;
        }) => {
          playground.setRequestBodyParameter(path, value);
          return {
            success: true,
            message: `Body parameter at path [${path.join(", ")}] set to ${JSON.stringify(value)}`,
          };
        },
      }),

      getAvailableParameters: tool({
        description:
          "Get the list of available parameters for the current endpoint",
        inputSchema: playgroundToolSchemas.getAvailableParameters,
        execute: async ({
          type,
        }: {
          type: "headers" | "pathParameters" | "queryParameters" | "body";
        }) => {
          let parameters: string[] = [];

          switch (type) {
            case "headers":
              parameters = playground.getAvailableHeaders();
              break;
            case "pathParameters":
              parameters = playground.getAvailablePathParameters();
              break;
            case "queryParameters":
              parameters = playground.getAvailableQueryParameters();
              break;
            case "body": {
              const bodySchema = playground.getRequestBodySchema();
              if (bodySchema) {
                const unpacked = playground.unpackRequestBody();
                parameters = unpacked.properties.map((prop: any) => prop.key);
              }
              break;
            }
          }

          return {
            success: true,
            inputSchema: parameters,
            count: parameters.length,
          };
        },
      }),

      getCurrentValues: tool({
        description: "Get the current values for the specified type",
        inputSchema: playgroundToolSchemas.getCurrentValues,
        execute: async ({
          type,
        }: {
          type:
            | "headers"
            | "pathParameters"
            | "queryParameters"
            | "body"
            | "auth";
        }) => {
          const availableValues = playground.availableValues;

          switch (type) {
            case "headers":
              return {
                success: true,
                values: availableValues.headers,
              };
            case "pathParameters":
              return {
                success: true,
                values: availableValues.pathParameters,
              };
            case "queryParameters":
              return {
                success: true,
                values: availableValues.queryParameters,
              };
            case "body":
              return {
                success: true,
                values: availableValues.body,
              };
            case "auth":
              return {
                success: true,
                values: availableValues.auth,
              };
            default:
              return {
                success: false,
                error: "Invalid type specified",
              };
          }
        },
      }),

      sendRequest: tool({
        description: "Send the API request with the current configuration",
        inputSchema: playgroundToolSchemas.sendRequest,
        execute: async () => {
          try {
            await playground.sendRequest();
            return {
              success: true,
              message: "Request sent successfully",
            };
          } catch (error) {
            return {
              success: false,
              error: `Failed to send request: ${error}`,
            };
          }
        },
      }),

      resetPlayground: tool({
        description: "Reset the playground to its initial state",
        inputSchema: playgroundToolSchemas.resetPlayground,
        execute: async ({ withExample = false }: { withExample?: boolean }) => {
          if (withExample) {
            playground.resetWithExample();
          } else {
            playground.resetWithoutExample();
          }
          return {
            success: true,
            message: `Playground reset ${withExample ? "with" : "without"} example values`,
          };
        },
      }),

      getResponseAnalysis: tool({
        description: "Get analysis of the last response",
        inputSchema: playgroundToolSchemas.getResponseAnalysis,
        execute: async () => {
          const analysis = playground.responseAnalysis;
          return {
            success: true,
            analysis: analysis,
          };
        },
      }),

      getDebugInfo: tool({
        description:
          "Get debug information about the current request and response",
        inputSchema: playgroundToolSchemas.getDebugInfo,
        execute: async () => {
          const debugInfo = playground.getResponseDebugInfo();
          return {
            success: true,
            debugInfo: debugInfo,
          };
        },
      }),

      getRequestBodySchema: tool({
        description: "Get the schema for the request body",
        inputSchema: playgroundToolSchemas.getRequestBodySchema,
        execute: async () => {
          const schema = playground.getRequestBodySchema();
          return {
            success: true,
            schema: schema,
          };
        },
      }),

      unpackRequestBody: tool({
        description:
          "Get detailed information about the request body structure",
        inputSchema: playgroundToolSchemas.unpackRequestBody,
        execute: async () => {
          const unpacked = playground.unpackRequestBody();
          return {
            success: true,
            unpacked: unpacked,
          };
        },
      }),
    }),
    [playground]
  );
}
