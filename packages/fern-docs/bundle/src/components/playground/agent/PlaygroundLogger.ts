// Structured logging utility for chat agent integration
export const PlaygroundLogger = {
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