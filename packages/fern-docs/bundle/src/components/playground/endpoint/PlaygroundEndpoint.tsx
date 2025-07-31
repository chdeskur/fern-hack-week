"use client";

import { useCallback, useState } from "react";

import { mapValues } from "es-toolkit/object";
import { useAtomValue, useSetAtom } from "jotai";
import { useAtomCallback } from "jotai/utils";
import { SendHorizonal } from "lucide-react";

import { ApiDefinition, FernNavigation } from "@fern-api/fdr-sdk";
import type { EndpointContext } from "@fern-api/fdr-sdk/api-definition";
import { buildEndpointUrl } from "@fern-api/fdr-sdk/api-definition";
import { EndpointId } from "@fern-api/fdr-sdk/navigation";
import { unknownToString } from "@fern-api/ui-core-utils";
import {
  FernDropdown,
  FernSegmentedControl,
  FernTooltipProvider,
} from "@fern-docs/components";
import { fernUserAtom } from "@fern-docs/components/state/fern-user";
import { jotaiStore } from "@fern-docs/components/state/jotai-provider";
import {
  Loadable,
  failed,
  loaded,
  loading,
  notStartedLoading,
} from "@fern-ui/loadable";
import { useEventCallback } from "@fern-ui/react-commons";

import {
  isProxyDisabledAtom,
  usesApplicationJsonInFormDataValueAtom,
} from "@/state/api-explorer-flags";
import {
  PLAYGROUND_AUTH_STATE_ATOM,
  PLAYGROUND_AUTH_STATE_OAUTH_ATOM,
  playgroundFormStateFamily,
  usePlaygroundEndpointFormState,
} from "@/state/playground";

import { track } from "../../analytics";
import { usePlaygroundSettings } from "../../hooks/usePlaygroundSettings";
import { ChatBotInterface } from "../agent/ChatInterface";
import { PlaygroundContextProvider } from "../agent/PlaygroundContext";
import { executeProxyRest } from "../fetch-utils/executeProxyRest";
import { executeProxyStream } from "../fetch-utils/executeProxyStream";
import type { ProxyRequest } from "../types";
import { PlaygroundResponse } from "../types/playgroundResponse";
import {
  buildAuthHeaders,
  getInitialEndpointRequestFormStateWithExample,
  serializeFormStateBody,
} from "../utils";
import { usePlaygroundBaseUrl } from "../utils/select-environment";
import { isLocal } from "../utils/utils";
import { PlaygroundEndpointContent } from "./PlaygroundEndpointContent";
import { PlaygroundEndpointPath } from "./PlaygroundEndpointPath";

export const PlaygroundEndpoint = ({
  context,
  authForm,
  apiDefinition,
  endpointsData,
}: {
  context: EndpointContext;
  authForm: React.ReactNode;
  apiDefinition: ApiDefinition.ApiDefinition;
  endpointsData?: {
    id: EndpointId;
    nodes: FernNavigation.EndpointNode[];
  }[];
}) => {
  const user = useAtomValue(fernUserAtom);
  const { node, endpoint, auth } = context;

  const [activeTab, setActiveTab] = useState<"manual" | "chat">("manual");

  const tabOptions: FernDropdown.Option[] = [
    { type: "value", value: "manual", label: "Manual Mode" },
    { type: "value", value: "chat", label: "Chat Mode" },
  ];

  const [formState, setFormState] = usePlaygroundEndpointFormState(context);

  const resetWithExample = useEventCallback(() => {
    setFormState(
      getInitialEndpointRequestFormStateWithExample(
        context,
        context.endpoint.examples?.[0],
        user?.playground?.initial_state
      )
    );
  });

  const resetWithoutExample = useEventCallback(() => {
    setFormState(
      getInitialEndpointRequestFormStateWithExample(
        context,
        undefined,
        user?.playground?.initial_state
      )
    );
  });

  const usesApplicationJsonInFormDataValue = useAtomValue(
    usesApplicationJsonInFormDataValueAtom
  );
  const isProxyDisabled = useAtomValue(isProxyDisabledAtom);
  const [response, setResponse] =
    useState<Loadable<PlaygroundResponse>>(notStartedLoading());

  const [baseUrl, environmentId] = usePlaygroundBaseUrl(endpoint);

  const setOAuthValue = useSetAtom(PLAYGROUND_AUTH_STATE_OAUTH_ATOM);

  const sendRequest = useAtomCallback(
    useCallback(
      async (get) => {
        if (endpoint == null) {
          return;
        }
        setResponse(loading());
        try {
          const _formState = get(playgroundFormStateFamily(context.node.id));
          const latestFormState =
            _formState?.type === "endpoint" ? _formState : formState;
          track("api_playground_request_sent", {
            endpointId: endpoint.id,
            endpointName: node.title,
            method: endpoint.method,
            docsRoute: `/${node.slug}`,
          });
          const authHeaders = buildAuthHeaders(
            auth,
            jotaiStore.get(PLAYGROUND_AUTH_STATE_ATOM),
            {
              redacted: false,
            },
            {
              formState: latestFormState,
              endpoint,
              baseUrl,
              setValue: setOAuthValue,
            }
          );
          const headers = {
            ...authHeaders,
            ...mapValues(latestFormState.headers ?? {}, (value) =>
              unknownToString(value)
            ),
          };

          if (
            endpoint.method !== "GET" &&
            endpoint.requests?.[0]?.contentType != null
          ) {
            headers["Content-Type"] = endpoint.requests[0].contentType;
          }

          // Add application/json content type for OpenRPC endpoints
          if (endpoint.protocol?.type === "openrpc") {
            headers["Content-Type"] = "application/json";
          }

          const req: ProxyRequest = {
            url: buildEndpointUrl({
              endpoint,
              pathParameters: latestFormState.pathParameters,
              queryParameters: latestFormState.queryParameters,
              baseUrl,
            }),
            method: endpoint.method,
            headers,
            body: await serializeFormStateBody({
              shape: endpoint.requests?.[0]?.body,
              body: latestFormState.body,
              usesApplicationJsonInFormDataValue,
              protocol: endpoint.protocol,
            }),
          };
          if (endpoint.responses?.[0]?.body.type === "stream") {
            const [res, stream] = await executeProxyStream(
              req,
              isProxyDisabled || isLocal()
            );

            const time = Date.now();
            const reader = stream.getReader();
            let result = "";
            const decoder = new TextDecoder();

            while (true) {
              const { done, value } = await reader.read();
              if (done) {
                break;
              }
              result += decoder.decode(value);
              setResponse(
                loaded({
                  type: "stream",
                  response: {
                    status: res.status,
                    body: result,
                  },
                  time: Date.now() - time,
                })
              );
            }
          } else {
            const res = await executeProxyRest(
              req,
              isProxyDisabled || isLocal()
            );
            setResponse(loaded(res));
            if (res.type !== "stream") {
              track("api_playground_request_received", {
                endpointId: endpoint.id,
                endpointName: node.title,
                method: endpoint.method,
                docsRoute: `/${node.slug}`,
                response: {
                  status: res.response.status,
                  statusText: res.response.statusText,
                  time: res.time,
                  size: res.size,
                },
              });
            }
          }
        } catch (e) {
          // TODO: sentry

          console.error(
            "An unexpected error occurred while sending request to the proxy server. This is likely a bug, rather than a user error.",
            e
          );
          setResponse(failed(e));
        }
      },
      [
        endpoint,
        node.title,
        node.slug,
        auth,
        formState,
        baseUrl,
        setOAuthValue,
        usesApplicationJsonInFormDataValue,
        isProxyDisabled,
        context.node.id,
      ]
    )
  );

  const settings = usePlaygroundSettings();

  const chatInterface =
    activeTab === "chat" ? (
      <div className="border-border-default bg-background absolute bottom-0 right-0 top-0 w-[400px] overflow-hidden border-l">
        <ChatBotInterface
          apiDefinition={apiDefinition}
          endpoint={endpoint}
          endpointsData={endpointsData}
        />
      </div>
    ) : null;

  const playgroundContent = (
    <FernTooltipProvider>
      <div
        className={`relative flex size-full min-h-0 flex-1 shrink flex-col ${activeTab === "chat" ? "pr-[400px]" : ""}`}
      >
        <div className="my-6 flex h-10 items-center justify-center px-3">
          <FernSegmentedControl
            options={tabOptions}
            value={activeTab}
            onValueChange={(value) => setActiveTab(value as "manual" | "chat")}
          />
        </div>

        <div className="flex-0">
          <PlaygroundEndpointPath
            method={endpoint.method}
            formState={formState}
            sendRequest={() => {
              void (async () => {
                try {
                  await sendRequest();
                } catch (e) {
                  console.error("Failed to send request:", e);
                }
              })();
            }}
            environmentId={environmentId}
            baseUrl={baseUrl}
            // TODO: this is a temporary fix to show all environments in the playground, unless filtered in the settings
            // this is so that the playground can be specifically disabled for certain environments
            options={
              settings?.environments
                ? endpoint.environments?.filter(
                    (env) => settings.environments?.includes(env.id) ?? true
                  )
                : endpoint.environments
            }
            path={endpoint.path}
            queryParameters={endpoint.queryParameters}
            sendRequestIcon={
              <SendHorizonal className="transition-transform group-hover:translate-x-0.5" />
            }
            types={context.types}
          />
        </div>
        <div className="flex min-h-0 flex-1 shrink">
          <PlaygroundEndpointContent
            authForm={authForm}
            context={context}
            formState={formState}
            setFormState={setFormState}
            resetWithExample={resetWithExample}
            resetWithoutExample={resetWithoutExample}
            response={response}
            sendRequest={() => {
              void (async () => {
                try {
                  await sendRequest();
                } catch (e) {
                  console.error("Failed to send request:", e);
                }
              })();
            }}
          />
        </div>
        {chatInterface}
      </div>
    </FernTooltipProvider>
  );

  return (
    <PlaygroundContextProvider
      context={context}
      formState={formState}
      setFormState={setFormState}
      response={response}
      setResponse={setResponse}
      sendRequest={sendRequest}
      resetWithExample={resetWithExample}
      resetWithoutExample={resetWithoutExample}
    >
      {playgroundContent}
    </PlaygroundContextProvider>
  );
};
