export function maybeRemoveFrontMatter(markdown: string): string {
  return markdown.replace(/^---\n[\s\S]*?---\n/, "");
}
