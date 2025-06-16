/* eslint-disable unused-imports/no-unused-vars */
import { AuthType } from "@prisma/client";
import urlJoin from "url-join";
import { v4 as uuidv4 } from "uuid";

import {
  DocsV1Write,
  FdrAPI,
  convertDocsDefinitionToDb,
} from "@fern-api/fdr-sdk";
import { isNonNullish } from "@fern-api/ui-core-utils";

import { DocsV2WriteService } from "../../../api";
import {
  DomainBelongsToAnotherOrgError,
  InvalidUrlError,
  UnauthorizedError,
} from "../../../api/generated/api/resources/commons/errors";
import { DocsRegistrationIdNotFound } from "../../../api/generated/api/resources/docs/resources/v1/resources/write/errors";
import { DomainNotRegisteredError } from "../../../api/generated/api/resources/docs/resources/v2/resources/read";
import { InvalidDomainError } from "../../../api/generated/api/resources/docs/resources/v2/resources/write/errors";
import { type FdrApplication } from "../../../app";
import { type S3DocsFileInfo } from "../../../services/s3";
import { ParsedBaseUrl } from "../../../util/ParsedBaseUrl";

export interface DocsRegistrationInfo {
  fernUrl: ParsedBaseUrl;
  customUrls: ParsedBaseUrl[];
  orgId: FdrAPI.OrgId;
  s3FileInfos: Record<DocsV1Write.FilePath, S3DocsFileInfo>;
  isPreview: boolean;
  authType: AuthType;
}

function pathnameIsMalformed(pathname: string): boolean {
  if (pathname === "" || pathname === "/") {
    return false;
  }
  if (!/^.*([a-z0-9]).*$/.test(pathname)) {
    // does the pathname only contain special characters?
    return true;
  }
  return false;
}

function validateAndParseFernDomainUrl({
  app,
  url,
}: {
  app: FdrApplication;
  url: string;
}): ParsedBaseUrl {
  const baseUrl = ParsedBaseUrl.parse(url);
  if (baseUrl.path != null && pathnameIsMalformed(baseUrl.path)) {
    throw new InvalidUrlError(
      `Domain URL is malformed: https://${baseUrl.hostname + baseUrl.path}`
    );
  }
  if (!baseUrl.hostname.endsWith(app.config.domainSuffix)) {
    throw new InvalidDomainError();
  }
  return baseUrl;
}

function parseCustomDomainUrls({
  customUrls,
}: {
  customUrls: string[];
}): ParsedBaseUrl[] {
  const parsedUrls: ParsedBaseUrl[] = [];
  for (const customUrl of customUrls) {
    const baseUrl = ParsedBaseUrl.parse(customUrl);
    parsedUrls.push(baseUrl);
  }
  return parsedUrls;
}

export function getDocsWriteV2Service(app: FdrApplication): DocsV2WriteService {
  return new DocsV2WriteService({
    startDocsRegister: async (req, res) => {
      await app.services.auth.checkUserBelongsToOrg({
        authHeader: req.headers.authorization,
        orgId: req.body.orgId,
      });

      const fernUrl = validateAndParseFernDomainUrl({
        app,
        url: req.body.domain,
      });
      const customUrls = parseCustomDomainUrls({
        customUrls: req.body.customDomains,
      });

      // ensure that the domains are not already registered by another org
      const { allDomainsOwned: hasOwnership, unownedDomains } = await app.dao
        .docsV2()
        .checkDomainsDontBelongToAnotherOrg(
          [fernUrl, ...customUrls].map((url) => url.getFullUrl()),
          req.body.orgId
        );
      if (!hasOwnership) {
        throw new DomainBelongsToAnotherOrgError(
          `The following domains belong to another organization: ${unownedDomains.join(", ")}`
        );
      }

      const docsRegistrationId = DocsV1Write.DocsRegistrationId(uuidv4());
      const s3FileInfos =
        await app.services.s3.getPresignedDocsAssetsUploadUrls({
          domain: req.body.domain,
          filepaths: req.body.filepaths,
          images: req.body.images ?? [],
          isPrivate: req.body.authConfig?.type === "private",
        });

      await app.services.slack.notifyGeneratedDocs({
        orgId: req.body.orgId,
        urls: [
          fernUrl.toURL().toString(),
          ...customUrls.map((url) => url.toURL().toString()),
        ],
      });
      await app.dao
        .docsRegistration()
        .storeDocsRegistrationById(docsRegistrationId, {
          fernUrl,
          customUrls,
          orgId: req.body.orgId,
          s3FileInfos,
          isPreview: false,
          authType:
            req.body.authConfig?.type === "private"
              ? AuthType.WORKOS_SSO
              : AuthType.PUBLIC,
        });
      return res.send({
        docsRegistrationId,
        uploadUrls: Object.fromEntries(
          Object.entries(s3FileInfos).map(([filepath, fileInfo]) => {
            return [filepath, fileInfo.presignedUrl];
          })
        ),
      });
    },
    startDocsPreviewRegister: async (req, res) => {
      await app.services.auth.checkUserBelongsToOrg({
        authHeader: req.headers.authorization,
        orgId: req.body.orgId,
      });
      const docsRegistrationId = DocsV1Write.DocsRegistrationId(uuidv4());
      const fernUrl = ParsedBaseUrl.parse(
        urlJoin(
          `${req.body.orgId}-preview-${docsRegistrationId}.${app.config.domainSuffix}`,
          req.body.basePath ?? ""
        )
      );
      const s3FileInfos =
        await app.services.s3.getPresignedDocsAssetsUploadUrls({
          domain: fernUrl.hostname,
          filepaths: req.body.filepaths,
          images: req.body.images ?? [],
          isPrivate: req.body.authConfig?.type === "private",
        });
      await app.dao
        .docsRegistration()
        .storeDocsRegistrationById(docsRegistrationId, {
          fernUrl,
          customUrls: [],
          orgId: req.body.orgId,
          s3FileInfos,
          isPreview: true,
          authType:
            req.body.authConfig?.type === "private"
              ? AuthType.WORKOS_SSO
              : AuthType.PUBLIC,
        });
      return res.send({
        docsRegistrationId,
        uploadUrls: Object.fromEntries(
          Object.entries(s3FileInfos).map(([filepath, fileInfo]) => {
            return [filepath, fileInfo.presignedUrl];
          })
        ),
        previewUrl: `https://${fernUrl.getFullUrl()}`,
      });
    },
    finishDocsRegister: async (req, res) => {
      const docsRegistrationInfo = await app.dao
        .docsRegistration()
        .getDocsRegistrationById(req.params.docsRegistrationId);
      if (docsRegistrationInfo == null) {
        throw new DocsRegistrationIdNotFound();
      }

      if (req.headers.authorization == null) {
        throw new UnauthorizedError("Authorization header was not specified");
      }
      const authHeader = req.headers.authorization;

      try {
        app.logger.debug(
          `[${docsRegistrationInfo.fernUrl.getFullUrl()}] Called finishDocsRegister`
        );
        await app.services.auth.checkUserBelongsToOrg({
          authHeader: req.headers.authorization,
          orgId: docsRegistrationInfo.orgId,
        });

        app.logger.debug(
          `[${docsRegistrationInfo.fernUrl.getFullUrl()}] Transforming Docs Definition to DB`
        );
        const dbDocsDefinition = convertDocsDefinitionToDb({
          writeShape: req.body.docsDefinition,
          files: docsRegistrationInfo.s3FileInfos,
        });

        const apiDefinitions = (
          await Promise.all(
            dbDocsDefinition.referencedApis.map(
              async (id) => await app.services.db.getApiDefinition(id)
            )
          )
        ).filter(isNonNullish);
        const apiDefinitionsLatest = (
          await Promise.all(
            dbDocsDefinition.referencedApis.map(
              async (id) => await app.services.db.getApiLatestDefinition(id)
            )
          )
        ).filter(isNonNullish);

        const apiDefinitionsById = Object.fromEntries(
          apiDefinitions.map((definition) => [definition.id, definition])
        );
        const apiDefinitionsLatestById = Object.fromEntries(
          apiDefinitionsLatest.map((definition) => [definition.id, definition])
        );
        const warmEndpointCachePromises = apiDefinitions.flatMap(
          (apiDefinition) => {
            return Object.entries(apiDefinition.subpackages).flatMap(
              ([_, subpackage]) => {
                if (app.config.localModeOverride) {
                  return;
                }
                return subpackage.endpoints.map(async (endpoint) => {
                  try {
                    return await fetch(
                      `https://${docsRegistrationInfo.fernUrl.getFullUrl()}/api/fern-docs/api-definition/${apiDefinition.id}/endpoint/${endpoint.originalEndpointId}`
                    );
                  } catch (e: Error | unknown) {
                    app.logger.error(
                      `Error while trying to warm endpoint cache for ${JSON.stringify(docsRegistrationInfo.fernUrl)} ${e instanceof Error ? e.stack : ""}`
                    );
                    throw e;
                  }
                });
              }
            );
          }
        );

        await app.docsDefinitionCache.storeDocsForUrl({
          docsRegistrationInfo,
          dbDocsDefinition,
        });

        /**
         * IMPORTANT NOTE:
         * vercel cache is not shared between custom domains, so we need to revalidate on EACH custom domain individually
         */
        const urls = [
          docsRegistrationInfo.fernUrl,
          ...docsRegistrationInfo.customUrls,
        ];

        for (const url of urls) {
          try {
            const response = await app.docsDefinitionCache.getDocsForUrl({
              url: url.toURL(),
            });

            await app.services.s3.writeLoadDocsForUrlResponse({
              domain: url.hostname,
              readDocsDefinition: response,
            });
          } catch (e) {
            app.logger.error(
              `Error while trying to write DB docs definition for ${url.getFullUrl()}`,
              e
            );
          }
        }

        try {
          await Promise.all(
            urls.map(async (baseUrl) => {
              const results = await app.services.revalidator.revalidate({
                baseUrl,
                app,
                authHeader,
              });
              if (results.failed.length === 0 && !results.revalidationFailed) {
                app.logger.info(
                  `Successfully revalidated ${results.successful.length} paths.`
                );
              } else {
                await app.services.slack.notifyFailedToRevalidatePaths({
                  domain: baseUrl.getFullUrl(),
                  paths: results,
                });
              }
            })
          );
        } catch (e) {
          app.logger.error(
            `Error while trying to revalidate docs for ${docsRegistrationInfo.fernUrl}`,
            e
          );
          await app.services.slack.notifyFailedToRegisterDocs({
            domain: docsRegistrationInfo.fernUrl.getFullUrl(),
            err: e,
          });
          throw e;
        }
        await Promise.all(warmEndpointCachePromises);
        return await res.send();
      } catch (e) {
        app.logger.error(
          `Error while trying to register docs for ${docsRegistrationInfo.fernUrl}`,
          e
        );
        await app.services.slack.notifyFailedToRegisterDocs({
          domain: docsRegistrationInfo.fernUrl.getFullUrl(),
          err: e,
        });
        throw e;
      }
    },
    transferOwnershipOfDomain: async (req, res) => {
      // only fern users can transfer domain ownership
      await app.services.auth.checkUserBelongsToOrg({
        authHeader: req.headers.authorization,
        orgId: "fern",
      });

      const parsedUrl = ParsedBaseUrl.parse(req.body.domain);

      await app.dao.docsV2().transferDomainOwner({
        domain: parsedUrl.getFullUrl(),
        toOrgId: req.body.toOrgId,
      });

      return res.send();
    },
    setIsArchived: async (req, res) => {
      const url = ParsedBaseUrl.parse(req.body.url);
      const orgId = await app.dao.docsV2().getOrgIdForDocsUrl(url.toURL());
      if (orgId == null) {
        throw new DomainNotRegisteredError();
      }

      await app.services.auth.checkUserBelongsToOrg({
        authHeader: req.headers.authorization,
        orgId,
      });

      await app.dao.docsV2().setIsDocsDefinitionArchived({
        url,
        isArchived: req.body.isArchived,
      });

      return res.send();
    },
  });
}
