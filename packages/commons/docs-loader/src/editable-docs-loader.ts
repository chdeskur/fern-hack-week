import { AuthEdgeConfig } from "@fern-api/docs-auth";
import { AuthState } from "@fern-api/docs-server";
import { FernFonts } from "@fern-api/docs-server";
import { DocsLoader } from "@fern-api/docs-server/docs-loader";
import { EdgeFlags, FernColorTheme } from "@fern-api/docs-utils";
import { HttpMethod } from "@fern-api/docs-utils";
import { FileData } from "@fern-api/docs-utils/types/file-data";
import { FernLayoutConfig } from "@fern-api/docs-utils/types/layout-config";
import { DocsV1Read, FernNavigation } from "@fern-api/fdr-sdk";
import {
  ApiDefinition,
  ApiDefinitionId,
  AuthScheme,
  EndpointDefinition,
  EndpointId,
  ObjectProperty,
  PruningNodeType,
  TypeDefinition,
  TypeId,
} from "@fern-api/fdr-sdk/api-definition";
import {
  EndpointNode,
  NavigationNode,
  RootNode,
  Slug,
} from "@fern-api/fdr-sdk/navigation";

import { createCachedDocsLoader } from "./readonly-docs-loader";

export interface EditableDocsLoader extends DocsLoader {
  modifiedMdxFiles: Record<string, string>;
  setMdxFile: (filename: string, content: string) => Promise<void>;
}

/**
 * This is a wrapper around the read-only docs loader that allows us to modify the mdx files.
 * It is used to allow users to edit the docs and see the changes immediately.
 */
class EditableDocsLoaderImpl implements EditableDocsLoader {
  modifiedMdxFiles: Record<string, string>;
  domain: string;
  fern_token: string | undefined;
  private readOnlyDocsLoader: DocsLoader;

  constructor(docsLoader: DocsLoader) {
    this.modifiedMdxFiles = {};
    this.readOnlyDocsLoader = docsLoader;
    this.domain = docsLoader.domain;
    this.fern_token = docsLoader.fern_token;
  }

  setMdxFile(filename: string, content: string): Promise<void> {
    this.modifiedMdxFiles[filename] = content;
    return Promise.resolve();
  }

  async unsafe_getFullRoot(): Promise<FernNavigation.RootNode> {
    return this.readOnlyDocsLoader.unsafe_getFullRoot();
  }

  async getAuthConfig(): Promise<AuthEdgeConfig | undefined> {
    return this.readOnlyDocsLoader.getAuthConfig();
  }

  async getMetadata(): Promise<{
    url: string;
    domain: string;
    basePath: string;
    org: string;
    isPreview: boolean;
  }> {
    return this.readOnlyDocsLoader.getMetadata();
  }

  async getFiles(): Promise<Record<string, FileData>> {
    return this.readOnlyDocsLoader.getFiles();
  }

  async getMdxBundlerFiles(): Promise<Record<string, string>> {
    return this.modifiedMdxFiles;
  }
  async getPrunedApi(
    id: string,
    ...nodes: PruningNodeType[]
  ): Promise<ApiDefinition> {
    return this.readOnlyDocsLoader.getPrunedApi(id, ...nodes);
  }

  async getEndpointById(
    apiDefinitionId: string,
    endpointId: EndpointId
  ): Promise<{
    endpoint: EndpointDefinition;
    nodes: EndpointNode[];
    globalHeaders: ObjectProperty[];
    authSchemes: AuthScheme[];
    types: Record<TypeId, TypeDefinition>;
  }> {
    return this.readOnlyDocsLoader.getEndpointById(apiDefinitionId, endpointId);
  }

  async getEndpointByLocator(
    method: HttpMethod,
    path: string,
    example?: string
  ): Promise<{
    apiDefinitionId: ApiDefinitionId;
    endpoint: EndpointDefinition;
    slugs: Slug[];
  }> {
    return this.readOnlyDocsLoader.getEndpointByLocator(method, path, example);
  }

  async getRoot(): Promise<RootNode> {
    return this.readOnlyDocsLoader.getRoot();
  }

  async getNavigationNode(id: string): Promise<NavigationNode> {
    return this.readOnlyDocsLoader.getNavigationNode(id);
  }

  async getConfig(): Promise<
    Omit<DocsV1Read.DocsDefinition["config"], "navigation" | "root">
  > {
    return this.readOnlyDocsLoader.getConfig();
  }

  async getPage(pageId: string): Promise<{
    filename: string;
    markdown: string;
    editThisPageUrl?: string;
  }> {
    // if (this.modifiedMdxFiles[pageId] != null) {
    //   return {
    //     filename: pageId,
    //     markdown: this.modifiedMdxFiles[pageId],
    //     editThisPageUrl: `https://${this.domain}/docs/edit/${pageId}`,
    //   };
    // }
    return this.readOnlyDocsLoader.getPage(pageId);
  }

  async getColors(): Promise<{
    light?: FernColorTheme;
    dark?: FernColorTheme;
  }> {
    return this.readOnlyDocsLoader.getColors();
  }

  async getFonts(): Promise<FernFonts> {
    return this.readOnlyDocsLoader.getFonts();
  }

  async getLayout(): Promise<FernLayoutConfig> {
    return this.readOnlyDocsLoader.getLayout();
  }

  async getAuthState(pathname?: string): Promise<AuthState> {
    return this.readOnlyDocsLoader.getAuthState(pathname);
  }

  async getEdgeFlags(): Promise<EdgeFlags> {
    return this.readOnlyDocsLoader.getEdgeFlags();
  }

  async getBaseUrl(): Promise<string> {
    return this.readOnlyDocsLoader.getBaseUrl();
  }

  async getModifiedMdxFiles(): Promise<Record<string, string>> {
    return this.modifiedMdxFiles;
  }
}

export const createEditableDocsLoader = async (
  host: string,
  workspaceId: string,
  fern_token?: string
) => {
  // TODO: derive the domain from the workspace
  const domain = "fern.docs.buildwithfern.com";
  const docsLoader = await createCachedDocsLoader(host, domain, fern_token);
  return new EditableDocsLoaderImpl(docsLoader);
};
