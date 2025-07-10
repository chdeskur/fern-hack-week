import { createHash } from "crypto";
import { fromHtml } from "hast-util-from-html";
import { toHtml } from "hast-util-to-html";
import { toMdast } from "hast-util-to-mdast";
import yaml from "js-yaml";
import { fromMarkdown } from "mdast-util-from-markdown";
import {
  frontmatterFromMarkdown,
  frontmatterToMarkdown,
} from "mdast-util-frontmatter";
import { mdxFromMarkdown, mdxToMarkdown } from "mdast-util-mdx";
import { State as ToHastState, toHast } from "mdast-util-to-hast";
import { toMarkdown } from "mdast-util-to-markdown";
import { frontmatter as fm } from "micromark-extension-frontmatter";
import { mdxjs } from "micromark-extension-mdxjs";

// Options for how yaml is written to the frontmatter
const FRONTMATTER_YAML_OPTIONS: yaml.DumpOptions = {
  noRefs: true,
  lineWidth: -1,
};

// Custom element data
export interface CustomElement {
  type: string;
  name?: string;
  content: string;
}

// Map of custom elements by hash
export type CustomElements = Record<string, CustomElement>;

// Frontmatter included in mdx
export type Frontmatter = Record<string, unknown>;

// Response from mdxToHtml
export interface MdxToHtmlResponse {
  html: string;
  frontmatter: Frontmatter;
  customElements: CustomElements;
}

// Convert mdx to html, frontmatter, and custom elements
export function mdxToHtml(rootContent: string): MdxToHtmlResponse {
  // Get mdast from root mdx content
  const mdast = fromMarkdown(rootContent, {
    extensions: [mdxjs(), fm(["yaml"])],
    mdastExtensions: [mdxFromMarkdown(), frontmatterFromMarkdown(["yaml"])],
  });

  // Get frontmatter from mdast (expects only one frontmatter node)
  const frontmatterNode = mdast.children.find((node) => node.type === "yaml");

  // Parse frontmatter from yaml
  const parsedFrontmatter = frontmatterNode && yaml.load(frontmatterNode.value);
  const frontmatter = isValidFrontmatter(parsedFrontmatter)
    ? parsedFrontmatter
    : {};

  // Map of custom elements by hash, including jsxElements, expressions, and esm
  // Note: this will only include top-level custom elements, not nested ones
  const customElements: Record<string, CustomElement> = {};

  // Default handler for custom elements
  function customElementHandler(_: ToHastState, node: any) {
    const { hash, content } = getNodeContent(node, rootContent);
    const { type, name } = getNodeInfo(node);
    customElements[hash] = { content, type, name };
    return mdxCustomElementNode(hash, content, type, name);
  }

  // Get hast from mdast (and handle custom elements)
  const hast = toHast(mdast, {
    handlers: {
      mdxJsxFlowElement: customElementHandler,
      mdxJsxTextElement: customElementHandler,
      mdxFlowExpression: customElementHandler,
      mdxTextExpression: customElementHandler,
      mdxjsEsm: customElementHandler,
    },
  });

  // Get html from hast
  const html = toHtml(hast);

  return { html, frontmatter, customElements };
}

// Response from htmlToMdx
export interface HtmlToMdxResponse {
  mdx: string;
}

// Convert html to mdx
// TODO: Clean up this function
export function htmlToMdx(
  html: string,
  frontmatter: Frontmatter,
  customElements: CustomElements
): HtmlToMdxResponse {
  // Get hast from html
  const hast = fromHtml(html);

  // Get mdast from hast (and handle custom elements)
  const mdast = toMdast(hast, {
    handlers: {
      ["custom-element"]: function (_, element) {
        // Use hash as placeholder, which will be replaced with actual content
        const placeholder = getCustomElementPlaceholder(
          String(element.properties.dataHash)
        );

        return { type: "text", value: placeholder };
      },
    },
  });

  // Get mdx from mdast
  const mdx = toMarkdown(mdast, {
    extensions: [mdxToMarkdown(), frontmatterToMarkdown(["yaml"])],
  });

  // Reinject frontmatter if it exists
  let finalMdx = mdx;
  if (frontmatter && Object.keys(frontmatter).length > 0) {
    const frontmatterYaml = yaml.dump(frontmatter, FRONTMATTER_YAML_OPTIONS);
    finalMdx = `---\n${frontmatterYaml}---\n\n${mdx}`;
  }

  // Replace custom element placeholders with actual content
  Object.entries(customElements).forEach(([hash, customElement]) => {
    const placeholder = getCustomElementPlaceholder(hash);
    const content = customElement.content;
    finalMdx = finalMdx.replace(placeholder, content);
  });

  return { mdx: finalMdx };
}

// Type guard to check if frontmatter is valid
function isValidFrontmatter(
  frontmatter: unknown
): frontmatter is Record<string, unknown> {
  return (
    !!frontmatter &&
    typeof frontmatter === "object" &&
    !Array.isArray(frontmatter)
  );
}

// Get node info in a type-safe way
function getNodeInfo(node: any) {
  if (!node.type || typeof node.type !== "string") {
    throw new Error("mdast node does not have a valid type");
  }
  if (node.name && typeof node.name !== "string") {
    throw new Error("mdast node name is not of type string");
  }
  return {
    type: node.type as string,
    name: node.name as string | undefined,
  };
}

// Get node content in a type-safe way
function getNodeContent(node: any, rootContent: string) {
  if (!node.position?.start.offset || !node.position?.end.offset) {
    throw new Error("Node does not have valid position offset(s)");
  }
  const content = rootContent.slice(
    node.position.start.offset,
    node.position.end.offset
  );
  const hash = createHash("sha256").update(content).digest("hex");

  return { content, hash };
}

// Get a placeholder for a custom element
// Note: be careful not to use any characters that the serializer will escape
function getCustomElementPlaceholder(hash: string) {
  return hash;
}

// Create node for a custom element
function mdxCustomElementNode(
  hash: string,
  content: string,
  type: string,
  name?: string
) {
  return {
    type: "element" as const,
    tagName: "custom-element",
    // These data attributes help the client to handle the custom element
    properties: {
      "data-hash": hash,
      "data-type": type,
      ...(name ? { "data-name": name } : {}),
    },
    children: [
      {
        type: "text" as const,
        value: content,
      },
    ],
  };
}
