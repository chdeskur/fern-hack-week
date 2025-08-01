// Structured logging utility for chat agent integration
export const PlaygroundLogger = {
  debug: (message: string, data?: any) => {
    if (process.env.NODE_ENV === "development") {
      data
        ? console.log(`[Playground] ${message}`, data)
        : console.log(`[Playground] ${message}`);
    }
  },

  info: (message: string, data?: any) => {
    data
      ? console.log(`[Playground] ${message}`, data)
      : console.log(`[Playground] ${message}`);
  },

  warn: (message: string, data?: any) => {
    data
      ? console.warn(`[Playground] ${message}`, data)
      : console.warn(`[Playground] ${message}`);
  },

  error: (message: string, error?: any) => {
    error
      ? console.error(`[Playground] ${message}`, error)
      : console.error(`[Playground] ${message}`);
  },
  // Log parameter updates
  parameterUpdate: (
    type: "header" | "path" | "query" | "body",
    key: string,
    value: any
  ) => {
    PlaygroundLogger.debug(`${type} parameter updated`, { key, value });
  },

  // Log response analysis for debugging
  responseAnalysis: (analysis: any) => {
    PlaygroundLogger.debug("Response analysis", analysis);
  },
};
