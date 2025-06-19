import { createHash } from "crypto";
import matter from "gray-matter";

import { maybeRemoveCodeBlocks } from "../post-process/chunks/maybe-remove-code-blocks";
import { maybeRemoveDuplicateNewlines } from "../post-process/chunks/maybe-remove-duplicate-newlines";
import { maybeRemoveLongWhitespace } from "../post-process/chunks/maybe-remove-long-whitespace";
import { maybeRemoveExtraneousAttributes } from "../post-process/frontmatter/maybe-remove-extraneous-attributes";
import { maybeRemoveFrontmatterBounds } from "../post-process/frontmatter/maybe-remove-frontmatter-bounds";
import { maybeRemoveFrontMatter } from "../post-process/markdown/maybe-remove-front-matter";
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

const FRONTMATTER_PROCESSORS = [
  maybeRemoveExtraneousAttributes,
  maybeRemoveFrontmatterBounds,
];

const CHUNK_PROCESSORS = [
  ...SHARED_PROCESSORS,
  maybeRemoveDuplicateNewlines,
  maybeRemoveLongWhitespace,
  maybeRemoveCodeBlocks,
];

const MARKDOWN_PROCESSORS = [...SHARED_PROCESSORS, maybeRemoveFrontMatter];

export async function createMarkdownRecords({
  base,
  markdown,
}: {
  base: BaseRecordIr;
  markdown: string;
}): Promise<TurbopufferRecordWithoutVector[]> {
  const matteredMarkdown = matter(markdown);
  const enrichedMatteredMarkdown = enrichMarkdown(matteredMarkdown, base);
  const isChangelogEntry = base.attributes.pathname?.includes("/changelog/");

  const markdownChunks = isChangelogEntry
    ? [markdown]
    : chunkMarkdown(markdown);
  return markdownChunks.map((chunk, i) => {
    const processedChunk = isChangelogEntry
      ? matter.stringify(postProcessChunk(chunk), {
          ...enrichedMatteredMarkdown.data,
          type: "changelogForDate",
        })
      : postProcessChunk(chunk);
    return {
      ...base,
      id: createHash("sha256").update(`${base.id}-${i}`).digest("hex"),
      attributes: {
        ...base.attributes,
        chunk: processedChunk,
        title: base.attributes.title,
        document: matter.stringify(
          postProcessMarkdown(enrichedMatteredMarkdown.content),
          enrichedMatteredMarkdown.data
        ),
      },
    };
  });
}

function chunkMarkdown(markdown: string): string[] {
  const chunks: string[] = [];
  const frontmatterRegex = /---[\s\S]*?---/;
  const frontmatterMatch = markdown.match(frontmatterRegex);
  // Split frontmatter from markdown
  if (frontmatterMatch) {
    chunks.push(
      FRONTMATTER_PROCESSORS.reduce(
        (processed, processor) => processor(processed),
        frontmatterMatch[0]
      )
    );
    markdown = markdown.replace(frontmatterRegex, "");
  }

  // Split remaining markdown on ### headers
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

  return chunks;
}

function enrichMarkdown(
  matteredMarkdown: matter.GrayMatterFile<string>,
  base: BaseRecordIr
): matter.GrayMatterFile<string> {
  const attributes = ["title", "description", "keywords"];
  for (const attribute of attributes) {
    if (!matteredMarkdown.data[attribute]) {
      if (attribute in base.attributes) {
        matteredMarkdown.data[attribute] =
          base.attributes[attribute as keyof typeof base.attributes];
      }
    }
  }
  return matteredMarkdown;
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
