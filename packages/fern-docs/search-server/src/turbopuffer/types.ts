import { z } from "zod";

export const TurbopufferAttributeDataSchema = z.union([
  z.string(), // string
  z.number().positive().int(), // uint
  z.string().uuid(), // uuid
  z.boolean(), // bool
  z.array(z.string()), // []string
  z.array(z.number().positive().int()), // []uint
  z.array(z.string().uuid()), // []uuid
]);

export type TurbopufferAttributeData = z.infer<
  typeof TurbopufferAttributeDataSchema
>;

export const TurbopufferRecordSchema = z.object({
  id: z.string(),
  vector: z.array(z.number()).optional(),
  attributes: z.object({
    type: z.union([z.literal("markdown"), z.literal("api-reference")]),
    chunk: z.string(),
    domain: z.string(),
    pathname: z.string(),
    version: z.string().optional(),
    title: z.string(),
    hash: z.string().optional(),
    description: z.string().optional(),
    page_position: z.number().optional(),
    keywords: z.union([z.string(), z.array(z.string())]).optional(),
    authed: z.boolean().optional(),

    // API reference
    api_definition_id: z.string().optional(),
    api_endpoint_id: z.string().optional(),
    api_type: z.enum(["http", "webhook", "websocket"]).optional(),
    method: z.enum(["GET", "POST", "PUT", "PATCH", "DELETE"]).optional(),
    endpoint_path: z.string().optional(),
    endpoint_path_alternates: z.array(z.string()).optional(),
    response_type: z.enum(["stream", "file", "json"]).optional(),
    environments: z.array(z.string()).optional(),
    default_environment_id: z.string().optional(),
    code_snippets: z.array(z.string()).optional(),
  }),
});

export type TurbopufferRecord = z.infer<typeof TurbopufferRecordSchema>;
export type TurbopufferAttributes = TurbopufferRecord["attributes"];

export type TurbopufferRecordWithoutVector = Omit<TurbopufferRecord, "vector">;

export const FernTurbopufferAttributeSchema: Record<
  keyof TurbopufferAttributes,
  {
    type:
      | "string"
      | "uint"
      | "uuid"
      | "bool"
      | "[]string"
      | "[]uint"
      | "[]uuid";
    filterable: boolean;
    bm25: boolean;
  }
> = {
  chunk: {
    type: "string",
    filterable: false,
    bm25: true,
  },
  type: {
    type: "string",
    filterable: true,
    bm25: false,
  },
  domain: {
    type: "string",
    filterable: true,
    bm25: false,
  },
  authed: {
    type: "bool",
    filterable: true,
    bm25: false,
  },
  title: {
    type: "string",
    filterable: false,
    bm25: true,
  },
  pathname: {
    type: "string",
    filterable: true,
    bm25: true,
  },
  hash: {
    type: "string",
    filterable: false,
    bm25: true,
  },
  description: {
    type: "string",
    filterable: false,
    bm25: false,
  },
  version: {
    type: "string",
    filterable: true,
    bm25: true,
  },
  keywords: {
    type: "string",
    filterable: false,
    bm25: true,
  },
  page_position: {
    type: "uint",
    filterable: true,
    bm25: false,
  },
  api_definition_id: {
    type: "string",
    filterable: true,
    bm25: false,
  },
  api_endpoint_id: {
    type: "string",
    filterable: true,
    bm25: false,
  },
  api_type: {
    type: "string",
    filterable: true,
    bm25: false,
  },
  method: {
    type: "string",
    filterable: true,
    bm25: true,
  },
  endpoint_path: {
    type: "string",
    filterable: true,
    bm25: true,
  },
  endpoint_path_alternates: {
    type: "[]string",
    filterable: false,
    bm25: true,
  },
  response_type: {
    type: "string",
    filterable: true,
    bm25: false,
  },
  environments: {
    type: "[]string",
    filterable: false,
    bm25: false,
  },
  default_environment_id: {
    type: "string",
    filterable: true,
    bm25: false,
  },
  code_snippets: {
    type: "[]string",
    filterable: false,
    bm25: false,
  },
};
