import React from "react";

import { LogoConfiguration } from "@fern-api/docs-utils/types/logo-configuration";
import { cn } from "@fern-docs/components";
import { AbstractLogo } from "@fern-docs/components/abstract/logo";

import { LogoText } from "@/state/logo-text";

import { MaybeFernLink } from "./FernLink";

export function Logo({
  logo,
  className,
  alt,
}: {
  logo: LogoConfiguration;
  className?: string;
  alt?: string;
}) {
  return (
    <MaybeFernLink
      href={logo.href}
      className={cn(className, "flex items-center")}
    >
      <AbstractLogo logo={logo} alt={alt} />
      <LogoText className="ml-1" />
    </MaybeFernLink>
  );
}
