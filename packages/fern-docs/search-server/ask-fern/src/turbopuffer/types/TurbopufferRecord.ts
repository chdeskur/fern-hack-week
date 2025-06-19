import { z } from "zod";

export const TurbopufferRecordSchema = z.object({
  id: z.string(),
  vector: z.array(z.number()).optional(),
  attributes: z.object({
    type: z.union([z.literal("markdown"), z.literal("api-reference")]),
    domain: z.string(),
    pathname: z.string(),
    version: z.string().optional(),
    description: z.string().optional(),
    page_position: z.number().optional(),
    hash: z.string().optional(),
    keywords: z.union([z.string(), z.array(z.string())]).optional(),
    authed: z.boolean().optional(),
    chunk: z.string(),
    // Returned attributes
    title: z.string(),
    document: z.string(),
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
  page_position: {
    type: "uint",
    filterable: true,
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
  document: {
    type: "string",
    filterable: false,
    bm25: true,
  },
};
