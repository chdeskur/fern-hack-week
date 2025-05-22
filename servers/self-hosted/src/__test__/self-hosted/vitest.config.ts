import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    globalSetup: ["src/__test__/self-hosted/setupSelfHostedDocs.ts"],
    setupTimeout: 30000,
    teardownTimeout: 30000,
  },
});
