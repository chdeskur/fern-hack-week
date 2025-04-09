"use client";

import { getLoadableValue } from "@fern-ui/loadable";

import { useOrganizations } from "@/state/useOrganizations";

import { OrgSwitcherSelect } from "./OrgSwitcherSelect";

export function OrgSwitcher() {
  const organizations = useOrganizations();

  return (
    <OrgSwitcherSelect organizations={getLoadableValue(organizations) ?? []} />
  );
}
