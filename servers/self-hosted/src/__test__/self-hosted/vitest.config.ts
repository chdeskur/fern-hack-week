import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    globalSetup: ["src/__test__/self-hosted/setupSelfHostedDocs.ts"],
    teardownTimeout: 30000,
  },
});
