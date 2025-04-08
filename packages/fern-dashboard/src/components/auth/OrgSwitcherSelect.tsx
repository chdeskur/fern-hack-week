"use client";

import { useEffect, useState } from "react";

import { Auth0OrgID, Auth0Organization } from "@/app/services/auth0/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getLoginUrl } from "@/utils/getLoginUrl";
import { usePathnameWithoutOrgName } from "@/utils/usePathnameWithoutOrgName";

import { OrgLogo } from "./org-logo/OrgLogo";

export declare namespace OrgSwitcherSelect {
  export interface Props {
    currentOrgId: Auth0OrgID | undefined;
    organizations: Auth0Organization[];
  }
}

export const OrgSwitcherSelect = ({
  currentOrgId,
  organizations,
}: OrgSwitcherSelect.Props) => {
  const [localOrgId, setLocalOrgId] = useState(currentOrgId);
  useEffect(() => {
    setLocalOrgId(currentOrgId);
  }, [currentOrgId]);

  const pathname = usePathnameWithoutOrgName();

  const onClickOrg = async (newOrgId: Auth0OrgID) => {
    if (newOrgId === currentOrgId) {
      return;
    }
    const newOrg = organizations.find((org) => org.id === newOrgId);
    if (newOrg == null) {
      return;
    }

    setLocalOrgId(newOrgId);

    window.location.href = getLoginUrl({
      orgId: newOrgId,
      returnTo: `/${newOrg.name}/${getRedirectPathname(pathname)}`,
    });
  };

  return (
    <Select
      value={localOrgId}
      onValueChange={(value) => void onClickOrg(value as Auth0OrgID)}
      disabled={organizations.length === 0}
    >
      <SelectTrigger className="shrink-0 md:min-w-[200px]">
        <SelectValue placeholder="Organization" />
      </SelectTrigger>
      <SelectContent>
        {organizations.map((organization) => (
          <SelectItem key={organization.id} value={organization.id}>
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
