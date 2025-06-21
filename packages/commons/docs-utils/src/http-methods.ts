export type HttpMethod =
  | "GET"
  | "DELETE"
  | "POST"
  | "PUT"
  | "PATCH"
  | "HEAD"
  | "OPTIONS"
  | "CONNECT"
  | "TRACE";
export const HttpMethod: Record<HttpMethod, HttpMethod> = {
  GET: "GET",
  DELETE: "DELETE",
  POST: "POST",
  PUT: "PUT",
  PATCH: "PATCH",
  HEAD: "HEAD",
  OPTIONS: "OPTIONS",
  CONNECT: "CONNECT",
  TRACE: "TRACE",
} as const;

export const HttpMethodOrder = [
  "GET",
  "POST",
  "PUT",
  "PATCH",
  "DELETE",
  "HEAD",
  "OPTIONS",
  "CONNECT",
  "TRACE",
] as const;

export function isHttpMethod(value: string): value is HttpMethod {
  return HttpMethod[value as keyof typeof HttpMethod] != null;
}

export type WssProtocol = "WSS";

export type HttpOrWss = HttpMethod | WssProtocol;
