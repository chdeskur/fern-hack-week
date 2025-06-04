import "server-only";

import { after } from "next/server";

import { kv } from "@vercel/kv";
import { createHash } from "crypto";
import { mapKeys } from "es-toolkit/object";
import fs from "fs";
import { gracefulify } from "graceful-fs";
import { bundleMDX } from "mdx-bundler";
import path from "path";
import rehypeKatex from "rehype-katex";
import remarkFrontmatter from "remark-frontmatter";
import remarkGemoji from "remark-gemoji";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import remarkSmartypants from "remark-smartypants";
import remarkSqueezeParagraphs from "remark-squeeze-paragraphs";
import { noop } from "ts-essentials";

import type * as FernDocs from "@fern-api/fdr-sdk/docs";
import {
  Hast,
  type PluggableList,
  customHeadingHandler,
  sanitizeBreaks,
  sanitizeMdxExpression,
} from "@fern-docs/mdx";
import {
  rehypeAcornErrorBoundary,
  rehypeExpressionToMd,
  rehypeMdxClassStyle,
  rehypeSlug,
  rehypeToc,
  remarkInjectEsm,
  remarkSanitizeAcorn,
} from "@fern-docs/mdx/plugins";

import { DocsLoader } from "@/server/docs-loader";
import { isLocal } from "@/server/isLocal";
import { FileData } from "@/server/types";

import { getMDXExport } from "../get-mdx-export";
import { rehypeAccordionNestedHeaders } from "../plugins/rehype-accordion-nested-headers";
import { rehypeAccordions } from "../plugins/rehype-accordions";
import { rehypeButtons } from "../plugins/rehype-buttons";
import { rehypeCards } from "../plugins/rehype-cards";
import { rehypeCodeBlock } from "../plugins/rehype-code-block";
import { rehypeCollectJsx } from "../plugins/rehype-collect-jsx";
import { rehypeEndpointExampleSnippets } from "../plugins/rehype-endpoint-example-snippets";
import { rehypeEndpointSchemaSnippets } from "../plugins/rehype-endpoint-schema-snippet";
import { rehypeExtractAsides } from "../plugins/rehype-extract-asides";
import { rehypeFiles } from "../plugins/rehype-files";
import { RehypeLinksOptions, rehypeLinks } from "../plugins/rehype-links";
import { rehypeMigrateJsx } from "../plugins/rehype-migrate-jsx";
import { rehypeSteps } from "../plugins/rehype-steps";
import { rehypeTabs } from "../plugins/rehype-tabs";
import { remarkExtractTitle } from "../plugins/remark-extract-title";

// gracefulify fs to avoid EMFILE errors on Vercel
gracefulify(fs);

const TWOSLASH_TIMEOUT = 240_000;
const SERIALIZATION_TIMEOUT = 10_000;

export interface SerializeMdxResponse {
  code: string;
  frontmatter?: Partial<FernDocs.Frontmatter>;
  jsxElements: string[];
}

async function serializeMdxImpl(
  content: string,
  {
    loader,
    filename,
    scope,
    toc = false,
    replaceHref,
    domain,
  }: {
    loader?: Partial<Pick<DocsLoader, "getFiles" | "getMdxBundlerFiles">>;
    scope?: Record<string, unknown>;
    filename?: string;
    toc?: boolean;
    replaceHref?: RehypeLinksOptions["replaceHref"];
    domain?: string;
  } = {}
): Promise<SerializeMdxResponse> {
  content = sanitizeBreaks(content);
  content = sanitizeMdxExpression(content)[0];

  // Process twoslash blocks if present
  content = await processTwoslashBlocks(content, domain ?? "twoslash");

  let cwd: string | undefined;
  if (filename != null) {
    try {
      cwd = path.dirname(filename);
    } catch {
      console.error("Failed to get cwd from filename", filename);
    }
  }

  if (process.platform === "win32") {
    process.env.ESBUILD_BINARY_PATH = path.join(
      process.cwd(),
      "node_modules",
      "esbuild",
      "esbuild.exe"
    );
  } else {
    process.env.ESBUILD_BINARY_PATH = path.join(
      process.cwd(),
      "node_modules",
      "esbuild",
      "bin",
      "esbuild"
    );
  }

  let files: Record<string, string> = {};
  let remoteFiles: Record<string, FileData> = {};
  const jsxElements: string[] = [];

  remoteFiles = (await loader?.getFiles?.()) ?? {};
  files = (await loader?.getMdxBundlerFiles?.()) ?? {};
  files = mapKeys(files ?? {}, (_file, filename) => {
    if (cwd != null) {
      return path.relative(cwd, filename);
    }
    return filename;
  });

  const bundled = await bundleMDX({
    source: content,
    files,

    globals: {
      "@mdx-js/react": {
        varName: "MdxJsReact",
        namedExports: ["useMDXComponents"],
        defaultExport: false,
      },
    },

    mdxOptions: (o) => {
      o.remarkRehypeOptions = {
        handlers: { heading: customHeadingHandler },
      };

      o.providerImportSource = "@mdx-js/react";

      const remarkPlugins: PluggableList = [
        remarkFrontmatter,
        remarkExtractTitle,
        [remarkMdxFrontmatter, { name: "frontmatter" }],
        remarkSqueezeParagraphs,
        [remarkInjectEsm, { scope }],
        [remarkSanitizeAcorn],
        remarkGfm,
        remarkSmartypants,
        remarkMath,
        remarkGemoji,
      ];

      const rehypePlugins: PluggableList = [
        rehypeKatex,
        [rehypeFiles, { files: remoteFiles }],
        rehypeMdxClassStyle,
        rehypeCodeBlock,
        rehypeSteps,
        rehypeAccordions,
        rehypeTabs,
        rehypeCards,
        [rehypeSlug, { additionalJsxElements: ["Step", "Accordion", "Tab"] }],
        [rehypeLinks, { replaceHref }],
        rehypeAccordionNestedHeaders,
        [
          rehypeExpressionToMd,
          {
            mdxJsxElementAllowlist: {
              Frame: ["caption"],
              Tab: ["title"],
              Card: ["title"],
              Callout: ["title"],
              Step: ["title"],
              Accordion: ["title"],
            },
          },
        ],
        rehypeButtons,
        [rehypeEndpointSchemaSnippets, { loader }],
        [rehypeEndpointExampleSnippets, { loader }],
        [
          rehypeMigrateJsx,
          {
            a: "A",
            h1: "H1",
            h2: "H2",
            h3: "H3",
            h4: "H4",
            h5: "H5",
            h6: "H6",
            img: "Image",
            li: "Li",
            ol: "Ol",
            strong: "Strong",
            table: "Table",
            ul: "Ul",
          },
        ],
        toc ? rehypeToc : noop,
        rehypeAcornErrorBoundary,
        [
          rehypeCollectJsx,
          {
            collect: (jsxElements_: string[]) => {
              jsxElements.push(...jsxElements_);
            },
          },
        ],

        rehypeExtractAsides,
        rehypeLog,
      ];

      o.remarkPlugins = remarkPlugins;
      o.rehypePlugins = rehypePlugins;

      o.development = process.env.NODE_ENV === "development";

      return o;
    },

    esbuildOptions: (o) => {
      o.minify = process.env.NODE_ENV === "production";
      o.sourcemap = false;

      o.logLevel = "error"; // Reduce logging overhead

      o.logLimit = 0; // Disable logging to reduce file operations
      o.metafile = false; // Don't generate metafile (reduces file operations)

      // Add write to memory instead of disk when possible
      o.write = false;

      // Create a restricted define object that excludes process.env
      const restrictedDefine = {
        "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
      };

      o.define = restrictedDefine;

      // Prevent direct process access
      o.inject = o.inject?.filter((path) => !path.includes("process"));

      return o;
    },
  });

  if (bundled.errors.length > 0) {
    bundled.errors.forEach((error) => {
      console.error(error);
    });
    console.debug("content", content, "code", bundled.code);
  }

  const frontmatter = getMDXExport(bundled)?.frontmatter as
    | Partial<FernDocs.Frontmatter>
    | undefined;

  // TODO: this is doing duplicate work; figure out how to combine it with the compiler above.
  // const { jsxElements } = toTree(content, { sanitize: false });

  return { code: bundled.code, frontmatter, jsxElements };
}

export function serializeMdx(
  content: string | undefined,
  options?: Parameters<typeof serializeMdxImpl>[1]
): Promise<SerializeMdxResponse | undefined> {
  const abortController = new AbortController();
  const { signal } = abortController;

  return new Promise<SerializeMdxResponse | undefined>((resolve, reject) => {
    if (!content?.trimStart().length) {
      resolve(undefined);
      return;
    }

    let serializeTimeout = SERIALIZATION_TIMEOUT;
    if (content.includes("twoslash")) {
      serializeTimeout = TWOSLASH_TIMEOUT;
    }

    const timeoutId = setTimeout(() => {
      if (!signal.aborted) {
        abortController.abort();
        console.error(
          `Serialize MDX timed out after ${serializeTimeout / 1000} seconds`
        );
        reject(new Error("Serialize MDX timed out"));
      }
    }, serializeTimeout);

    serializeMdxImpl(content, { ...options }).then(
      (result) => {
        clearTimeout(timeoutId);
        resolve(result);
      },
      (error: unknown) => {
        clearTimeout(timeoutId);
        reject(error instanceof Error ? error : new Error(String(error)));
        console.error(error);
      }
    );
  });
}

// uncomment this to log the tree to the console in localhost only (DO NOT COMMIT)
function rehypeLog() {
  return (_tree: Hast.Root) => {
    // console.debug(JSON.stringify(tree));
  };
}

function getMdxBundlerService() {
  return (
    process.env.NEXT_PUBLIC_MDX_BUNDLER_ORIGIN ??
    "https://mdx-bundler-dev2.buildwithfern.com"
  );
}

// if no domain is provided, store in a twoslash cache
// if block fails to process, returns the original code, unformatted
async function processTwoslashBlocks(
  content: string,
  domain: string
): Promise<string> {
  if (
    !(
      content.includes("```ts twoslash") || content.includes("```tsx twoslash")
    ) ||
    process.env.NEXT_PUBLIC_TWOSLASH_ENABLED !== "1"
  ) {
    return content;
  }

  const originalContent = content;

  // Extract all twoslash code blocks
  const twoslashRegex = /```(?:ts|tsx) twoslash(?:[^`\n]*?)\n([\s\S]*?)\n```/g;
  const twoslashBlocks: { fullMatch: string; codeContent: string }[] = [];

  let match;
  while ((match = twoslashRegex.exec(originalContent)) != null) {
    if (match[0] && match[1]) {
      const fullMatch = match[0];
      const codeContent = match[1].trim();
      const endIndex = fullMatch.lastIndexOf("```");
      const actualFullMatch = fullMatch.substring(0, endIndex + 3);

      twoslashBlocks.push({
        fullMatch: actualFullMatch,
        codeContent,
      });
    }
  }

  if (twoslashBlocks.length === 0) {
    return content;
  }

  // Process all blocks within TwoSlash timeout limit (leave time for serialization fallback)
  const timeoutPromise = new Promise((_, reject) =>
    setTimeout(
      () =>
        reject(new Error("TwoSlash processing timed out after 200 seconds")),
      TWOSLASH_TIMEOUT - SERIALIZATION_TIMEOUT
    )
  );

  try {
    await Promise.race([
      Promise.all(
        twoslashBlocks.map(async (block) => {
          const ignoreErrors = block.codeContent.includes("noErrors")
            ? ""
            : "// @noErrors\n";

          const serviceContent = `\`\`\`${block.fullMatch.includes("tsx") ? "tsx" : "ts"} twoslash\n${ignoreErrors}${block.codeContent}\n\`\`\``;

          try {
            let result;
            const cached = await kvGet(domain, `twoslash:${block.codeContent}`);

            if (cached != null) {
              result = cached.value;
            } else {
              console.log("Sending request to serialize service...");
              const response = await fetch(
                `${getMdxBundlerService()}/serialize`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ code: serviceContent }),
                }
              );

              if (!response.ok) {
                console.error(
                  "Serialize service returned error:",
                  response.statusText
                );
                throw new Error(
                  `Failed to serialize TwoSlash: ${response.statusText}`
                );
              }

              result = await response.json();
              kvSet(domain, `twoslash:${block.codeContent}`, result);
            }

            // Replace only this specific block
            const twoSlashContent = {
              code: result.code,
              jsxElements: result.jsxElements || [],
            };
            content = content.replace(
              block.fullMatch,
              `<TwoSlash content={${JSON.stringify(twoSlashContent)}} />`
            );

            if (content.includes("<CodeBlocks>")) {
              content = content.replace(
                /<CodeBlocks>[\s\S]*?<TwoSlash/,
                "<TwoSlash"
              );
              content = content.replace(/\/>[\s\S]*?<\/CodeBlocks>/, "/>");
            }
          } catch (error) {
            console.error("Error processing twoslash block:", error);
          }
        })
      ),
      timeoutPromise,
    ]);
  } catch (error) {
    console.error("TwoSlash processing timed out:", error);
  }

  return content;
}

const TWOSLASH_SEMANTIC_VERSION = "1";

function hashKey(key: string): string {
  return createHash("sha256").update(key).digest("hex");
}

function kvSet(domain: string, key: string, value: unknown) {
  if (isLocal()) {
    return;
  }

  after(async () => {
    try {
      const hashedKey = hashKey(key);
      await kv.hset(domain, {
        [hashedKey]: {
          value: value,
          version: TWOSLASH_SEMANTIC_VERSION,
          createdAt: new Date().toISOString(),
        },
      });
    } catch (error) {
      console.warn(`Failed to set kv key ${key}: ${value}`, error);
    }
  });
}

async function kvGet(
  domain: string,
  key: string
): Promise<Record<string, string> | null> {
  if (isLocal()) {
    return null;
  }

  try {
    const hashedKey = hashKey(key);
    const cached = await kv.hget<Record<string, string>>(domain, hashedKey);
    if (cached && cached.version === TWOSLASH_SEMANTIC_VERSION) {
      return cached;
    }

    console.debug(`Could not find key ${key}. Using MDX service instead...`);
    return null;
  } catch (error) {
    console.warn(`Failed to get kv key ${key}`, error);
    return null;
  }
}
