import { createHash } from "crypto";

import { TurbopufferRecordWithoutVector } from "../types";
import { BaseRecord } from "./create-base-record";

interface CreateMarkdownRecordsOptions {
  base: BaseRecord;
  markdown: string;
}

export async function createMarkdownRecords({
  base,
  markdown,
}: CreateMarkdownRecordsOptions): Promise<TurbopufferRecordWithoutVector[]> {
  // TODO: make this more nuanced
  // avoid removing styling from code snippets, but remove styling from HTML tags otherwise
  const has_snippets =
    markdown.includes("```") || markdown.includes("<CodeBlocks");
  let chunked_content = [];
  if (!has_snippets) {
    chunked_content = [
      // matches on style={{...}} and style="..." and <style>...</style>
      markdown
        .replace(/style={{[^}]*}}/g, "")
        .replace(/style="[^}]*"/g, "")
        .replace(/<style>[\s\S]*?<\/style>/g, ""),
    ];
  } else {
    chunked_content = [markdown];
  }

  return chunked_content.map((chunk, i) => {
    return {
      ...base,
      id: createHash("sha256").update(`${base.id}-${i}`).digest("hex"),
      attributes: {
        ...base.attributes,
        chunk,
        title: base.attributes.title,
      },
    };
  });
}
