"use client";

import { cn } from "@fern-docs/components";
import { useIsDesktop } from "@fern-ui/react-commons";

import {
  FERN_SIDEBAR_ID,
  FERN_SIDEBAR_SPACER_ID,
} from "@/components/constants";
import { useIsSidebarFixed } from "@/state/layout";

import { MobileMenu } from "./mobile-menu";

export function SidebarNav({
  children,
  className,
  mobileClassName,
  desktopClassName,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  mobileClassName?: string;
  desktopClassName?: string;
  "data-theme"?: string;
}) {
  const isDesktop = useIsDesktop();

  if (isDesktop) {
    return (
      <DesktopMenu className={cn(className, desktopClassName)} {...props}>
        {children}
      </DesktopMenu>
    );
  }

  return (
    <MobileMenu
      className={cn(className, mobileClassName, { hidden: isDesktop })}
      {...props}
    >
      {children}
    </MobileMenu>
  );
}

function DesktopMenu({
  children,
  className,
  hidden,
}: {
  children: React.ReactNode;
  className?: string;
  hidden?: boolean;
}) {
  const fixed = useIsSidebarFixed();
  if (hidden) {
    return null;
  }
  return (
    <>
      <aside
        id={FERN_SIDEBAR_ID}
        data-viewport="desktop"
        data-state={fixed ? "fixed" : "sticky"}
        className={className}
      >
        {children}
      </aside>
      {fixed && <aside id={FERN_SIDEBAR_SPACER_ID} />}
    </>
  );
}
