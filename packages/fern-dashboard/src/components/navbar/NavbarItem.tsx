"use client";

import Link from "next/link";
import React from "react";

import { useOrgNameFromPathname } from "@/utils/useOrgNameFromPathname";
import { usePathnameWithoutOrgName } from "@/utils/usePathnameWithoutOrgName";
import { cn } from "@/utils/utils";

export declare namespace NavbarItem {
  export interface Props {
    title: string;
    icon: React.JSX.Element;

    /**
     * href is used to determine:
     *   (1) if this item is selected: pathname.startsWith(href)
     *   (2) the href for the <a />
     *       (to override, use hrefForActualLinking)
     */
    href: `/${string}`;
    hrefForActualLinking?: string;
  }
}

export const ICON_SIZE = "size-5";

export const NavbarItem = ({
  title,
  icon,
  href,
  hrefForActualLinking = href,
}: NavbarItem.Props) => {
  const orgName = useOrgNameFromPathname();
  const pathname = usePathnameWithoutOrgName();

  const isSelected = pathname.startsWith(href);
  const isClickable = !isSelected;

  const className = cn(
    "flex flex-1 flex-col items-center gap-2 py-2 text-sm transition md:flex-row",
    isSelected ? "text-primary" : "text-gray-900",
    isClickable && "hover:text-gray-1200"
  );

  const children = (
    <>
      {icon}
      <div>{title}</div>
    </>
  );

  if (isClickable) {
    return (
      <Link className={className} href={`/${orgName}/${hrefForActualLinking}`}>
        {children}
      </Link>
    );
  } else {
    return <div className={className}>{children}</div>;
  }
};
