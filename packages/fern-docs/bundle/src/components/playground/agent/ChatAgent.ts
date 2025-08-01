import { ToolSet } from "ai";
import { z } from "zod";

import { ApiDefinition } from "@fern-api/fdr-sdk";

import {
  analyzeEndpointForSingleCall,
  callFernAi,
  classifyUserAction,
  createMultiCallPlan,
  extractEndpointSequence,
  extractParameters,
  generateResponseSummary,
} from "./ChatAgentLlms";
import { PlaygroundLogger } from "./PlaygroundLogger";

// These types help us handle responses from the agent in a structured way
// They mirror the action types for simplicity, but could be decoupled if needed
type ResponseClassification =
  | "single_call"
  | "multi_call"
  | "ask_parameters"
  | "general_response";

type ChatAgentResponse = {
  classification: ResponseClassification;
  message: ChatMessage;
  parameters?: Record<string, unknown>;
  endpointSequence?: string[];
};

export interface ChatMessage {
  role: "system" | "assistant" | "user";
  content: string;
  consent_required: boolean;
}

// State management interfaces
export type ChatAgentStatus =
  | "idle"
  | "processing"
  | "streaming"
  | "waiting_consent"
  | "waiting_response";

export interface PendingAction {
  type: "navigate" | "send_request" | "parameter_input";
  data: any;
}

export interface ChatAgentState {
  messages: ChatMessage[];
  status: ChatAgentStatus;
  currentStreamingMessage?: ChatMessage;
  pendingAction?: PendingAction;
  sequence: string[];
  errors: string[];
}

// Event system interfaces
export type ChatAgentEventType =
  | "state_changed"
  | "message_added"
  | "streaming_started"
  | "streaming_chunk"
  | "streaming_ended"
  | "consent_requested"
  | "navigation_requested"
  | "send_requested"
  | "error_occurred";

// TODO: make events typesafe
export interface ChatAgentEvent {
  type: ChatAgentEventType;
  data?: any;
}

export type ChatAgentEventListener = (event: ChatAgentEvent) => void;

interface SystemMessage extends ChatMessage {
  role: "system";
}

export function systemMessage(content: string): SystemMessage {
  return { role: "system", content, consent_required: false };
}

interface AssistantMessage extends ChatMessage {
  role: "assistant";
}

export interface ParameterState {
  name: string;
  currentValue: any;
}

export interface AvailableParameters {
  pathParameters: ParameterState[];
  queryParameters: ParameterState[];
  headers: ParameterState[];
  bodyProperties: {
    key: string;
    type: string;
    description?: string;
    path: string[];
    currentValue: any;
  }[];
}

export function assistantMessage(
  content: string,
  options?: {
    consent_required: boolean;
  }
): AssistantMessage {
  return {
    role: "assistant",
    content,
    consent_required: options?.consent_required ?? false,
  };
}

interface UserMessage extends ChatMessage {
  role: "user";
}

export function userMessage(content: string): UserMessage {
  return { role: "user", content, consent_required: false };
}

export interface ChatAgentConfig {
  additionalTools?: ToolSet;
  initialMessages?: ChatMessage[];
  apiDefinition?: ApiDefinition.ApiDefinition;
}

export class ChatAgent {
  private readonly tools: ToolSet;
  private apiDefinition?: ApiDefinition.ApiDefinition;

  // Internal state
  private _state: ChatAgentState;

  // Event system
  private _listeners = new Map<ChatAgentEventType, ChatAgentEventListener[]>();

  public get sequence(): string[] {
    return this._state.sequence;
  }

  constructor(config?: ChatAgentConfig) {
    this.apiDefinition = config?.apiDefinition;
    this.tools = {
      ...this.createApiTools(),
      ...this.createAskFernTools(),
      ...(config?.additionalTools ?? {}),
    };

    // Initialize state
    this._state = {
      messages: config?.initialMessages ?? [],
      status: "idle",
      sequence: [],
      errors: [],
    };
  }

  // State management methods
  public getState(): Readonly<ChatAgentState> {
    return { ...this._state };
  }

  private setState(newState: Partial<ChatAgentState>): void {
    const oldState = { ...this._state };
    this._state = { ...this._state, ...newState };

    // Emit state change event
    this.emit("state_changed", { oldState, newState: this._state });
  }

  // Event system methods
  public on(
    eventType: ChatAgentEventType,
    listener: ChatAgentEventListener
  ): void {
    if (!this._listeners.has(eventType)) {
      this._listeners.set(eventType, []);
    }
    const listeners = this._listeners.get(eventType);
    if (listeners) {
      listeners.push(listener);
    }
  }

  public off(
    eventType: ChatAgentEventType,
    listener: ChatAgentEventListener
  ): void {
    const listeners = this._listeners.get(eventType);
    if (listeners) {
      const index = listeners.indexOf(listener);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    }
  }

  private emit(eventType: ChatAgentEventType, data?: any): void {
    const listeners = this._listeners.get(eventType);
    if (listeners) {
      const event: ChatAgentEvent = { type: eventType, data };
      listeners.forEach((listener) => {
        try {
          listener(event);
        } catch (error) {
          PlaygroundLogger.error(
            `Error in event listener for ${eventType}:`,
            error
          );
        }
      });
    }
  }

  // Message management methods
  public addMessage(message: ChatMessage): void {
    this.setState({
      messages: [...this._state.messages, message],
    });
    this.emit("message_added", { message });
  }

  public updateStreamingMessage(content: string): void {
    if (this._state.currentStreamingMessage) {
      const updatedMessage = {
        ...this._state.currentStreamingMessage,
        content: this._state.currentStreamingMessage.content + content,
      };
      this.setState({
        currentStreamingMessage: updatedMessage,
      });
      this.emit("streaming_chunk", { content, message: updatedMessage });
    }
  }

  public startStreaming(initialContent: string = ""): void {
    const streamingMessage = assistantMessage(initialContent);
    this.setState({
      status: "streaming",
      currentStreamingMessage: streamingMessage,
    });
    this.emit("streaming_started", { message: streamingMessage });
  }

  public finishStreaming(): void {
    if (this._state.currentStreamingMessage) {
      const finalMessage = this._state.currentStreamingMessage;
      this.setState({
        messages: [...this._state.messages, finalMessage],
        status: "idle",
        currentStreamingMessage: undefined,
      });
      this.emit("streaming_ended", { message: finalMessage });
      this.emit("message_added", { message: finalMessage });
    }
  }

  // Consent and navigation methods
  public requestConsent(message: string, actionData?: any): void {
    const consentMessage = assistantMessage(message, {
      consent_required: true,
    });
    this.addMessage(consentMessage);

    // Determine action type from actionData or default to send_request
    const actionType = actionData?.type || "send_request";

    this.setState({
      status: "waiting_consent",
      pendingAction: {
        type: actionType,
        data: actionData,
      },
    });
    this.emit("consent_requested", { message: consentMessage, actionData });
  }

  public handleConsentResponse(consented: boolean): void {
    if (this._state.status !== "waiting_consent") {
      PlaygroundLogger.warn(
        "Received consent response when not waiting for consent"
      );
      return;
    }

    const pendingAction = this._state.pendingAction;
    this.setState({
      status: "idle",
      pendingAction: undefined,
    });

    if (consented && pendingAction) {
      // Emit appropriate event based on action type
      switch (pendingAction.type) {
        case "navigate": {
          // Ensure the navigation data has the correct structure for ChatInterface
          const navigationData = {
            ...pendingAction.data,
            nextEndpointId: pendingAction.data.endpointId,
          };
          this.emit("navigation_requested", navigationData);
          break;
        }
        case "send_request":
          this.emit("send_requested", pendingAction.data);
          break;
        default:
          PlaygroundLogger.warn(
            "Unknown pending action type:",
            pendingAction.type
          );
      }
    } else if (!consented) {
      const declinedMessage = assistantMessage(
        pendingAction?.type === "navigate"
          ? "Navigation cancelled. You can continue manually or I can help with other tasks."
          : "Request cancelled. Let me know if you'd like to try again with different parameters.",
        { consent_required: false }
      );
      this.addMessage(declinedMessage);
    }
  }

  public requestNavigation(explorerUrl: string, endpointId?: string): void {
    const navigationMessage = assistantMessage(
      `Would you like me to navigate to ${explorerUrl}?`,
      { consent_required: true }
    );
    this.addMessage(navigationMessage);
    this.setState({
      status: "waiting_consent",
      pendingAction: {
        type: "navigate",
        data: { explorerUrl, endpointId },
      },
    });
    this.emit("consent_requested", {
      message: navigationMessage,
      actionData: { explorerUrl, endpointId },
    });
  }

  public confirmNavigation(explorerUrl: string, endpointId?: string): void {
    if (!explorerUrl || explorerUrl.trim() === "") {
      console.error("confirmNavigation called with empty explorerUrl:", {
        explorerUrl,
        endpointId,
      });
      const errorMessage = assistantMessage(
        `Navigation failed: Could not determine URL for endpoint ${endpointId || "unknown"}. You may need to navigate manually to continue.`,
        {
          consent_required: false,
        }
      );
      this.addMessage(errorMessage);
      return;
    }

    const navigatedMessage = assistantMessage(`Navigating to ${explorerUrl}`, {
      consent_required: false,
    });
    this.addMessage(navigatedMessage);
    // Don't emit navigation_requested here - navigation is already happening!

    // Check if we're in a multi-call sequence and should automatically request the first call
    if (this._state.sequence.length > 0 && endpointId) {
      // If this navigation was for the first endpoint in sequence, request consent for the call
      if (this._state.sequence[0] === endpointId) {
        this.requestConsent(
          `Now that we're on the ${endpointId} endpoint, would you like me to make the API call?`,
          {
            type: "send_request",
            endpointId: endpointId,
            isMultiCallSequence: true,
          }
        );
      }
    }
  }

  // Response processing methods
  public setWaitingForResponse(): void {
    this.setState({ status: "waiting_response" });
  }

  public async processApiResponse(
    responseData: unknown,
    statusCode: number,
    onChunk?: (chunk: string) => void
  ): Promise<void> {
    try {
      // Generate summary with streaming support
      await this.generateSummary(responseData, statusCode, onChunk);

      // Handle sequence progression for successful responses
      if (statusCode >= 200 && statusCode < 300) {
        // Remove completed endpoint from sequence
        const newSequence = [...this._state.sequence];
        if (newSequence.length > 0) {
          newSequence.shift();
          this.setState({ sequence: newSequence });

          // If there are more endpoints, request consent to navigate to next one
          if (newSequence.length > 0) {
            const nextEndpointId = newSequence[0];
            this.requestConsent(
              `Would you like me to navigate to the next endpoint (${nextEndpointId}) to continue the sequence?`,
              {
                type: "navigate",
                endpointId: nextEndpointId,
                isMultiCallSequence: true,
                sequenceRemaining: newSequence,
              }
            );
            return;
          } else {
            // Sequence is complete
            const completionMessage = assistantMessage(
              "Multi-call sequence completed successfully! All API calls have been executed.",
              { consent_required: false }
            );
            this.addMessage(completionMessage);
          }
        }
      }

      this.setState({ status: "idle" });
    } catch (error) {
      PlaygroundLogger.error("Error processing API response:", error);
      this.setState({
        status: "idle",
        errors: [
          ...this._state.errors,
          `Response processing error: ${error instanceof Error ? error.message : "Unknown error"}`,
        ],
      });
      this.emit("error_occurred", { error, context: "response_processing" });
    }
  }

  public handleResponseError(error: any): void {
    const errorMessage = `Error during API call: ${error instanceof Error ? error.message : "Unknown error"}`;
    const errorResponse = assistantMessage(errorMessage);
    this.addMessage(errorResponse);
    this.setState({
      status: "idle",
      errors: [...this._state.errors, errorMessage],
    });
    this.emit("error_occurred", { error, context: "api_call" });
  }

  private createApiTools(): ToolSet {
    if (!this.apiDefinition) return {};

    return {
      listEndpoints: {
        description:
          "List all available API endpoints with their methods and paths",
        execute: this.listEndpoints,
      },

      getEndpointDetails: {
        description:
          "Get detailed information about a specific endpoint including parameters and request/response schemas",
        inputSchema: z.object({
          endpointId: z
            .string()
            .describe("The ID of the endpoint to get details for"),
        }),
        execute: this.getEndpointDetails,
      },
    };
  }

  private createAskFernTools(): ToolSet {
    return {
      askDocsAi: {
        description:
          "Ask a question to the Fern AI service trained on the documentation for this API domain",
        inputSchema: z.object({
          userQuery: z
            .string()
            .describe("The question to ask the Fern AI service"),
        }),
        execute: async ({ userQuery }) =>
          callFernAi({
            userQuery,
            messages: this._state.messages,
          }),
      },
    };
  }

  private listEndpoints = () => {
    const endpoints = Object.entries(this.apiDefinition?.endpoints || {}).map(
      ([id, endpoint]) => ({
        id,
        method: endpoint.method,
        displayName: endpoint.displayName,
        path:
          endpoint.path
            ?.map((part: any) =>
              part.type === "literal" ? part.value : `{${part.value}}`
            )
            .join("") || "",
        description: endpoint.description,
      })
    );
    PlaygroundLogger.debug("Listing available API endpoints", endpoints);
    return JSON.stringify(endpoints);
  };

  private getEndpointDetails = async ({
    endpointId,
  }: {
    endpointId: string;
  }) => {
    PlaygroundLogger.debug("Retrieving endpoint details", { endpointId });
    const endpoints = this.apiDefinition?.endpoints;
    if (!endpoints) {
      return "No endpoints available";
    }

    // Find endpoint by matching the ID as string
    const endpointEntry = Object.entries(endpoints).find(
      ([id, _]) => id === endpointId
    );
    if (!endpointEntry) {
      return `Endpoint with ID "${endpointId}" not found`;
    }

    const [, endpoint] = endpointEntry;
    const details = {
      id: endpointId,
      method: endpoint.method,
      path:
        endpoint.path
          ?.map((part: any) =>
            part.type === "literal" ? part.value : `{${part.value}}`
          )
          .join("") || "",
      description: endpoint.description,
      pathParameters:
        endpoint.pathParameters?.map((p: any) => ({
          key: p.key,
          description: p.description,
          type: p.valueShape?.type,
        })) || [],
      queryParameters:
        endpoint.queryParameters?.map((p: any) => ({
          key: p.key,
          description: p.description,
          type: p.valueShape?.type,
        })) || [],
      requestHeaders: [
        ...(this.apiDefinition?.globalHeaders?.map((h: any) => ({
          key: h.key,
          description: h.description,
          type: h.valueShape?.type,
        })) || []),
        ...(endpoint.requestHeaders?.map((h: any) => ({
          key: h.key,
          description: h.description,
          type: h.valueShape?.type,
        })) || []),
      ],
      requestBody: endpoint.requests?.[0]?.body
        ? {
            type: endpoint.requests[0].body.type,
          }
        : null,
      responses:
        endpoint.responses?.map((r: any) => ({
          statusCode: r.statusCode,
          description: r.description,
          type: r.body?.type,
        })) || [],
    };

    return JSON.stringify(details);
  };

  private get baseSystemPrompt() {
    return systemMessage(
      `[Date] ${new Date().toLocaleString()}

You are an intelligent AI Copilot that helps users interact with APIs. 

[Capabilities]

1. Analyze user requests to determine if they need single or multiple API calls
2. Extract parameter values from user messages
3. Generate structured parameter objects for API calls
4. Plan and execute multi-step API sequences

Always be helpful and concise. When you need more information, ask specific questions.`
    );
  }

  public getMessagesWithSystem() {
    return [this.baseSystemPrompt, ...this._state.messages];
  }

  public getMessagesWithoutSystem() {
    return [...this._state.messages];
  }

  /**
   * Main method to handle user input and determine the appropriate action
   *
   * @param userMsg - The user message to process
   * @param availableParameters - Available parameters for API calls
   * @param currentEndpointId - Current endpoint ID
   * @param apiDefinition - API definition
   * @param onChunk - Optional callback for streaming chunks (enables streaming mode)
   * @returns Promise<ChatAgentResponse> - The response with classification and message
   *
   * Usage example:
   * const response = await chatAgent.processUserMessage(
   *   userMessage("What is this API?"),
   *   undefined,
   *   undefined,
   *   apiDefinition,
   *   (chunk) => console.log("Received chunk:", chunk)
   * );
   */
  public async processUserMessage(
    userMsg: UserMessage,
    availableParameters?: AvailableParameters,
    currentEndpointId?: string,
    apiDefinition?: ApiDefinition.ApiDefinition,
    onChunk?: (chunk: string) => void
  ): Promise<ChatAgentResponse> {
    this.apiDefinition = apiDefinition;
    this.addMessage(userMsg);
    this.setState({ status: "processing" });

    // First, determine what action is needed
    const actionDecision = await classifyUserAction({
      messages: this.getMessagesWithSystem(),
      currentEndpointId,
      sequence: this.sequence,
      listEndpoints: this.listEndpoints,
    });

    // Handle different action types
    PlaygroundLogger.debug(
      `[processUserMessage] Handling action: ${actionDecision.action}`
    );
    switch (actionDecision.action) {
      case "single_call":
        return await this.handleSingleCall(
          availableParameters,
          currentEndpointId
        );
      case "multi_call":
        return await this.handleMultiCall(onChunk, currentEndpointId);
      case "ask_parameters":
        return await this.handleParameterExtraction(availableParameters);
      case "general_response":
      default:
        return await this.handleGeneralResponse(onChunk);
    }
  }

  private async handleSingleCall(
    availableParameters?: AvailableParameters,
    currentEndpointId?: string
  ): Promise<ChatAgentResponse> {
    // First, determine which endpoint should be used for this single call
    let targetEndpointId: string | undefined;
    let shouldNavigate = false;

    // Check if user's query might require a different endpoint
    if (this.apiDefinition) {
      try {
        const endpointAnalysis = await analyzeEndpointForSingleCall({
          messages: this.getMessagesWithSystem(),
          currentEndpointId,
          listEndpoints: this.listEndpoints,
        });

        if (
          endpointAnalysis.recommendedEndpointId &&
          endpointAnalysis.recommendedEndpointId !== currentEndpointId &&
          endpointAnalysis.confidence > 0.7
        ) {
          targetEndpointId = endpointAnalysis.recommendedEndpointId;
          shouldNavigate = true;
        }
      } catch (error) {
        PlaygroundLogger.warn(
          "Failed to analyze endpoint for single_call",
          error
        );
        // Continue with current endpoint on analysis failure
      }
    }

    // If we need to navigate to a different endpoint, return navigation instructions
    if (shouldNavigate && targetEndpointId) {
      // Request consent to navigate to first endpoint
      this.requestConsent(
        `I need to navigate to a different endpoint (${targetEndpointId}) to handle your request.`,
        {
          type: "navigate",
          endpointId: targetEndpointId,
          isMultiCallSequence: false,
        }
      );

      // Return the consent message
      const consentMessage = this._state.messages[
        this._state.messages.length - 1
      ] as ChatMessage;
      return {
        classification: "single_call",
        message: consentMessage,
        endpointSequence: [targetEndpointId],
      };
    }

    if (!availableParameters) {
      const response = assistantMessage(
        "I need to know what parameters are available for this endpoint."
      );
      this.addMessage(response);
      // Re-classify response as ask_parameters
      return {
        classification: "ask_parameters",
        message: response,
      };
    }

    // Check if there are actually any parameters available
    const hasAvailableParameters =
      availableParameters.pathParameters.length > 0 ||
      availableParameters.queryParameters.length > 0 ||
      availableParameters.headers.length > 0 ||
      availableParameters.bodyProperties.length > 0;

    if (!hasAvailableParameters) {
      const response = assistantMessage("I've will make an API call");
      this.addMessage(response);
      return {
        classification: "single_call",
        message: response,
        parameters: {},
      };
    }

    try {
      const parameters = await extractParameters({
        messages: this.getMessagesWithSystem(),
        availableParameters,
      });

      // Create a complete parameters object preserving existing values for missing parameters
      const completeParameters = this.createParametersObjectPreservingExisting(
        availableParameters,
        parameters
      );

      // Check if any non-empty parameters were extracted
      const hasExtractedParameters = Object.values(parameters).some(
        (value) => value && value.trim() !== ""
      );

      if (hasExtractedParameters) {
        const response = assistantMessage(
          `I've extracted the parameters from your message and will make the API call: ${JSON.stringify(completeParameters)}`
        );
        this.addMessage(response);

        // Now automatically request consent for the API call
        this.requestConsent(
          "Would you like me to proceed with this API call?",
          { parameters: completeParameters }
        );

        // Return the consent message instead of the extraction message
        const consentMessage = this._state.messages[
          this._state.messages.length - 1
        ] as ChatMessage;
        return {
          classification: "single_call",
          message: consentMessage,
          parameters: completeParameters,
        };
      } else {
        const response = assistantMessage(
          "I need more information about the parameters for this API call."
        );
        this.addMessage(response);
        this.setState({ status: "idle" });
        // Re-classify response as ask_parameters
        return {
          classification: "ask_parameters",
          message: response,
          parameters: completeParameters,
        };
      }
    } catch (error) {
      PlaygroundLogger.error(
        "Failed to extract parameters from user message",
        error
      );
      const response = assistantMessage(
        "I had trouble understanding the parameters. Could you provide them more clearly?"
      );
      this.addMessage(response);
      this.setState({ status: "idle" });

      // Even on error, return parameters object preserving existing values
      const preservedParams = this.createParametersObjectPreservingExisting(
        availableParameters,
        {}
      );
      // Re-classify response as ask_parameters
      return {
        classification: "ask_parameters",
        message: response,
        parameters: preservedParams,
      };
    }
  }

  private async handleMultiCall(
    onChunk?: (chunk: string) => void,
    currentEndpointId?: string
  ): Promise<ChatAgentResponse> {
    if (onChunk) {
      this.startStreaming();
    }

    let text = await createMultiCallPlan({
      messages: this.getMessagesWithSystem(),
      tools: this.tools,
      listEndpoints: this.listEndpoints,
      onChunk: onChunk
        ? (chunk: string) => {
            this.updateStreamingMessage(chunk);
            onChunk(chunk);
          }
        : undefined,
    });

    // Extract endpoint sequence from the plan
    const sequence = await extractEndpointSequence({
      messages: [],
      planText: text,
      listEndpoints: this.listEndpoints,
    });

    // Set the sequence in state
    this.setState({ sequence: sequence.endpoints });

    // After creating the plan, automatically start the sequence
    if (sequence.endpoints.length > 0) {
      const firstEndpointId = sequence.endpoints[0];

      // Finish streaming the plan and explanation
      if (onChunk) {
        const textPart = `\n\n${sequence.explanation}`;
        text += textPart;
        this.updateStreamingMessage(textPart);
        onChunk(textPart);
        this.finishStreaming();
      } else {
        // Add the plan message
        const planMessage = assistantMessage(
          text + `\n\n${sequence.explanation}`
        );
        this.addMessage(planMessage);
      }

      // Check if we need to navigate to the first endpoint
      if (currentEndpointId !== firstEndpointId) {
        // Request consent to navigate to first endpoint
        this.requestConsent(
          `Would you like me to navigate to the first endpoint (${firstEndpointId}) to start the sequence?`,
          {
            type: "navigate",
            endpointId: firstEndpointId,
            isMultiCallSequence: true,
          }
        );

        // Return the consent message
        const consentMessage = this._state.messages[
          this._state.messages.length - 1
        ] as ChatMessage;
        return {
          classification: "multi_call",
          message: consentMessage,
          endpointSequence: sequence.endpoints,
        };
      } else {
        // Already on the first endpoint, request consent to make the call
        this.requestConsent(
          `I'm ready to make the first API call in the sequence. Would you like me to proceed?`,
          {
            type: "send_request",
            endpointId: firstEndpointId,
            isMultiCallSequence: true,
          }
        );

        // Return the consent message
        const consentMessage = this._state.messages[
          this._state.messages.length - 1
        ] as ChatMessage;
        return {
          classification: "multi_call",
          message: consentMessage,
          endpointSequence: sequence.endpoints,
        };
      }
    }

    // If no endpoints in sequence, just return the plan message
    let finalMessage: ChatMessage;
    if (onChunk) {
      const textPart = `\n\n${sequence.explanation}`;
      text += textPart;
      this.updateStreamingMessage(textPart);
      onChunk(textPart);
      this.finishStreaming();
      finalMessage = this._state.messages[
        this._state.messages.length - 1
      ] as ChatMessage;
    } else {
      finalMessage = assistantMessage(text + `\n\n${sequence.explanation}`);
      this.addMessage(finalMessage);
    }

    this.setState({ status: "idle" });
    return {
      classification: "multi_call",
      message: finalMessage,
      endpointSequence: sequence.endpoints,
    };
  }

  private async handleParameterExtraction(
    availableParameters?: AvailableParameters
  ): Promise<ChatAgentResponse> {
    PlaygroundLogger.debug("[handleParameterExtraction] Started", {
      availableParameters,
    });

    if (!availableParameters) {
      PlaygroundLogger.debug(
        "[handleParameterExtraction] No available parameters provided"
      );
      const response = assistantMessage(
        "I need to know what parameters are available."
      );
      this.addMessage(response);
      return {
        classification: "ask_parameters",
        message: response,
      };
    }

    // Check if there are actually any parameters available
    const hasAvailableParameters =
      availableParameters.pathParameters.length > 0 ||
      availableParameters.queryParameters.length > 0 ||
      availableParameters.headers.length > 0 ||
      availableParameters.bodyProperties.length > 0;

    PlaygroundLogger.debug(
      "[handleParameterExtraction] Parameter availability check",
      {
        hasAvailableParameters,
        pathCount: availableParameters.pathParameters.length,
        queryCount: availableParameters.queryParameters.length,
        headerCount: availableParameters.headers.length,
        bodyCount: availableParameters.bodyProperties.length,
      }
    );

    if (!hasAvailableParameters) {
      PlaygroundLogger.debug(
        "[handleParameterExtraction] No parameters available, switching to single_call"
      );
      const response = assistantMessage("Making a call to the endpoint.");
      this.addMessage(response);
      // Re-classify response as single_call
      return {
        classification: "single_call",
        message: response,
      };
    }

    PlaygroundLogger.debug(
      "[handleParameterExtraction] Creating parameter schema"
    );

    try {
      PlaygroundLogger.debug(
        "[handleParameterExtraction] Starting AI parameter extraction"
      );
      const parameters = await extractParameters({
        messages: this.getMessagesWithSystem(),
        availableParameters,
      });

      // Create a complete parameters object preserving existing values for missing parameters
      const completeParameters = this.createParametersObjectPreservingExisting(
        availableParameters,
        parameters
      );

      PlaygroundLogger.debug(
        "[handleParameterExtraction] AI extracted parameters",
        {
          rawParameters: parameters,
          completeParameters,
        }
      );

      // Check if any non-empty parameters were extracted
      const hasExtractedParameters = Object.values(parameters).some(
        (value) => value && value.trim() !== ""
      );

      PlaygroundLogger.debug(
        "[handleParameterExtraction] Parameter extraction check",
        {
          hasExtractedParameters,
          parameterValues: Object.values(parameters),
        }
      );

      if (hasExtractedParameters) {
        PlaygroundLogger.debug(
          "[handleParameterExtraction] Parameters extracted successfully, returning ask_parameters response"
        );
        const response = assistantMessage(
          `I've set the following parameters: ${JSON.stringify(completeParameters)}`
        );
        this.addMessage(response);
        this.setState({ status: "idle" });
        // Keep as ask_parameters to trigger parameter setting in ChatInterface
        return {
          classification: "ask_parameters",
          message: response,
          parameters: completeParameters,
        };
      } else {
        const response = assistantMessage(
          "I couldn't find parameter values in your message. Could you be more specific?"
        );
        this.addMessage(response);
        this.setState({ status: "idle" });
        return {
          classification: "ask_parameters",
          message: response,
          parameters: completeParameters,
        };
      }
    } catch (error) {
      // Truncate long lines to first 100 characters to avoid log spam
      PlaygroundLogger.error("Parameter extraction failed", error);
      const response = assistantMessage(
        "I had trouble extracting parameters. Could you provide them more clearly?"
      );
      this.addMessage(response);
      this.setState({ status: "idle" });

      // Even on error, return parameters object preserving existing values
      const preservedParams = this.createParametersObjectPreservingExisting(
        availableParameters,
        {}
      );
      return {
        classification: "ask_parameters",
        message: response,
        parameters: preservedParams,
      };
    }
  }

  private async handleGeneralResponse(
    onChunk?: (chunk: string) => void
  ): Promise<ChatAgentResponse> {
    // Use the askDocsAi tool for general responses
    const lastUserMessage =
      this._state.messages[this._state.messages.length - 1];
    if (!lastUserMessage || lastUserMessage.role !== "user") {
      const response = assistantMessage(
        "I couldn't find your question. Could you please ask again?"
      );
      this.addMessage(response);
      return {
        classification: "general_response",
        message: response,
      };
    }

    if (onChunk) {
      this.startStreaming();
    }

    const aiResponse = await callFernAi({
      includeMessages: true,
      messages: this._state.messages,
      onChunk: onChunk
        ? (chunk: string) => {
            this.updateStreamingMessage(chunk);
            onChunk(chunk);
          }
        : undefined,
    });

    let response: AssistantMessage;
    if (onChunk) {
      this.finishStreaming();
      response = this._state.messages[
        this._state.messages.length - 1
      ] as AssistantMessage;
    } else {
      response = assistantMessage(
        aiResponse ||
          "I couldn't get a response from Fern AI. Please try again."
      );
      this.addMessage(response);
    }

    this.setState({ status: "idle" });

    return {
      classification: "general_response",
      message: response,
    };
  }

  // Helper methods

  private createParametersObjectPreservingExisting(
    availableParameters: AvailableParameters,
    extractedParameters: Record<string, string>
  ): Record<string, string> {
    const completeParams: Record<string, string> = {};

    // For path parameters, use extracted value or current value or empty string
    availableParameters.pathParameters.forEach((param) => {
      const key = `path_${param.name}`;
      const extractedValue = extractedParameters[key];
      completeParams[key] =
        extractedValue && extractedValue.trim() !== ""
          ? extractedValue
          : param.currentValue || "";
    });

    // For query parameters, use extracted value or current value or empty string
    availableParameters.queryParameters.forEach((param) => {
      const key = `query_${param.name}`;
      const extractedValue = extractedParameters[key];
      completeParams[key] =
        extractedValue && extractedValue.trim() !== ""
          ? extractedValue
          : param.currentValue || "";
    });

    // For headers, use extracted value or current value or empty string
    availableParameters.headers.forEach((header) => {
      const key = `header_${header.name}`;
      const extractedValue = extractedParameters[key];
      completeParams[key] =
        extractedValue && extractedValue.trim() !== ""
          ? extractedValue
          : header.currentValue || "";
    });

    // For body properties, use extracted value or current value or empty string
    availableParameters.bodyProperties.forEach((prop) => {
      const key = `body_${prop.key}`;
      const extractedValue = extractedParameters[key];
      completeParams[key] =
        extractedValue && extractedValue.trim() !== ""
          ? extractedValue
          : prop.currentValue || "";
    });

    return completeParams;
  }

  /**
   * Generate a summary of API response data with optional streaming support
   *
   * @param responseData - The response data to summarize
   * @param statusCode - The HTTP status code
   * @param onChunk - Optional callback for streaming chunks (enables streaming mode)
   * @returns Promise<AssistantMessage> - The summary message
   */
  public async generateSummary(
    responseData: unknown,
    statusCode: number,
    onChunk?: (chunk: string) => void
  ): Promise<AssistantMessage> {
    if (statusCode >= 200 && statusCode < 300) {
      // SUCCESS - use streaming if onChunk is provided
      if (onChunk) {
        this.startStreaming();
      }

      const summaryText = await generateResponseSummary({
        responseData,
        statusCode,
        onChunk: onChunk
          ? (chunk: string) => {
              this.updateStreamingMessage(chunk);
              onChunk(chunk);
            }
          : undefined,
      });

      if (onChunk) {
        this.finishStreaming();
        return this._state.messages[
          this._state.messages.length - 1
        ] as AssistantMessage;
      } else {
        const summary = assistantMessage(summaryText || "");
        this.addMessage(summary);
        return summary;
      }
    } else {
      // ERROR - handle streaming for error responses too
      if (onChunk) {
        this.startStreaming();
      }

      const aiResponse = await callFernAi({
        userQuery: `I received the following error response when I made a call to the API. Explain in a helpful and concise way:

  ${JSON.stringify(responseData)}
  
  IMPORTANT: I am aware that you are unable to make API calls yourself, so no need to mention that.`,
        includeMessages: true,
        messages: this._state.messages,
        onChunk: onChunk
          ? (chunk: string) => {
              this.updateStreamingMessage(chunk);
              onChunk(chunk);
            }
          : undefined,
      });

      let summary: AssistantMessage;
      if (onChunk) {
        this.finishStreaming();
        summary = this._state.messages[
          this._state.messages.length - 1
        ] as AssistantMessage;
      } else {
        summary = assistantMessage(aiResponse);
        this.addMessage(summary);
      }
      return summary;
    }
  }

  // Reset the agent's state
  public reset(): void {
    this.setState({
      messages: [],
      status: "idle",
      currentStreamingMessage: undefined,
      pendingAction: undefined,
      sequence: [],
      errors: [],
    });
  }
}

// Singleton instance for the chat agent
let singletonChatAgent: ChatAgent | null = null;

/**
 * Get the singleton ChatAgent instance.
 * This ensures only one instance exists per user session.
 */
export function getChatAgent(config?: ChatAgentConfig): ChatAgent {
  if (!singletonChatAgent) {
    singletonChatAgent = new ChatAgent(config);
  }

  return singletonChatAgent;
}

/**
 * Reset the singleton ChatAgent instance.
 * This is useful for testing or when you want to start a fresh conversation.
 */
export function resetChatAgent(): void {
  singletonChatAgent = null;
}
