import { execa } from "execa";
import { describe, expect, it } from "vitest";

import { SELF_HOSTED_CONTAINER_NAME } from "./setupSelfHostedDocs";

describe("Self-hosted docs has a running Postgres instance", () => {
  it("should pass", async () => {
    const { stdout: containerId } = await execa("docker", [
      "ps",
      "-q",
      "--filter",
      "name=" + SELF_HOSTED_CONTAINER_NAME,
    ]);
    expect(containerId).toBeTruthy();

    const { stdout: postgresStatus } = await execa("docker", [
      "exec",
      containerId,
      "pg_isready",
      "-U",
      "postgres",
      "-d",
      "postgres",
    ]);
    expect(postgresStatus).toContain("accepting connections");
  });
});
