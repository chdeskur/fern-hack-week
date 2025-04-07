"use server";

import { getAuth0ClientId } from "../services/auth0/auth0";
import { getCurrentSessionOrThrow } from "../services/auth0/getCurrentSession";
import {
  ensureUserBelongsToOrg,
  getAuth0ManagementClient,
} from "../services/auth0/management";

export async function inviteUserToOrg({
  inviteeEmail,
}: {
  inviteeEmail: string;
}) {
  const auth0 = getAuth0ManagementClient();
  const { session, userId, orgId } = await getCurrentSessionOrThrow();
  await ensureUserBelongsToOrg(userId, orgId);

  const invitation = await auth0.organizations.createInvitation(
    { id: orgId },
    {
      inviter: { name: session.user.name ?? "" },
      invitee: { email: inviteeEmail },
      client_id: getAuth0ClientId(),
      send_invitation_email: true,
    }
  );

  return {
    invitationId: invitation.data.id,
  };
}
