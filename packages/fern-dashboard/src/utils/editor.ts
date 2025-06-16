import { slugjoin } from "@fern-api/fdr-sdk/navigation";

export const convertToEditorRoute = (orgName: string, slug: string) => {
  return `/${orgName}/editor/${slugjoin(slug)}`;
};
