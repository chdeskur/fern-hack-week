"use server";

// TODO: save page version to supabase
export async function savePageVersion({
  mdx,
  orgName,
  slug,
  subtitle,
  title,
}: {
  mdx?: string;
  orgName: string;
  slug: string;
  subtitle?: string;
  title?: string;
}) {
  console.log("[savePageVersion]", { mdx, orgName, slug, title, subtitle });
}
