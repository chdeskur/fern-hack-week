import crypto from "crypto";
import { resolve } from "path";
import { loadEnv } from "vite";
import { defineConfig } from "vitest/config";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    test: {
      globals: true,
      env: {
        WORKOS_API_KEY: "workos_test_api_key",
        WORKOS_CLIENT_ID: "workos_test_client_id",
        JWT_SECRET_KEY: crypto.randomBytes(16).toString("hex"),
        NEXT_PUBLIC_OPENAI_API_KEY: env.NEXT_PUBLIC_OPENAI_API_KEY,
      },
      include: ["src/**/*.eval.{js,ts}"],
    },
    resolve: {
      alias: {
        "@": resolve(__dirname, "./src"),
      },
    },
  };
});
