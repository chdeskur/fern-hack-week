import { RehypeShikiOptions } from "@shikijs/rehype";
import {
  transformerNotationDiff,
  transformerNotationFocus,
  transformerNotationHighlight,
} from "@shikijs/transformers";
import { transformerTwoslash } from "@shikijs/twoslash";
import { exec } from "child_process";
import { bundleMDX } from "mdx-bundler";
import path from "path";
import ts from "typescript";
import { promisify } from "util";

import { isNonNullish } from "@fern-api/ui-core-utils";
// import rehypeKatex from "rehype-katex";
// import remarkFrontmatter from "remark-frontmatter";
// import remarkGemoji from "remark-gemoji";
// import remarkGfm from "remark-gfm";
// import remarkMath from "remark-math";
// import remarkMdxFrontmatter from "remark-mdx-frontmatter";
// import remarkSmartypants from "remark-smartypants";
// import remarkSqueezeParagraphs from "remark-squeeze-paragraphs";
// import { noop } from "ts-essentials";

import {
  type PluggableList,
  sanitizeBreaks,
  sanitizeMdxExpression,
  // toTree,
} from "@fern-docs/mdx";

import { rehypeShikiDisplayNotation } from "./plugins/display-shiki-notation";
// import {
//   rehypeAcornErrorBoundary,
//   rehypeExpressionToMd,
//   rehypeMdxClassStyle,
//   rehypeSlug,
//   rehypeToc,
//   remarkInjectEsm,
//   remarkSanitizeAcorn,
// } from "@fern-docs/mdx/plugins";

// import { DocsLoader } from "./docs-loader";
// import { rehypeAccordionNestedHeaders } from "./plugins/rehype-accordion-nested-headers";
// import { rehypeAccordions } from "./plugins/rehype-accordions";
// import { rehypeButtons } from "./plugins/rehype-buttons";
// import { rehypeCards } from "./plugins/rehype-cards";
// import { rehypeCodeBlock } from "./plugins/rehype-code-block";
// import { rehypeCollectJsx } from "./plugins/rehype-collect-jsx";
// import { rehypeEndpointSnippets } from "../plugins/rehype-endpoint-snippets";
// import { rehypeExtractAsides } from "../plugins/rehype-extract-asides";
// import { rehypeFiles } from "../plugins/rehype-files";
// import { RehypeLinksOptions } from "./plugins/rehype-links";
// import { rehypeMigrateJsx } from "./plugins/rehype-migrate-jsx";
// import { conditionalRehypeShiki } from "../plugins/rehype-shiki-twoslash";
// import { rehypeSteps } from "./plugins/rehype-steps";
// import { rehypeTabs } from "./plugins/rehype-tabs";
// import { remarkExtractTitle } from "./plugins/remark-extract-title";
import { conditionalRehypeShiki } from "./plugins/rehype-shiki-twoslash";
import { twoslashRenderer } from "./plugins/twoslashRenderer";
import { twoslasher } from "./plugins/twoslasher";

// import { FileData } from "./types";

// gracefulify fs to avoid EMFILE errors on Vercel
// gracefulify(fs);

export interface SerializeMdxResponse {
  code: string;
  jsxElements: string[];
}

const execPromise = promisify(exec);

async function serializeTwoslashImpl(
  content: string
): Promise<SerializeMdxResponse> {
  content = sanitizeBreaks(content);
  content = sanitizeMdxExpression(content)[0];

  // let cwd: string | undefined;
  // if (filename != null) {
  //   try {
  //     cwd = path.dirname(filename);
  //   } catch {
  //     console.error("Failed to get cwd from filename", filename);
  //   }
  // }

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

  const hasTwoslash = content.includes("twoslash");
  const jsxElements: string[] = [];

  const bundled = await bundleMDX({
    source: content,
    // files,

    globals: {
      "@mdx-js/react": {
        varName: "MdxJsReact",
        namedExports: ["useMDXComponents"],
        defaultExport: false,
      },
    },

    mdxOptions: (o) => {
      // o.remarkRehypeOptions = {
      //   handlers: { heading: customHeadingHandler },
      // };

      o.providerImportSource = "@mdx-js/react";

      const rehypePlugins: PluggableList = [
        [
          conditionalRehypeShiki,
          {
            themes: {
              light: "min-light",
              dark: "material-theme-darker",
            },
            transformers: [
              transformerNotationDiff(),
              transformerNotationFocus(),
              transformerNotationHighlight(),
              hasTwoslash
                ? transformerTwoslash({
                    onTwoslashError: (
                      error: unknown,
                      code: string,
                      lang: string
                    ) => {
                      console.error("Twoslash error occurred:", error);
                      console.error("Code:", code);
                      console.error("Language:", lang);
                    },
                    explicitTrigger: true,
                    throws: false,
                    twoslasher: twoslasher(),
                    renderer: twoslashRenderer(),
                    twoslashOptions: {
                      customTags: ["allowErrors"],
                      compilerOptions: {
                        jsx: ts.JsxEmit.ReactJSX,
                        //   module: ts.ModuleKind.NodeNext,
                        //   moduleResolution: ts.ModuleResolutionKind.NodeNext,
                        //   esModuleInterop: true,
                        //   lib: ["dom", "esnext"],
                        //   skipLibCheck: true,
                      },
                      vfsRoot: "/app",
                    },
                  })
                : null,
            ].filter(isNonNullish),
          } satisfies RehypeShikiOptions,
          rehypeShikiDisplayNotation,
        ],
      ];

      // o.remarkPlugins = remarkPlugins;
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
      o.define = {
        "process.env.NODE_ENV": JSON.stringify(
          process.env.NODE_ENV || "development"
        ),
      };

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

  // TODO: this is doing duplicate work; figure out how to combine it with the compiler above.
  // const { jsxElements } = toTree(content, { sanitize: false });

  return { code: bundled.code, jsxElements };
}

export function serializeTwoslash(
  content: string | undefined
): Promise<SerializeMdxResponse | undefined> {
  const abortController = new AbortController();
  const { signal } = abortController;

  return new Promise<SerializeMdxResponse | undefined>((resolve, reject) => {
    if (!content?.trimStart().length) {
      resolve(undefined);
      return;
    }

    const timeoutId = setTimeout(() => {
      if (!signal.aborted) {
        abortController.abort();
        console.error("Serialize MDX timed out after 10 seconds");
        reject(new Error("Serialize MDX timed out"));
      }
    }, 60_000);

    serializeTwoslashImpl(content).then(
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
// function rehypeLog() {
//   return (_tree: Hast.Root) => {
//     // console.debug(JSON.stringify(tree));
//   };
// }
