import React from "react";

import { Separator } from "@fern-docs/components/Separator";

import { ErrorBoundary } from "@/components/error-boundary";

import { SectionContainer, TypeDefinitionAnchor } from "./TypeDefinitionAnchor";

export function EndpointSection({
  title,
  titleOverride,
  description,
  children,
  hideSeparator,
}: {
  title: React.ReactNode;
  titleOverride?: string;
  description?: React.ReactNode;
  children: React.ReactNode;
  hideSeparator?: boolean;
}) {
  return (
    <ErrorBoundary>
      <SectionContainer className="space-y-3">
        <TypeDefinitionAnchor>
          {titleOverride ? (
            <div className="mt-0 inline-flex flex-col gap-0">
              <p className="font-alt mt-0 text-sm leading-none">
                {titleOverride ? title : undefined}
              </p>
              <h3 className="mt-0">{titleOverride ?? title}</h3>
            </div>
          ) : (
            <h3 className="mt-0">{title}</h3>
          )}
        </TypeDefinitionAnchor>
        {description}
        {hideSeparator ? null : <Separator />}
        {children}
      </SectionContainer>
    </ErrorBoundary>
  );
}
