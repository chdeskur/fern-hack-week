import { conformTrailingSlash } from "@fern-api/docs-utils";
import { addLeadingSlash } from "@fern-api/docs-utils";

export function returnChatModePath({
  slug,
  enable,
}: {
  slug: string;
  enable: boolean;
}): string {
  if (enable) {
    return conformTrailingSlash(
      addLeadingSlash(slug.replace("&mode=manual", ""))
    );
  }

  return conformTrailingSlash(
    addLeadingSlash(slug.replace("&mode=chat", "") + "&mode=manual")
  );
}
