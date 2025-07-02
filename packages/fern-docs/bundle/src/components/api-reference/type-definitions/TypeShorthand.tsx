"use client";

import { TypeShapeOrReference } from "@fern-api/fdr-sdk/api-definition";

import { renderTypeShorthandRoot } from "@/components/type-shorthand";

import { useEndpointContext } from "../endpoints/EndpointContext";
import { useTypeDefinitionContext } from "./TypeDefinitionContext";

export function TypeShorthand({ shape }: { shape: TypeShapeOrReference }) {
  const { endpointProtocol } = useEndpointContext();
  const context = useTypeDefinitionContext();
  return renderTypeShorthandRoot({
    shape,
    types: context.types,
    isResponse: context.isResponse,
    hideAllModifiers: endpointProtocol?.type === "grpc",
  });
}
