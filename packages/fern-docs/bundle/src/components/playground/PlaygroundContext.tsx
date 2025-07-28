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
} from "./types";
import { PlaygroundResponse } from "./types/playgroundResponse";

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
  const setHeader = React.useCallback(
    (key: string, value: unknown) => {
      setFormState({
        ...formState,
        headers: {
          ...formState.headers,
          [key]: value,
        },
      });
    },
    [formState, setFormState]
  );

  const setPathParameter = React.useCallback(
    (key: string, value: unknown) => {
      setFormState({
        ...formState,
        pathParameters: {
          ...formState.pathParameters,
          [key]: value,
        },
      });
    },
    [formState, setFormState]
  );

  const setQueryParameter = React.useCallback(
    (key: string, value: unknown) => {
      setFormState({
        ...formState,
        queryParameters: {
          ...formState.queryParameters,
          [key]: value,
        },
      });
    },
    [formState, setFormState]
  );

  const setBody = React.useCallback(
    (body: unknown) => {
      if (formState.type === "endpoint") {
        setFormState({
          ...formState,
          body: body as PlaygroundEndpointRequestFormState["body"],
        });
      }
    },
    [formState, setFormState]
  );

  const setAuth = React.useCallback(
    (auth: PlaygroundContextValue["availableValues"]["auth"]) => {
      // This would need to be implemented based on the auth state management
      // For now, this is a placeholder
      console.log("Setting auth:", auth);
    },
    []
  );

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
    // This would return available headers based on the endpoint definition
    // For now, return common headers
    return [
      "Content-Type",
      "Accept",
      "Authorization",
      "User-Agent",
      "X-Requested-With",
    ];
  }, []);

  const getRequestBodySchema = React.useCallback(() => {
    if (
      context &&
      "endpoint" in context &&
      context.endpoint.requests?.[0]?.body
    ) {
      return context.endpoint.requests[0].body;
    }
    return undefined;
  }, [context]);

  // Response analysis for debugging
  const responseAnalysis = React.useMemo(() => {
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

    // Handle different response types
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

  const availableValues = React.useMemo(() => {
    const baseValues = {
      headers: formState.headers || {},
      pathParameters: formState.pathParameters || {},
      queryParameters: formState.queryParameters || {},
      body: formState.type === "endpoint" ? formState.body : undefined,
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
      getResponseDebugInfo,
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
