import type { EndpointContext } from "@fern-api/fdr-sdk/api-definition";
import { buildEndpointUrl } from "@fern-api/fdr-sdk/api-definition";

import {
  PlaygroundAuthState,
  PlaygroundEndpointRequestFormState,
} from "../../types";

export abstract class PlaygroundCodeSnippetBuilder {
  protected url: string;

  constructor(
    protected context: EndpointContext,
    protected formState: PlaygroundEndpointRequestFormState,
    protected authState: PlaygroundAuthState,
    protected baseUrl: string | undefined,
    protected redacted: boolean
  ) {
    // TODO: wire through the environment from hook
    this.url = buildEndpointUrl({
      endpoint: context.endpoint,
      pathParameters: formState.pathParameters,
      baseUrl,
    });
  }

  protected maybeWrapJsonBody(body: unknown): unknown {
    if (this.context.endpoint.protocol?.type === "openrpc") {
      let params = [];
      if (body && typeof body === "object") {
        params = Object.values(body);
      }
      return {
        jsonrpc: "2.0",
        method: this.context.endpoint.protocol.methodName,
        params,
        id: 1,
      };
    }
    return body;
  }

  public abstract build(): string;
}
