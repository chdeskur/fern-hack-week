import TurndownService from "turndown";

const turndownService = new TurndownService();

// HACK: this is a PoC to get mdx from html
export function htmlToMdx(html: string) {
  // TODO:
  // const hast = htmlToHast(html)
  // const mdast = someFunc(hast)
  // const mdx = anotherFunc(mdast)
  return turndownService.turndown(html);
}
