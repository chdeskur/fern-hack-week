import { z } from "zod";

// Schema for setting a header
export const setHeaderSchema = z.object({
  key: z.string().describe("The header key to set"),
  value: z.string().describe("The header value to set"),
});

// Schema for setting a path parameter
export const setPathParameterSchema = z.object({
  key: z.string().describe("The path parameter key to set"),
  value: z.string().describe("The path parameter value to set"),
});

// Schema for setting a query parameter
export const setQueryParameterSchema = z.object({
  key: z.string().describe("The query parameter key to set"),
  value: z.string().describe("The query parameter value to set"),
});

// Schema for setting the request body
export const setBodySchema = z.object({
  body: z
    .any()
    .describe("The request body to set (can be any JSON-serializable value)"),
});

// Schema for setting authentication
export const setAuthSchema = z.object({
  auth: z
    .object({
      bearerToken: z
        .string()
        .optional()
        .describe("Bearer token for authentication"),
      basicAuth: z
        .object({
          username: z.string().describe("Username for basic authentication"),
          password: z.string().describe("Password for basic authentication"),
        })
        .optional()
        .describe("Basic authentication credentials"),
      headerAuth: z
        .record(z.string(), z.string())
        .optional()
        .describe("Header-based authentication"),
    })
    .describe("Authentication configuration"),
});

// Schema for setting a nested body parameter
export const setRequestBodyParameterSchema = z.object({
  path: z
    .array(z.union([z.string(), z.number()]))
    .describe(
      "Path to the parameter in the request body (e.g., ['user', 'name'] or ['items', 0, 'id'])"
    ),
  value: z.any().describe("The value to set at the specified path"),
});

// Schema for getting available parameters
export const getAvailableParametersSchema = z.object({
  type: z
    .enum(["headers", "pathParameters", "queryParameters", "body"])
    .describe("The type of parameters to get"),
});

// Schema for getting current values
export const getCurrentValuesSchema = z.object({
  type: z
    .enum(["headers", "pathParameters", "queryParameters", "body", "auth"])
    .describe("The type of values to get"),
});

// Schema for sending the request
export const sendRequestSchema = z.object({
  // No parameters needed, just triggers the request
});

// Schema for resetting the playground
export const resetPlaygroundSchema = z.object({
  withExample: z
    .boolean()
    .optional()
    .describe("Whether to reset with example values (default: false)"),
});

// Schema for getting response analysis
export const getResponseAnalysisSchema = z.object({
  // No parameters needed, just gets the analysis
});

// Schema for getting debug information
export const getDebugInfoSchema = z.object({
  // No parameters needed, just gets debug info
});

// Schema for getting request body schema
export const getRequestBodySchemaSchema = z.object({
  // No parameters needed, just gets the schema
});

// Schema for unpacking request body
export const unpackRequestBodySchema = z.object({
  // No parameters needed, just unpacks the body
});

// Export all schemas for easy access
export const playgroundToolSchemas = {
  setHeader: setHeaderSchema,
  setPathParameter: setPathParameterSchema,
  setQueryParameter: setQueryParameterSchema,
  setBody: setBodySchema,
  setAuth: setAuthSchema,
  setRequestBodyParameter: setRequestBodyParameterSchema,
  getAvailableParameters: getAvailableParametersSchema,
  getCurrentValues: getCurrentValuesSchema,
  sendRequest: sendRequestSchema,
  resetPlayground: resetPlaygroundSchema,
  getResponseAnalysis: getResponseAnalysisSchema,
  getDebugInfo: getDebugInfoSchema,
  getRequestBodySchema: getRequestBodySchemaSchema,
  unpackRequestBody: unpackRequestBodySchema,
};
