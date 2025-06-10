"use server";

// TODO: save page version to supabase
export async function savePageVersion({
  mdx,
  orgName,
  slug,
}: {
  mdx: string;
  orgName: string;
  slug: string;
}) {
  console.log("[savePageVersion]", { mdx, orgName, slug });
}
