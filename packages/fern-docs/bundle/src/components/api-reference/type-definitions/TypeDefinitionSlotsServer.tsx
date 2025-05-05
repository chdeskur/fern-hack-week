// import "server-only";
import { TypeDefinition } from "@fern-api/fdr-sdk/api-definition";

import { TypeDefinitionSlotsProvider } from "./TypeDefinitionSlotsClient";
import { TypeReferenceDefinitions } from "./TypeReferenceDefinitions";

export function TypeDefinitionSlotsServer({
  types,
  children,
}: {
  types: Record<string, TypeDefinition>;
  children: React.ReactNode;
}) {
  return (
    <TypeDefinitionSlotsProvider slots={createTypeDefinitionSlots(types)}>
      {children}
    </TypeDefinitionSlotsProvider>
  );
}

function createTypeDefinitionSlots(types: Record<string, TypeDefinition>) {
  return Object.fromEntries(
    Object.entries(types).map(([id, type]) => [
      id,
      <TypeReferenceDefinitions key={id} shape={type.shape} types={types} />,
    ])
  );
}
