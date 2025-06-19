export function maybeRemoveExtraneousAttributes(markdown: string): string {
  return removeExtraneousAttributes(markdown);
}

function removeExtraneousAttributes(markdown: string): string {
  return markdown.replace(/---[\s\S]*?---/, (match) => {
    const lines = match.split("\n");
    const filteredLines = lines.filter((line) => {
      return (
        !line.startsWith("slug:") &&
        !line.startsWith("layout:") &&
        !line.startsWith("hide-toc:")
      );
    });
    return filteredLines.join("\n");
  });
}
