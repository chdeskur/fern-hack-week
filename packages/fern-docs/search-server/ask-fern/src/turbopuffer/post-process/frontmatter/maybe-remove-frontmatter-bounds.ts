export function maybeRemoveFrontmatterBounds(markdown: string): string {
  return removeFrontmatterBounds(markdown);
}

function removeFrontmatterBounds(markdown: string): string {
  return markdown.replace(/---[\s\S]*?---/, (match) => {
    const lines = match.split("\n");
    lines.shift();
    lines.pop();
    return lines.join("\n");
  });
}
