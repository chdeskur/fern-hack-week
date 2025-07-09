import rehypeKatex from "rehype-katex";
import remarkGemoji from "remark-gemoji";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkSmartypants from "remark-smartypants";

import { DocsLoader } from "@fern-api/docs-server/docs-loader";
import { FileData } from "@fern-api/docs-utils/types/file-data";
import type * as FernDocs from "@fern-api/fdr-sdk/docs";
import { serialize } from "@fern-api/next-mdx-remote/serialize";
import {
  type PluggableList,
  customHeadingHandler,
  getFrontmatter,
  sanitizeBreaks,
  sanitizeMdxExpression,
  toTree,
} from "@fern-docs/mdx";
import {
  rehypeAcornErrorBoundary,
  rehypeExpressionToMd,
  rehypeMdxClassStyle,
  rehypeSlug,
  rehypeSqueezeParagraphs,
  remarkSanitizeAcorn,
} from "@fern-docs/mdx/plugins";

import { rehypeCodeBlock } from "../plugins/rehype-code-block";
import { rehypeFiles } from "../plugins/rehype-files";
import { rehypeLinks } from "../plugins/rehype-links";
import { rehypeExtractAsides } from "../plugins/rehypeExtractAsides";
import { rehypeFernComponents } from "../plugins/rehypeFernComponents";
import { remarkExtractTitle } from "../plugins/remark-extract-title";
import { SerializeMdxResponse, processTwoslashBlocks } from "./serialize";

type SerializeOptions = NonNullable<Parameters<typeof serialize>[1]>;

function withDefaultMdxOptions(
  frontmatter: FernDocs.Frontmatter,
  files: Record<string, FileData>
): SerializeOptions["mdxOptions"] {
  const remarkRehypeOptions = {
    handlers: {
      heading: customHeadingHandler,
    },
  };

  const remarkPlugins: PluggableList = [
    [remarkExtractTitle, { frontmatter }],
    remarkSanitizeAcorn,
    remarkGfm,
    remarkSmartypants,
    remarkMath,
    remarkGemoji,
  ];

  const rehypePlugins: PluggableList = [
    rehypeSqueezeParagraphs,
    [
      rehypeExpressionToMd,
      {
        mdxJsxElementAllowlist: {
          Frame: ["caption"],
          Tab: ["title"],
          Card: ["title", "icon"],
          Callout: ["title", "icon"],
          Step: ["title"],
          Accordion: ["title"],
        },
      },
    ],
    rehypeMdxClassStyle,
    [rehypeFiles, { files }],
    [rehypeLinks],
    rehypeAcornErrorBoundary,
    rehypeSlug,
    rehypeKatex,
    rehypeCodeBlock,
    rehypeFernComponents,
    rehypeExtractAsides,
  ];

  // right now, only pages use frontmatterDefaults, so when null, it is implicit that we're serializing a description.
  // if (frontmatterDefaults != null) {
  //     rehypePlugins.push([rehypeFernLayout, { matter: frontmatterDefaults }]);
  // }

  return {
    /**
     * development=true is required to render MdxRemote from the client-side.
     * https://github.com/hashicorp/next-mdx-remote/issues/350
     */
    development: process.env.NODE_ENV !== "production",
    remarkRehypeOptions,
    remarkPlugins,
    rehypePlugins,
    format: "mdx",
    useDynamicImport: true,
  };
}

/**
 * Should only be invoked server-side.
 */
export async function serializeMdxImpl(
  content: string,
  {
    loader,
    scope,
  }: {
    loader?: Partial<Pick<DocsLoader, "getFiles" | "getMdxBundlerFiles">>;
    scope?: Record<string, unknown>;
  } = {}
): Promise<SerializeMdxResponse> {
  content = sanitizeBreaks(content);
  content = sanitizeMdxExpression(content)[0];

  try {
    const { data: frontmatter, content: contentWithoutFrontmatter } =
      getFrontmatter(content);

    content = await processTwoslashBlocks(content);

    const files = (await loader?.getFiles?.()) ?? {};

    const result = await serialize<
      Record<string, unknown>,
      FernDocs.Frontmatter
    >(contentWithoutFrontmatter, {
      mdxOptions: withDefaultMdxOptions(frontmatter, files),
      parseFrontmatter: false, // this is parsed above via getFrontmatter
    });

    // TODO: this is doing duplicate work; figure out how to combine it with the compiler above.
    const { jsxElements } = toTree(content, { sanitize: false });

    return {
      code: result.compiledSource,
      frontmatter: frontmatter,
      jsxElements,
      scope: scope ?? {},
      engine: "next-remote",
    };
  } catch (e) {
    // TODO: sentry

    console.error("Failed to serialize MDX content", e);

    return {
      code: content,
      frontmatter: {},
      jsxElements: [],
      scope: scope ?? {},
      engine: "next-remote",
    };
  }
}
