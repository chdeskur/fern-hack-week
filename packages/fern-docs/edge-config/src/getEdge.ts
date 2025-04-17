import { get, getAll } from "@vercel/edge-config";

import { isLocal } from "./isLocal";

export type EdgeConfigValue = Record<string, unknown> | readonly string[];

// avoid accessing the edge config within local development mode
export async function getEdge<T>(key: string): Promise<T | undefined> {
  if (isLocal()) {
    return undefined;
  }
  return get<T>(key);
}

export async function getAllEdge<T extends Record<string, unknown>>(
  keys: readonly string[]
): Promise<T | undefined> {
  if (isLocal()) {
    return undefined;
  }
  return await getAll<T>(keys as string[]);
}
