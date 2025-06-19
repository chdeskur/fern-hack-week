import { createHash } from "crypto";

import { maybeRemoveCodeBlocks } from "../post-process/chunks/maybe-remove-code-blocks";
import { maybeRemoveDuplicateNewlines } from "../post-process/chunks/maybe-remove-duplicate-newlines";
import { maybeRemoveLongWhitespace } from "../post-process/chunks/maybe-remove-long-whitespace";
import { maybeRemoveClassNameTags } from "../post-process/shared/maybe-remove-class-name-tags";
import { maybeRemoveEmptyDivs } from "../post-process/shared/maybe-remove-empty-divs";
import { maybeRemoveExtraneousProps } from "../post-process/shared/maybe-remove-extraneous-props";
import { maybeRemoveIconTags } from "../post-process/shared/maybe-remove-icon-tags";
import { maybeRemoveStyleTags } from "../post-process/shared/maybe-remove-style-tags";
import { maybeRemoveWrappingTags } from "../post-process/shared/maybe-remove-wrapping-tags";
import { maybeReplaceCarriageReturns } from "../post-process/shared/maybe-replace-carriage-returns";
import { BaseRecordIr, TurbopufferRecordWithoutVector } from "../types";

const SHARED_PROCESSORS = [
  maybeReplaceCarriageReturns,
  maybeRemoveStyleTags,
  maybeRemoveClassNameTags,
  maybeRemoveEmptyDivs,
  maybeRemoveIconTags,
  maybeRemoveExtraneousProps,
  maybeRemoveWrappingTags,
];

const CHUNK_PROCESSORS = [
  ...SHARED_PROCESSORS,
  maybeRemoveDuplicateNewlines,
  maybeRemoveLongWhitespace,
  maybeRemoveCodeBlocks,
];

const MARKDOWN_PROCESSORS = [...SHARED_PROCESSORS];

export async function createMarkdownRecords({
  base,
  markdown,
}: {
  base: BaseRecordIr;
  markdown: string;
}): Promise<TurbopufferRecordWithoutVector[]> {
  const isChangelogEntry = base.attributes.pathname?.includes("/changelog/");

  const markdownChunks = isChangelogEntry
    ? [markdown]
    : chunkMarkdown(markdown);

  return markdownChunks.map((chunk, i) => {
    const processedChunk = postProcessChunk(chunk);
    return {
      ...base,
      id: createHash("sha256").update(`${base.id}-${i}`).digest("hex"),
      attributes: {
        ...base.attributes,
        chunk: processedChunk,
        title: base.attributes.title,
        document: postProcessMarkdown(markdown),
      },
    };
  });
}

function chunkMarkdown(markdown: string): string[] {
  const chunks: string[] = [];

  // Split on ### headers
  const sections = markdown.split(/(?=### )/);
  sections.forEach((section) => {
    if (section.trim()) {
      // Then, split on ## headers
      const subsections = section.split(/(?=## )/);
      subsections.forEach((subsection) => {
        const trimmed = subsection.trim();
        if (trimmed && !/^#+$/.test(trimmed)) {
          chunks.push(trimmed);
        }
      });
    }
  });

  // If no chunks were created (no headers found), use the entire markdown as one chunk
  if (chunks.length === 0) {
    chunks.push(markdown.trim());
  }

  return chunks;
}

function postProcessChunk(markdown: string): string {
  return CHUNK_PROCESSORS.reduce(
    (processed, processor) => processor(processed),
    markdown
  );
}

function postProcessMarkdown(markdown: string): string {
  return MARKDOWN_PROCESSORS.reduce(
    (processed, processor) => processor(processed),
    markdown
  );
}
