import "server-only";

import * as ApiDefinition from "@fern-api/fdr-sdk/api-definition";
import { GrpcContext } from "@fern-api/fdr-sdk/api-definition";

import { MdxServerComponentProseSuspense } from "@/mdx/components/server-component";

import {
  EndpointRequestSection,
  createEndpointRequestDescriptionFallback,
} from "../endpoints/EndpointRequestSection";
import { EndpointResponseSection } from "../endpoints/EndpointResponseSection";
import { EndpointSection } from "../endpoints/EndpointSection";
import { ResponseSummaryFallback } from "../endpoints/response-summary-fallback";
import {
  TypeDefinitionAnchorPart,
  TypeDefinitionResponse,
} from "../type-definitions/TypeDefinitionContext";

export interface HoveringProps {
  isHovering: boolean;
}

export async function GrpcContentLeft({
  context: { grpc, types },
}: {
  context: GrpcContext;
}) {
  return (
    <>
      <TypeDefinitionAnchorPart part="request">
        {grpc.requests?.[0] != null && (
          <EndpointSection
            title="Request"
            titleOverride={
              isGrpcTypeAlias(grpc.requests[0], grpc.protocol?.type)
                ? types[grpc.requests[0].body.value.id]?.displayName
                : undefined
            }
            description={
              <MdxServerComponentProseSuspense
                size="sm"
                className="text-(color:--grayscale-a11)"
                mdx={grpc.requests[0].description}
                fallback={createEndpointRequestDescriptionFallback(
                  grpc.requests[0],
                  types
                )}
              />
            }
          >
            <TypeDefinitionAnchorPart part="body">
              <EndpointRequestSection
                request={grpc.requests[0]}
                types={types}
              />
            </TypeDefinitionAnchorPart>
          </EndpointSection>
        )}
      </TypeDefinitionAnchorPart>
      <TypeDefinitionResponse>
        <TypeDefinitionAnchorPart part="response">
          {grpc.responses?.[0] != null && (
            <EndpointSection
              title="Response"
              titleOverride={
                isGrpcTypeAlias(grpc.responses[0], grpc.protocol?.type)
                  ? types[grpc.responses[0].body.value.id]?.displayName
                  : undefined
              }
              description={
                <MdxServerComponentProseSuspense
                  size="sm"
                  className="text-(color:--grayscale-a11)"
                  mdx={grpc.responses[0].description}
                  fallback={
                    <ResponseSummaryFallback
                      response={grpc.responses[0]}
                      types={types}
                    />
                  }
                />
              }
            >
              <TypeDefinitionAnchorPart part="body">
                <EndpointResponseSection
                  body={grpc.responses[0].body}
                  types={types}
                />
              </TypeDefinitionAnchorPart>
            </EndpointSection>
          )}
        </TypeDefinitionAnchorPart>
      </TypeDefinitionResponse>
    </>
  );
}

type GrpcTypeAlias =
  | (ApiDefinition.HttpRequest & {
      contentType: "application/proto";
      body: ApiDefinition.HttpRequestBodyShape.Alias & {
        value: ApiDefinition.TypeReference.Id;
      };
    })
  | (ApiDefinition.HttpResponse & {
      statusCode: number;
      body: ApiDefinition.HttpResponseBodyShape.Alias & {
        value: ApiDefinition.TypeReference.Id;
      };
    });

function isGrpcTypeAlias(
  item: ApiDefinition.HttpRequest | ApiDefinition.HttpResponse,
  protocolType: string | undefined
): item is GrpcTypeAlias {
  const hasAliasId =
    item.body?.type === "alias" && item.body.value?.type === "id";
  const isGrpc = protocolType === "grpc";
  if (!hasAliasId || !isGrpc) return false;

  if ("contentType" in item) {
    return item.contentType === "application/proto";
  }

  return "statusCode" in item;
}
