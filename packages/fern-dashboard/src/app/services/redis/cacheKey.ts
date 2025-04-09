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
  ORGANIZATION_NAME_TO_ID: "ORGANIZATION_NAME_TO_ID",
} as const;

export type RedisCacheKeyType =
  (typeof RedisCacheKeyType)[keyof typeof RedisCacheKeyType];

export type RedisCacheDataTypes = {
  [RedisCacheKeyType.ORGANIZATION]: Auth0Organization;
  [RedisCacheKeyType.ORGANIZATION_MEMBERS]: GetMembers200ResponseOneOfInner[];
  [RedisCacheKeyType.ORGANIZATION_INVITATIONS]: GetInvitations200ResponseOneOfInner[];
  [RedisCacheKeyType.ORGANIZATION_NAME_TO_ID]: Auth0OrgID;
};

export const RedisCacheKey = {
  organization: (orgName: Auth0OrgName) =>
    cacheKey(RedisCacheKeyType.ORGANIZATION)(`org-${orgName}`),
  organizationMembers: (orgName: Auth0OrgName) =>
    cacheKey(RedisCacheKeyType.ORGANIZATION_MEMBERS)(`org-members-${orgName}`),
  organizationInvitations: (orgName: Auth0OrgName) =>
    cacheKey(RedisCacheKeyType.ORGANIZATION_INVITATIONS)(
      `org-invitations-${orgName}`
    ),
  organizationNameToId: (orgName: Auth0OrgName) =>
    cacheKey(RedisCacheKeyType.ORGANIZATION_NAME_TO_ID)(
      `org-name-to-id-${orgName}`
    ),
};

function cacheKey<T extends RedisCacheKeyType>(_type: T) {
  return (key: string) => key as unknown as RedisCacheKey<T>;
}

export type inferCachedData<T extends RedisCacheKeyType> =
  RedisCacheDataTypes[T];
