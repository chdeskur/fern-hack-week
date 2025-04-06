"use server";

import { getCurrentSessionOrThrow } from "../services/auth0/getCurrentSession";
import {
  ensureUserBelongsToOrg,
  getAuth0ManagementClient,
} from "../services/auth0/management";

export async function rescindInvitation({
  invitationId,
}: {
  invitationId: string;
}) {
  const { userId, orgId } = await getCurrentSessionOrThrow();
  await ensureUserBelongsToOrg(userId, orgId);

  const auth0 = getAuth0ManagementClient();
  await auth0.organizations.deleteInvitation({
    id: orgId,
    invitation_id: invitationId,
  });
}
