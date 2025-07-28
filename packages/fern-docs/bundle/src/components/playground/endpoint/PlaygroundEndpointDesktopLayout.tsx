import { ReactElement, ReactNode, useState } from "react";

import {
  FernButton,
  FernDropdown,
  FernSegmentedControl,
} from "@fern-docs/components";

import { usePlaygroundContext } from "../PlaygroundContext";
import { HorizontalSplitPane, VerticalSplitPane } from "../VerticalSplitPane";

interface PlaygroundEndpointDesktopLayoutProps {
  scrollAreaHeight: number;
  form: ReactNode;
  requestCard: ReactNode;
  responseCard: ReactNode;
  endpointId?: string;
}

function PlaygroundBasicInterface() {
  const playground = usePlaygroundContext();

  if (!playground.context || !("endpoint" in playground.context)) {
    return <div>No endpoint context available</div>;
  }

  const endpoint = playground.context.endpoint;
  const availableValues = playground.availableValues;

  return (
    <div className="pointer-events-auto space-y-4 overflow-y-auto p-4">
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
          {(() => {
            const unpackedBody = playground.unpackRequestBody();
            if (unpackedBody.properties.length > 0) {
              return (
                <div className="space-y-1">
                  {unpackedBody.properties.map((property) => (
                    <div
                      key={property.key}
                      className="flex items-center space-x-2"
                    >
                      <span className="w-20 text-xs text-gray-600">
                        {property.key}:
                      </span>
                      <input
                        type="text"
                        className="flex-1 rounded border px-2 py-1 text-xs"
                        value={
                          (playground.getRequestBodyParameter(
                            property.path
                          ) as string) || ""
                        }
                        onChange={(e) => {
                          playground.setRequestBodyParameter(
                            property.path,
                            e.target.value
                          );
                        }}
                        placeholder={`Enter ${property.key}${property.description ? ` (${property.description})` : ""}`}
                      />
                    </div>
                  ))}
                </div>
              );
            } else {
              // Fallback to JSON textarea if no properties are unpacked
              return (
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
              );
            }
          })()}
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
  );
}

export function PlaygroundEndpointDesktopLayout({
  scrollAreaHeight,
  form,
  requestCard,
  responseCard,
  // endpointId,
}: PlaygroundEndpointDesktopLayoutProps): ReactElement<any> {
  const [activeTab, setActiveTab] = useState<"preview" | "basic">("preview");

  const tabOptions: FernDropdown.Option[] = [
    { type: "value", value: "preview", label: "Request Preview" },
    { type: "value", value: "basic", label: "Basic Interface" },
  ];

  return (
    <HorizontalSplitPane
      rizeBarHeight={scrollAreaHeight}
      leftClassName="pl-6 pr-1 mt"
      rightClassName="pl-1"
    >
      {form}

      <div className="sticky inset-0 pr-6">
        {/* Tab Selector */}
        <div className="flex h-10 items-center justify-end px-3 py-2">
          <FernSegmentedControl
            options={tabOptions}
            value={activeTab}
            onValueChange={(value) =>
              setActiveTab(value as "preview" | "basic")
            }
          />
        </div>

        {/* Content based on active tab */}
        {activeTab === "preview" ? (
          <VerticalSplitPane
            className="sticky inset-0"
            style={{ height: scrollAreaHeight - 40 }} // Subtract header height
            aboveClassName={"pt-6 pb-1 flex items-stretch justify-stretch"}
            belowClassName="pb-6 pt-1 flex items-stretch justify-stretch"
          >
            {requestCard}
            {responseCard}
          </VerticalSplitPane>
        ) : (
          <div
            className="sticky inset-0 overflow-y-auto"
            style={{ height: scrollAreaHeight - 40 }} // Subtract header height
          >
            <PlaygroundBasicInterface />
          </div>
        )}
      </div>
    </HorizontalSplitPane>
  );
}
