import { redirect } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ orgName: string }>;
}) {
  const { orgName } = await params;
  redirect(`/${orgName}/editor/index`);
}
