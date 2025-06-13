import { createHash } from "crypto";
import matter from "gray-matter";

import { maybeRemoveStyleTags } from "../post-process/markdown/maybe-remove-style-tags";
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
  const chunkedContent: string[] = [postProcessMarkdown(markdown)];

  return chunkedContent.map((chunk, i) => {
    const matteredChunk = matter(chunk);
    const attributes = ["title", "description", "pathname", "keywords"];
    for (const attribute of attributes) {
      if (!matteredChunk.data[attribute]) {
        if (attribute in base.attributes) {
          matteredChunk.data[attribute] =
            base.attributes[attribute as keyof typeof base.attributes];
        }
      }
    }

    return {
      ...base,
      id: createHash("sha256").update(`${base.id}-${i}`).digest("hex"),
      attributes: {
        ...base.attributes,
        chunk: matter.stringify(matteredChunk.content, matteredChunk.data),
        title: base.attributes.title,
      },
    };
  });
}

function postProcessMarkdown(markdown: string): string {
  return maybeRemoveStyleTags(markdown);
}
