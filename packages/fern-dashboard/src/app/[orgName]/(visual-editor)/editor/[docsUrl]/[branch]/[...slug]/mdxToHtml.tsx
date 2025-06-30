import { bundleMDX } from "mdx-bundler";
import { getMDXComponent } from "mdx-bundler/client";

const ReactDOMServer = (await import("react-dom/server")).default;

// HACK: this is a PoC to get html from mdx
// TODO: use a version of serializeMdx, put in a common package
export async function mdxToHtml(mdx: string) {
  const markdown = stripHtml(stripFrontmatter(mdx));
  const result = await bundleMDX({
    source: markdown,
  });
  const Component = getMDXComponent(result?.code);
  const html = ReactDOMServer.renderToStaticMarkup(<Component />);
  return html;
}

function stripFrontmatter(mdx: string) {
  // Remove frontmatter delimited by --- at the beginning of the file
  return mdx.replace(/^---\s*\n.*?\n---\s*\n/s, "");
}

function stripHtml(mdx: string) {
  let result = mdx;

  // Remove style tags and their contents
  result = result.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "");

  // Remove self-closing tags
  result = result.replace(/<[^>]+\/>/g, "");

  // Remove paired tags and their contents using a more sophisticated approach
  // Handle nested tags by repeatedly removing innermost tags
  let hasChanges = true;
  while (hasChanges && /<[^>]+>/.test(result)) {
    const before = result;
    // Remove the innermost paired tags first
    result = result.replace(/<([^>]+)>([^<]*)<\/[^>]*>/g, "$2");
    hasChanges = result !== before;
  }

  // Clean up any remaining tags
  result = result.replace(/<[^>]*>/g, "");

  return result;
}
