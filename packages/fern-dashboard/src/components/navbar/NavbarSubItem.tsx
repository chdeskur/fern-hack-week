"use client";

import Link from "next/link";
import React from "react";

import { useOrgNameFromPathname } from "@/utils/useOrgNameFromPathname";
import { usePathnameWithoutOrgName } from "@/utils/usePathnameWithoutOrgName";
import { cn } from "@/utils/utils";

export declare namespace NavbarSubItem {
  export interface Props {
    title: string;
    icon?: React.JSX.Element;
    href: `/${string}`;
  }
}

export const NavbarSubItem = ({ title, icon, href }: NavbarSubItem.Props) => {
  const orgName = useOrgNameFromPathname();
  const pathname = usePathnameWithoutOrgName();
  const isSelected = pathname.startsWith(href);

  const className = cn(
    "hidden md:flex",
    "flex-1 flex-row gap-2 text-sm transition",
    isSelected ? "text-primary" : "hover:text-gray-1100 text-gray-900"
  );

  const children = (
    <>
      <div className="flex w-5 shrink-0 justify-center">
        <div
          className={cn("w-px", isSelected ? "bg-green-1100" : "bg-gray-700")}
        />
      </div>
      <div className="flex min-w-0 items-center py-2 pr-4">
        {icon}
        <div className="truncate">{title}</div>
      </div>
    </>
  );

  if (isSelected) {
    return <div className={className}>{children}</div>;
  } else {
    return (
      <Link href={`/${orgName}/${href}`} className={className}>
        {children}
      </Link>
    );
  }
};
