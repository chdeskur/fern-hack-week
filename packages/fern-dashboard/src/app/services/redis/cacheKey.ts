import {
  GetInvitations200ResponseOneOfInner,
  GetMembers200ResponseOneOfInner,
} from "auth0";

import { Auth0OrgID, Auth0OrgName, Auth0Organization } from "../auth0/types";

export type RedisCacheKey<T extends RedisCacheKeyType> = string & {
  __type: T;
};

export const RedisCacheKeyType = {
  ORGANIZATION: "ORGANIZATION",
  ORGANIZATION_MEMBERS: "ORGANIZATION_MEMBERS",
  ORGANIZATION_INVITATIONS: "ORGANIZATION_INVITATIONS",
  ORGANIZATION_NAME: "ORGANIZATION_NAME",
} as const;

export type RedisCacheKeyType =
  (typeof RedisCacheKeyType)[keyof typeof RedisCacheKeyType];

export type RedisCacheDataTypes = {
  [RedisCacheKeyType.ORGANIZATION]: Auth0Organization;
  [RedisCacheKeyType.ORGANIZATION_MEMBERS]: GetMembers200ResponseOneOfInner[];
  [RedisCacheKeyType.ORGANIZATION_INVITATIONS]: GetInvitations200ResponseOneOfInner[];
  [RedisCacheKeyType.ORGANIZATION_NAME]: Auth0OrgID;
};

export const RedisCacheKey = {
  organization: (orgId: Auth0OrgID) =>
    cacheKey(RedisCacheKeyType.ORGANIZATION)(`org-${orgId}`),
  organizationMembers: (orgId: Auth0OrgID) =>
    cacheKey(RedisCacheKeyType.ORGANIZATION_MEMBERS)(`org-members-${orgId}`),
  organizationInvitations: (orgId: Auth0OrgID) =>
    cacheKey(RedisCacheKeyType.ORGANIZATION_INVITATIONS)(
      `org-invitations-${orgId}`
    ),
  organizationName: (orgName: Auth0OrgName) =>
    cacheKey(RedisCacheKeyType.ORGANIZATION_NAME)(`org-name-${orgName}`),
};

function cacheKey<T extends RedisCacheKeyType>(_type: T) {
  return (key: string) => key as unknown as RedisCacheKey<T>;
}

export type inferCachedData<T extends RedisCacheKeyType> =
  RedisCacheDataTypes[T];
