export function maybeRemoveStyleTags(markdown: string): string {
  if (markdownHasSnippets(markdown)) {
    return markdown;
  }

  return markdown
    .replace(/style={{[^}]*}}/g, "")
    .replace(/style="[^}]*"/g, "")
    .replace(/<style>[\s\S]*?<\/style>/g, "");
}

function markdownHasSnippets(markdown: string): boolean {
  return markdown.includes("```") || markdown.includes("<CodeBlocks");
}
