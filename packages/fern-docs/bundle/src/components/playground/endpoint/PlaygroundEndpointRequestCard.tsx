import { ReactElement, useState } from "react";

import { useAtomValue, useSetAtom } from "jotai";

import type { EndpointContext } from "@fern-api/fdr-sdk/api-definition";
import {
  CopyToClipboardButton,
  FernButton,
  FernButtonGroup,
  FernCard,
  FernDropdown,
  FernSegmentedControl,
} from "@fern-docs/components";
import { jotaiStore } from "@fern-docs/components/state/jotai-provider";

import { isFileForgeHackEnabledAtom } from "@/state/api-explorer-flags";
import { useProgrammingLanguage } from "@/state/language";
import {
  PLAYGROUND_AUTH_STATE_ATOM,
  PLAYGROUND_AUTH_STATE_OAUTH_ATOM,
} from "@/state/playground";

import { usePlaygroundContext } from "../PlaygroundContext";
import { PlaygroundRequestPreview } from "../PlaygroundRequestPreview";
import { PlaygroundCodeSnippetResolverBuilder } from "../code-snippets/resolver";
import { PlaygroundEndpointRequestFormState } from "../types";
import { usePlaygroundBaseUrl } from "../utils/select-environment";

interface PlaygroundEndpointRequestCardProps {
  context: EndpointContext;
  formState: PlaygroundEndpointRequestFormState;
}

function useRequestType(): [
  "curl" | "typescript" | "python",
  (requestType: string) => void,
] {
  const [lang, setLang] = useProgrammingLanguage();
  return [
    lang === "typescript" || lang === "javascript"
      ? "typescript"
      : lang === "python"
        ? "python"
        : "curl",
    setLang,
  ];
}

// Basic interface component that uses PlaygroundContext
function PlaygroundBasicInterface() {
  const playground = usePlaygroundContext();

  if (!playground.context || !("endpoint" in playground.context)) {
    return <div>No endpoint context available</div>;
  }

  const endpoint = playground.context.endpoint;
  const availableValues = playground.availableValues;

  return (
    <div className="pointer-events-auto space-y-4 overflow-y-auto p-4">
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-gray-900">
          Endpoint: {endpoint.method}{" "}
          {endpoint.path
            .map((part) =>
              part.type === "literal" ? part.value : `:${part.value}`
            )
            .join("")}
        </h4>

        {/* Path Parameters */}
        {playground.getAvailablePathParameters().length > 0 && (
          <div>
            <h5 className="mb-2 text-xs font-medium text-gray-700">
              Path Parameters
            </h5>
            <div className="space-y-1">
              {playground.getAvailablePathParameters().map((param) => (
                <div key={param} className="flex items-center space-x-2">
                  <span className="w-20 text-xs text-gray-600">{param}:</span>
                  <input
                    type="text"
                    className="flex-1 rounded border px-2 py-1 text-xs"
                    value={
                      (availableValues.pathParameters[param] as string) || ""
                    }
                    onChange={(e) =>
                      playground.setPathParameter(param, e.target.value)
                    }
                    placeholder={`Enter ${param}`}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Query Parameters */}
        {playground.getAvailableQueryParameters().length > 0 && (
          <div>
            <h5 className="mb-2 text-xs font-medium text-gray-700">
              Query Parameters
            </h5>
            <div className="space-y-1">
              {playground.getAvailableQueryParameters().map((param) => (
                <div key={param} className="flex items-center space-x-2">
                  <span className="w-20 text-xs text-gray-600">{param}:</span>
                  <input
                    type="text"
                    className="flex-1 rounded border px-2 py-1 text-xs"
                    value={
                      (availableValues.queryParameters[param] as string) || ""
                    }
                    onChange={(e) =>
                      playground.setQueryParameter(param, e.target.value)
                    }
                    placeholder={`Enter ${param}`}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Headers */}
        <div>
          <h5 className="mb-2 text-xs font-medium text-gray-700">Headers</h5>
          <div className="space-y-1">
            {playground.getAvailableHeaders().map((header) => (
              <div key={header} className="flex items-center space-x-2">
                <span className="w-20 text-xs text-gray-600">{header}:</span>
                <input
                  type="text"
                  className="flex-1 rounded border px-2 py-1 text-xs"
                  value={(availableValues.headers[header] as string) || ""}
                  onChange={(e) => playground.setHeader(header, e.target.value)}
                  placeholder={`Enter ${header}`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Request Body */}
        {availableValues.body !== undefined && (
          <div>
            <h5 className="mb-2 text-xs font-medium text-gray-700">
              Request Body
            </h5>
            <textarea
              className="h-20 w-full rounded border px-2 py-1 text-xs"
              value={
                typeof availableValues.body === "string"
                  ? availableValues.body
                  : JSON.stringify(availableValues.body, null, 2)
              }
              onChange={(e) => {
                try {
                  const parsed = JSON.parse(e.target.value);
                  playground.setBody(parsed);
                } catch {
                  playground.setBody(e.target.value);
                }
              }}
              placeholder="Enter request body (JSON)"
            />
          </div>
        )}

        {/* Send Request Button */}
        <div className="pt-2">
          <FernButton
            onClick={() => {
              void playground.sendRequest();
            }}
            intent="primary"
            size="small"
            className="w-full"
          >
            Send Request
          </FernButton>
        </div>

        {/* Response Analysis */}
        {playground.responseAnalysis && (
          <div className="mt-4 rounded bg-gray-50 p-3">
            <h5 className="mb-2 text-xs font-medium text-gray-700">
              Response Analysis
            </h5>
            <div className="space-y-1 text-xs">
              <div>
                Status: {playground.responseAnalysis.statusCode}{" "}
                {playground.responseAnalysis.statusText}
              </div>
              <div>
                Success: {playground.responseAnalysis.isSuccess ? "Yes" : "No"}
              </div>
              {playground.responseAnalysis.responseTime && (
                <div>Time: {playground.responseAnalysis.responseTime}ms</div>
              )}
              {playground.responseAnalysis.hasErrors && (
                <div className="text-red-600">
                  Error: {playground.responseAnalysis.errorDetails.message}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function PlaygroundEndpointRequestCard({
  context,
  formState,
}: PlaygroundEndpointRequestCardProps): ReactElement<any> | null {
  const isFileForgeHackEnabled = useAtomValue(isFileForgeHackEnabledAtom);
  const [requestType, setRequestType] = useRequestType();
  const setOAuthValue = useSetAtom(PLAYGROUND_AUTH_STATE_OAUTH_ATOM);
  const [baseUrl] = usePlaygroundBaseUrl(context.endpoint);
  const [activeTab, setActiveTab] = useState<"preview" | "basic">("preview");

  const tabOptions: FernDropdown.Option[] = [
    { type: "value", value: "preview", label: "Request Preview" },
    { type: "value", value: "basic", label: "Basic Interface" },
  ];

  return (
    <FernCard className="rounded-3 flex min-w-0 flex-1 shrink flex-col overflow-hidden">
      <div className="border-border-default flex h-10 w-full shrink-0 items-center justify-between border-b px-3 py-2">
        <span className="text-(color:--grayscale-a11) text-xs uppercase">
          Request
        </span>

        {/* Tab Selector */}
        <FernSegmentedControl
          options={tabOptions}
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as "preview" | "basic")}
        />

        {/* Language Selector and Copy Button - only show for preview tab */}
        {activeTab === "preview" && (
          <>
            <FernButtonGroup>
              <FernButton
                onClick={() => setRequestType("curl")}
                size="small"
                variant="minimal"
                intent={requestType === "curl" ? "primary" : "none"}
                active={requestType === "curl"}
              >
                cURL
              </FernButton>
              <FernButton
                onClick={() => setRequestType("typescript")}
                size="small"
                variant="minimal"
                intent={requestType === "typescript" ? "primary" : "none"}
                active={requestType === "typescript"}
              >
                TypeScript
              </FernButton>
              <FernButton
                onClick={() => setRequestType("python")}
                size="small"
                variant="minimal"
                intent={requestType === "python" ? "primary" : "none"}
                active={requestType === "python"}
              >
                Python
              </FernButton>
            </FernButtonGroup>
            <CopyToClipboardButton
              content={() => {
                const authState = jotaiStore.get(PLAYGROUND_AUTH_STATE_ATOM);
                const resolver = new PlaygroundCodeSnippetResolverBuilder(
                  context,
                  true,
                  isFileForgeHackEnabled
                ).create(authState, formState, baseUrl, setOAuthValue);
                return resolver.resolve(requestType);
              }}
              className="-mr-2"
            />
          </>
        )}
      </div>

      {/* Tab Content */}
      {activeTab === "preview" ? (
        <PlaygroundRequestPreview
          context={context}
          formState={formState}
          requestType={requestType}
        />
      ) : (
        <PlaygroundBasicInterface />
      )}
    </FernCard>
  );
}
