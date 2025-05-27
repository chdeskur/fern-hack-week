import { execa } from "execa";
import { describe, expect, it } from "vitest";

import { SELF_HOSTED_CONTAINER_NAME } from "./setupSelfHostedDocs";

async function getContainerId() {
  const { stdout: containerId } = await execa("docker", [
    "ps",
    "-q",
    "--filter",
    "name=" + SELF_HOSTED_CONTAINER_NAME,
  ]);
  return containerId;
}

describe("Self-hosted docs has a running Postgres instance", () => {
  it("Postgres is running", async () => {
    const containerId = await getContainerId();
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

  it("fdr database exists and has tables", async () => {
    const containerId = await getContainerId();
    expect(containerId).toBeTruthy();

    const { stdout: dbList } = await execa("docker", [
      "exec",
      containerId,
      "psql",
      "-U",
      "postgres",
      "-d",
      "postgres",
      "-t",
      "-c",
      "SELECT 1 FROM pg_database WHERE datname='fdr'",
    ]);
    expect(dbList.trim()).toBe("1");

    const { stdout: tableList } = await execa("docker", [
      "exec",
      containerId,
      "psql",
      "-U",
      "postgres",
      "-d",
      "fdr",
      "-t",
      "-c",
      "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public'",
    ]);
    const tableCount = parseInt(tableList.trim());
    expect(tableCount).toBeGreaterThan(0);
  });
});

describe("Self-hosted docs has a running MinIO instance", () => {
  it("health check passes", async () => {
    const containerId = await getContainerId();
    expect(containerId).toBeTruthy();

    const { stdout: curlOutput } = await execa("docker", [
      "exec",
      containerId,
      "curl",
      "-s",
      "-o",
      "/dev/null",
      "-w",
      "%{http_code}",
      "http://localhost:9000/minio/health/live",
    ]);
    expect(curlOutput).toBe("200");
  });
});

describe("FDR server is running and api endpoints are available", () => {
  it("health check passes", async () => {
    const containerId = await getContainerId();
    expect(containerId).toBeTruthy();

    const { stdout: curlOutput } = await execa("docker", [
      "exec",
      containerId,
      "curl",
      "-s",
      "-o",
      "/dev/null",
      "-w",
      "%{http_code}",
      "http://localhost:8080/health",
    ]);
    expect(curlOutput).toBe("200");
  });
});
