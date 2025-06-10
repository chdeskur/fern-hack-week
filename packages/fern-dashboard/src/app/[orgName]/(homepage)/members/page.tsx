import { MembersPage } from "@/components/members/MembersPage";

import { getCurrentSessionOrThrow } from "../../../services/auth0/getCurrentSession";

export default async function Page() {
  const session = await getCurrentSessionOrThrow();
  return <MembersPage session={session} />;
}
