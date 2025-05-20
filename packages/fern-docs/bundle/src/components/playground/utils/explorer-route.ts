import {
  addLeadingSlash,
  conformTrailingSlash,
  removeTrailingSlash,
} from "@fern-docs/utils";

/**
 * Conforms the slug to the explorer route.
 */
export function conformExplorerRoute(slugOrPathname: string): string {
  return conformTrailingSlash(
    addLeadingSlash(slugOrPathname) + "?explorer=true"
  );
}

export function isExplorerRoute(pathname: string): boolean {
  return removeTrailingSlash(pathname).endsWith("?explorer=true");
}
