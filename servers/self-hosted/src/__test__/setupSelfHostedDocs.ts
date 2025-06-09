import { execa } from "execa";
import path from "path";

export const SELF_HOSTED_CONTAINER_NAME = "fern-self-hosted-test";
const SELF_HOSTED_IMAGE_NAME = "fern-self-hosted";
const SELF_HOSTED_TAG = "test";
const SELF_HOSTED_IMAGE_TAG_NAME = `${SELF_HOSTED_IMAGE_NAME}:${SELF_HOSTED_TAG}`;
const SELF_HOSTED_CONTAINER_PORT = 5433;

// we have a fern folder we use for testing
const FERN_DIR = path.join(__dirname, "../../fern");

async function stopContainer(containerName: string) {
  try {
    await execa("docker", ["stop", "-t", "10", containerName]);
  } catch (_) {}
}

async function removeContainer(containerName: string) {
  try {
    await execa("docker", ["rm", "-f", containerName]);
  } catch (_) {}
}

async function removeImage(imageName: string) {
  try {
    await execa("docker", ["rmi", "-f", imageName]);
  } catch (_) {}
}

export async function setup() {
  // for redundnacy we remove the container and image before building
  await removeContainer(SELF_HOSTED_CONTAINER_NAME);
  await removeImage(SELF_HOSTED_IMAGE_TAG_NAME);

  await execa(
    "pnpm",
    ["docker:build", SELF_HOSTED_IMAGE_NAME, SELF_HOSTED_TAG],
    { stdio: "inherit" }
  );
  const { stdout: containerId } = await execa("docker", [
    "run",
    "--name",
    SELF_HOSTED_CONTAINER_NAME,
    "-d",
    "-p",
    `${SELF_HOSTED_CONTAINER_PORT}:5432`,
    "-v",
    `${FERN_DIR}:/app/fern`,
    SELF_HOSTED_IMAGE_TAG_NAME,
  ]);
  await sleep(10000);

  return async () => {
    await teardown(containerId);
  };
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function teardown(containerId: string) {
  try {
    console.log("Stopping container...", containerId);
    await stopContainer(containerId);
    await removeContainer(containerId);

    // Wait a moment before removing the image
    await new Promise((resolve) => setTimeout(resolve, 1000));

    await removeImage(SELF_HOSTED_IMAGE_TAG_NAME);

    console.log("Cleanup complete");
  } catch (error) {
    console.error("Failed to cleanup container:", error);
    try {
      // Try one final time with kill
      await execa("docker", ["kill", containerId]);
      await execa("docker", ["rm", "-f", containerId]);
      await execa("docker", ["rmi", "-f", SELF_HOSTED_IMAGE_TAG_NAME]);
    } catch (finalError) {
      throw finalError;
    }
  }
}
