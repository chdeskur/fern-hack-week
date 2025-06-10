export function isPreviewDomain(domain: string): boolean {
  const uuidRegex =
    "[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}";
  return new RegExp(`^.*?${uuidRegex}\\.docs\\.buildwithfern\\.com$`).test(
    domain
  );
}

export function extractOrgFromPreview(domain: string): string | undefined {
  const orgRegex = "^[a-zA-Z0-9-]+";
  const uuidRegex =
    "[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}";
  const match = new RegExp(
    `^(${orgRegex})-preview-${uuidRegex}\\.docs\\.buildwithfern\\.com$`
  ).exec(domain);
  return match ? match[1] : undefined;
}
