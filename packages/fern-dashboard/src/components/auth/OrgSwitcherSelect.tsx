"use client";

import { useEffect, useState } from "react";

import { useRouter } from "@bprogress/next/app";

import { Auth0OrgName, Auth0Organization } from "@/app/services/auth0/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useOrgNameFromPathname } from "@/utils/useOrgNameFromPathname";
import { usePathnameWithoutOrgName } from "@/utils/usePathnameWithoutOrgName";

import { OrgLogo } from "./org-logo/OrgLogo";

export declare namespace OrgSwitcherSelect {
  export interface Props {
    organizations: Auth0Organization[];
  }
}

export const OrgSwitcherSelect = ({
  organizations,
}: OrgSwitcherSelect.Props) => {
  const orgName = useOrgNameFromPathname();
  const [localOrgName, setLocalOrgName] = useState(orgName);
  useEffect(() => {
    setLocalOrgName(orgName);
  }, [orgName]);

  const pathname = usePathnameWithoutOrgName();
  const router = useRouter();

  const getPathnameForOrg = (newOrgName: Auth0OrgName) => {
    return `/${newOrgName}${getRedirectPathname(pathname)}`;
  };

  const onClickOrg = (newOrgName: Auth0OrgName) => {
    if (newOrgName !== orgName) {
      setLocalOrgName(newOrgName);
      router.push(getPathnameForOrg(newOrgName));
    }
  };

  const onHoverOrg = (hoveredOrgName: Auth0OrgName) => {
    router.prefetch(getPathnameForOrg(hoveredOrgName));
  };

  return (
    <Select
      value={localOrgName}
      onValueChange={(value) => {
        onClickOrg(Auth0OrgName(value));
      }}
      disabled={organizations.length === 0}
    >
      <SelectTrigger className="shrink-0 md:min-w-[200px]">
        <SelectValue placeholder="Organization" />
      </SelectTrigger>
      <SelectContent>
        {organizations.map((organization) => (
          <SelectItem
            key={organization.id}
            value={organization.name}
            onMouseOver={() => {
              onHoverOrg(organization.name);
            }}
          >
            <OrgLogo organization={organization} />
            <span className="hidden md:inline">
              {organization.display_name}
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

function getRedirectPathname(pathname: string) {
  // if the current pathame is /docs/<domain>, just redirect to /docs
  if (pathname.startsWith("/docs/")) {
    return "/docs";
  }
  return pathname;
}
