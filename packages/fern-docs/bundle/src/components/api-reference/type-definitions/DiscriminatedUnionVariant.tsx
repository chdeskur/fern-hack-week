import React from "react";

import { compact } from "es-toolkit/array";

import * as ApiDefinition from "@fern-api/fdr-sdk/api-definition";
import titleCase from "@fern-api/ui-core-utils/titleCase";

import { PropertyWithShape } from "./ObjectProperty";
import { TypeDefinitionPathPart } from "./TypeDefinitionContext";

export function DiscriminatedUnionVariant({
  discriminant,
  unionVariant,
  types,
  location,
}: {
  discriminant: ApiDefinition.PropertyKey;
  unionVariant: ApiDefinition.DiscriminatedUnionVariant;
  types: Record<string, ApiDefinition.TypeDefinition>;
  location?: "request" | "response";
}) {
  const unwrapped = ApiDefinition.unwrapDiscriminatedUnionVariant(
    { discriminant },
    unionVariant,
    types
  );

  const description = compact([
    unionVariant.description,
    ...unwrapped.descriptions,
  ])[0];

  return (
    <TypeDefinitionPathPart
      part={{
        type: "objectFilter",
        propertyName: discriminant,
        requiredStringValue: unionVariant.discriminantValue,
      }}
    >
      <PropertyWithShape
        name={
          unionVariant.discriminantValue ??
          titleCase(unionVariant.discriminantValue)
        }
        description={description}
        shape={{
          type: "object" as const,
          properties: unwrapped.properties,
          extends: [],
          extraProperties: unwrapped.extraProperties,
        }}
        availability={unionVariant.availability}
        types={types}
        location={location}
      />
    </TypeDefinitionPathPart>
  );
}
