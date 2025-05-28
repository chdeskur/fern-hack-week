import { memo } from "react";

import { UnreachableCaseError } from "ts-essentials";

import * as ApiDefinition from "@fern-api/fdr-sdk/api-definition";

import { DiscriminatedUnionVariant } from "./DiscriminatedUnionVariant";
import { EnumTypeDefinition } from "./EnumTypeDefinition";
import { EnumValue } from "./EnumValue";
import { FernCollapseWithButtonUncontrolled } from "./FernCollapseWithButtonUncontrolled";
import { ObjectProperty } from "./ObjectProperty";
import { TypeDefinitionPathPart } from "./TypeDefinitionContext";
import { WithSeparator } from "./TypeDefinitionDetails";
import { propertyLocation } from "./TypeReferenceDefinitions";
import { UndiscriminatedUnionVariant } from "./UndiscriminatedUnionVariant";

export declare namespace InternalTypeDefinition {
  export interface Props {
    shape: ApiDefinition.TypeShapeOrReference;
    types: Record<ApiDefinition.TypeId, ApiDefinition.TypeDefinition>;
    location?: propertyLocation;
  }
}

export const InternalTypeDefinition = memo(function InternalTypeDefinition({
  shape,
  types,
  location,
}: {
  shape:
    | ApiDefinition.TypeShape.Enum
    | ApiDefinition.TypeShape.UndiscriminatedUnion
    | ApiDefinition.TypeShape.DiscriminatedUnion
    | ApiDefinition.TypeShape.Object_
    | ApiDefinition.TypeReference.Primitive;
  types: Record<ApiDefinition.TypeId, ApiDefinition.TypeDefinition>;
  location?: propertyLocation;
}) {
  switch (shape.type) {
    case "enum": {
      return (
        <EnumTypeDefinition
          elements={shape.values.map((value) => ({
            element: <EnumValue key={value.value} enumValue={value} />,
            searchableString: `${value.value} ${value.description ?? ""}`,
          }))}
        />
      );
    }
    case "undiscriminatedUnion":
      return (
        <FernCollapseWithButtonUncontrolled
          showText={`Show ${shape.variants.length} variants`}
          hideText={`Hide ${shape.variants.length} variants`}
        >
          <WithSeparator separatorText="OR">
            {shape.variants.map((variant, idx) => (
              <UndiscriminatedUnionVariant
                key={variant.displayName}
                unionVariant={variant}
                idx={idx}
                types={types}
                location={location}
              />
            ))}
          </WithSeparator>
        </FernCollapseWithButtonUncontrolled>
      );
    case "discriminatedUnion":
      return (
        <FernCollapseWithButtonUncontrolled
          showText={`Show ${shape.variants.length} variants`}
          hideText={`Hide ${shape.variants.length} variants`}
        >
          <WithSeparator separatorText="OR">
            {shape.variants.map((variant) => (
              <DiscriminatedUnionVariant
                discriminant={shape.discriminant}
                key={variant.displayName}
                unionVariant={variant}
                types={types}
                location={location}
              />
            ))}
          </WithSeparator>
        </FernCollapseWithButtonUncontrolled>
      );
    case "object": {
      const properties = ApiDefinition.unwrapObjectType(
        shape,
        types
      ).properties;

      const filteredProperties = properties.filter((property) => {
        if (location === "request") {
          return property.propertyAccess !== "READ_ONLY";
        } else if (location === "response") {
          return property.propertyAccess !== "WRITE_ONLY";
        }
        return true;
      });
      return (
        <FernCollapseWithButtonUncontrolled
          showText={`Show ${filteredProperties.length} properties`}
          hideText={`Hide ${filteredProperties.length} properties`}
        >
          <WithSeparator>
            {filteredProperties.map((property) => (
              <TypeDefinitionPathPart
                key={property.key}
                part={{ type: "objectProperty", propertyName: property.key }}
              >
                <ObjectProperty
                  property={property}
                  types={types}
                  location={location}
                />
              </TypeDefinitionPathPart>
            ))}
          </WithSeparator>
        </FernCollapseWithButtonUncontrolled>
      );
    }
    case "primitive":
      return null;
    default:
      throw new UnreachableCaseError(shape);
  }
});
