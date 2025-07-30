import { ArrowLeft } from "lucide-react";

import { CachedDocsLoader, createPruneKey } from "@fern-api/docs-loader";
import { ApiDefinition, FernNavigation } from "@fern-api/fdr-sdk";
import {
  createEndpointContext,
  createWebSocketContext,
} from "@fern-api/fdr-sdk/api-definition";
import { NavigationNodePage } from "@fern-api/fdr-sdk/navigation";

import { PlaygroundAuthorizationFormCard } from "./auth";
import { PlaygroundEndpoint } from "./endpoint";
import { PlaygroundWebSocket } from "./websocket";

export async function ExplorerContent({
  loader,
  node,
}: {
  loader: CachedDocsLoader;
  node: NavigationNodePage;
}) {
  if (!FernNavigation.isApiLeaf(node)) {
    return <NoEndpointSelected />;
  }

  let api: ApiDefinition.ApiDefinition | undefined;

  try {
    api = await loader.getPrunedApi(node.apiDefinitionId, createPruneKey(node));
  } catch (error) {
    console.error(`[explorer-content] ${JSON.stringify(error)}`);
    // TODO: don't revalidate too often
    // revalidate(await loader.getBaseUrl());
  }

  if (api == null) {
    return <NoEndpointSelected />;
  }

  const fullApiDefinition = await loader.getApi(node.apiDefinitionId);
  const endpointsData = await Promise.all(
    Object.values(fullApiDefinition.endpoints).map(async (_endpoint) => {
      const endpointId = _endpoint.id;
      const endpoint = await loader.getEndpointById(
        node.apiDefinitionId,
        endpointId
      );
      return {
        id: endpointId,
        nodes: endpoint.nodes,
      };
    })
  );

  if (node.type === "endpoint") {
    const context = createEndpointContext(node, api);
    if (!context) return null;
    const authForm = context.auth != null && (
      <PlaygroundAuthorizationFormCard
        loader={loader}
        apiDefinitionId={node.apiDefinitionId}
        auth={context.auth}
      />
    );
    return (
      <PlaygroundEndpoint
        context={context}
        authForm={authForm}
        apiDefinition={fullApiDefinition}
        endpointsData={endpointsData}
      />
    );
  } else if (node.type === "webSocket") {
    const context = createWebSocketContext(node, api);
    if (!context) return null;
    const authForm = context.auth != null && (
      <PlaygroundAuthorizationFormCard
        loader={loader}
        apiDefinitionId={node.apiDefinitionId}
        auth={context.auth}
      />
    );
    return <PlaygroundWebSocket context={context} authForm={authForm} />;
  }
  return <NoEndpointSelected />;
}

export function NoEndpointSelected() {
  return (
    <div className="flex size-full flex-col items-center justify-center">
      <ArrowLeft className="t-muted mb-2 size-8" />
      <h6 className="t-muted">Select an endpoint to get started</h6>
    </div>
  );
}
