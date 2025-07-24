import { uniqueId } from "es-toolkit/compat";
import { expect, inject } from "vitest";

import { DocsV1Write, FdrAPI } from "@fern-api/fdr-sdk";
import { FernRegistry } from "@fern-fern/fdr-cjs-sdk";

import { getAPIResponse, getClient } from "../util";

export const FONT_FILE_ID = DocsV1Write.FileId(uniqueId());
export const WRITE_DOCS_REGISTER_DEFINITION: DocsV1Write.DocsDefinition = {
  pages: {},
  config: {
    navigation: {
      items: [],
      landingPage: undefined,
    },
    root: undefined,
    typography: {
      headingsFont: {
        name: "Syne",
        fontFile: FONT_FILE_ID,
      },
      bodyFont: undefined,
      codeFont: undefined,
    },
    title: undefined,
    defaultLanguage: undefined,
    announcement: undefined,
    navbarLinks: undefined,
    footerLinks: undefined,
    hideNavLinks: undefined,
    logoHeight: undefined,
    logoHref: undefined,
    favicon: undefined,
    metadata: undefined,
    redirects: undefined,
    colorsV3: undefined,
    layout: undefined,
    typographyV2: undefined,
    analyticsConfig: undefined,
    integrations: undefined,
    css: undefined,
    js: undefined,
    aiChatConfig: undefined,
    backgroundImage: undefined,
    logoV2: undefined,
    logo: undefined,
    colors: undefined,
    colorsV2: undefined,
  },
  jsFiles: undefined,
};

it("docs register", async () => {
  const fdr = getClient({ authed: true, url: inject("url") });
  const domain = `docs-${Math.random()}.fern.com`;

  // register docs
  const startDocsRegisterResponse = getAPIResponse(
    await fdr.docs.v1.write.startDocsRegister({
      orgId: FdrAPI.OrgId("fern"),
      domain,
      filepaths: [
        DocsV1Write.FilePath("logo.png"),
        DocsV1Write.FilePath("guides/guide.mdx"),
      ],
    })
  );
  await fdr.docs.v1.write.finishDocsRegister(
    startDocsRegisterResponse.docsRegistrationId,
    {
      docsDefinition: WRITE_DOCS_REGISTER_DEFINITION,
    }
  );

  // load docs
  const docs = getAPIResponse(
    await fdr.docs.v1.read.getDocsForDomain({
      domain,
    })
  );
  // assert docs have 2 file urls
  expect(Object.entries(docs.files)).toHaveLength(2);

  // re-register docs
  const startDocsRegisterResponse2 = getAPIResponse(
    await fdr.docs.v1.write.startDocsRegister({
      orgId: FdrAPI.OrgId("fern"),
      domain,
      filepaths: [],
    })
  );
  await fdr.docs.v1.write.finishDocsRegister(
    startDocsRegisterResponse2.docsRegistrationId,
    {
      docsDefinition: WRITE_DOCS_REGISTER_DEFINITION,
    }
  );
});

it("test invalid domain URL - special characters", async () => {
  const fdr = getClient({ authed: true, url: inject("url") });
  const domain = `https://fern-${Math.random()}.docs.buildwithfern.com`;
  // register docs
  const startDocsRegisterResponse = getAPIResponse(
    await fdr.docs.v2.write.startDocsRegister({
      orgId: FdrAPI.OrgId(`plantstore-2024-test${Math.random()}`),
      apiId: FdrAPI.ApiId(""),
      domain,
      customDomains: [],
      filepaths: [
        DocsV1Write.FilePath("logo.png"),
        DocsV1Write.FilePath("guides/guide.mdx"),
        DocsV1Write.FilePath("fonts/Syne.woff2"),
      ],
    })
  );
  await fdr.docs.v2.write.finishDocsRegister(
    startDocsRegisterResponse.docsRegistrationId,
    {
      docsDefinition: WRITE_DOCS_REGISTER_DEFINITION,
    }
  );

  const startDocsRegisterResponse2 = await fdr.docs.v2.write.startDocsRegister({
    orgId: FdrAPI.OrgId(`plantstore-2024-test${Math.random()}`),
    apiId: FdrAPI.ApiId(""),
    domain: domain + "//",
    customDomains: [],
    filepaths: [
      DocsV1Write.FilePath("logo.png"),
      DocsV1Write.FilePath("guides/guide.mdx"),
      DocsV1Write.FilePath("fonts/Syne.woff2"),
    ],
  });

  // expecting an error, because adding // to the domain should not bypass domain check
  expect((startDocsRegisterResponse2 as any).error.content).toEqual({
    body: `Domain URL is malformed: ${domain + "//"}`,
    reason: "status-code",
    statusCode: 400,
  });
});

it("docs register V2", async () => {
  const fdr = getClient({ authed: true, url: inject("url") });
  // register docs
  const startDocsRegisterResponse = getAPIResponse(
    await fdr.docs.v2.write.startDocsRegister({
      orgId: FdrAPI.OrgId("acme"),
      apiId: FdrAPI.ApiId("api"),
      domain: "https://acme.docs.buildwithfern.com",
      customDomains: ["https://docs.useacme.com/docs"],
      filepaths: [
        DocsV1Write.FilePath("logo.png"),
        DocsV1Write.FilePath("guides/guide.mdx"),
        DocsV1Write.FilePath("fonts/Syne.woff2"),
      ],
    })
  );
  await fdr.docs.v2.write.finishDocsRegister(
    startDocsRegisterResponse.docsRegistrationId,
    {
      docsDefinition: WRITE_DOCS_REGISTER_DEFINITION,
    }
  );
  // load docs
  let docs = getAPIResponse(
    await fdr.docs.v2.read.getDocsForUrl({
      url: DocsV1Write.Url(
        "https://acme.docs.buildwithfern.com/my/random/slug"
      ),
    })
  );
  expect(docs.baseUrl.domain).toEqual("acme.docs.buildwithfern.com");
  expect(Object.entries(docs.definition.files)).toHaveLength(3);
  expect(docs.definition.config.typographyV2).toEqual({
    headingsFont: {
      type: "custom",
      name: "Syne",
      variants: [{ fontFile: FONT_FILE_ID }],
    },
  });
  // load docs again
  docs = getAPIResponse(
    await fdr.docs.v2.read.getDocsForUrl({
      url: DocsV1Write.Url("https://docs.useacme.com/docs/1/"),
    })
  );
  expect(docs.baseUrl.domain).toEqual("docs.useacme.com");
  expect(docs.baseUrl.basePath).toEqual("/docs");
  expect(Object.entries(docs.definition.files)).toHaveLength(3);

  //re-register docs
  const startDocsRegisterResponse2 = getAPIResponse(
    await fdr.docs.v2.write.startDocsRegister({
      orgId: FdrAPI.OrgId("acme"),
      apiId: FdrAPI.ApiId("api"),
      domain: "https://acme.docs.buildwithfern.com",
      customDomains: ["https://docs.useacme.com"],
      filepaths: [],
    })
  );
  await fdr.docs.v2.write.finishDocsRegister(
    startDocsRegisterResponse2.docsRegistrationId,
    {
      docsDefinition: WRITE_DOCS_REGISTER_DEFINITION,
    }
  );
});

test.sequential("revalidates a custom docs domain", async () => {
  const fdr = getClient({ authed: true, url: inject("url") });

  const resp = await fdr.docs.v2.read.listAllDocsUrls();
  console.log(resp);

  if (!resp.ok) {
    throw new Error("Failed to list all docs urls");
  }

  const { urls } = resp.body;
  console.log(urls);

  expect(urls.length).toBeGreaterThan(0);
});

test.sequential("sets and retrieves docs url metadata", async () => {
  console.log(inject("url"));
  const fdr = getClient({ authed: true, url: inject("url") });
  const domain = `acme-${Math.random()}.docs.buildwithfern.com`;

  // register docs first
  const startDocsRegisterResponse = getAPIResponse(
    await fdr.docs.v2.write.startDocsRegister({
      orgId: FdrAPI.OrgId("acme"),
      apiId: FdrAPI.ApiId("api"),
      domain: `https://${domain}`,
      customDomains: [],
      filepaths: [
        DocsV1Write.FilePath("logo.png"),
        DocsV1Write.FilePath("guides/guide.mdx"),
        DocsV1Write.FilePath("fonts/Syne.woff2"),
      ],
    })
  );
  await fdr.docs.v2.write.finishDocsRegister(
    startDocsRegisterResponse.docsRegistrationId,
    {
      docsDefinition: WRITE_DOCS_REGISTER_DEFINITION,
    }
  );

  // set metadata
  const githubUrl = "https://github.com/fern-api/fern";
  await fetch(`${inject("url")}v2/registry/docs/set-metadata-for-url`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer test-token",
    },
    body: JSON.stringify({
      url: `https://${domain}`,
      githubUrl,
    }),
  });

  // retrieve metadata
  const metadataResponse = getAPIResponse(
    await fdr.docs.v2.read.getDocsUrlMetadata({
      url: DocsV1Write.Url(`https://${domain}`),
    })
  );

  expect(metadataResponse.url).toEqual(`https://${domain}`);
  expect(metadataResponse.gitUrl).toEqual(githubUrl);
  expect(metadataResponse.org).toEqual(FdrAPI.OrgId("acme"));
  expect(metadataResponse.isPreviewUrl).toBe(false);
});

it("preview domain truncation - valid preview link", async () => {
  const fdr = getClient({ authed: true, url: inject("url") });

  const startDocsPreviewResponse = getAPIResponse(
    await fdr.docs.v2.write.startDocsPreviewRegister({
      orgId: FdrAPI.OrgId("short"),
      filepaths: [
        DocsV1Write.FilePath("logo.png"),
        DocsV1Write.FilePath("guides/guide.mdx"),
      ],
    })
  );

  // check link is valid
  expect(startDocsPreviewResponse.previewUrl).toBeDefined();
  const previewUrl = new URL(startDocsPreviewResponse.previewUrl);
  const subdomains = previewUrl.hostname.split(".");
  const mainSubdomain = subdomains[0];
  expect(mainSubdomain.length).toBeLessThanOrEqual(63);
  expect(previewUrl.hostname).toMatch(
    /^short-preview-[a-f0-9-]+\.docs\.buildwithfern\.com$/
  );

  await fdr.docs.v2.write.finishDocsRegister(
    startDocsPreviewResponse.docsRegistrationId,
    {
      docsDefinition: WRITE_DOCS_REGISTER_DEFINITION,
    }
  );
});

it("preview domain truncation - requires truncation", async () => {
  const fdr = getClient({ authed: true, url: inject("url") });

  const startDocsPreviewResponse =
    await fdr.docs.v2.write.startDocsPreviewRegister({
      orgId: FdrAPI.OrgId("medium-org-name-for-truncation"),
      filepaths: [
        DocsV1Write.FilePath("logo.png"),
        DocsV1Write.FilePath("guides/guide.mdx"),
      ],
    });

  // this should trigger truncation logic, but still work
  if (!startDocsPreviewResponse.ok) {
    console.log(
      "Error response:",
      JSON.stringify(startDocsPreviewResponse.error, null, 2)
    );
  }
  expect(startDocsPreviewResponse.ok).toBe(true);
  if (startDocsPreviewResponse.ok) {
    const previewUrl = new URL(startDocsPreviewResponse.body.previewUrl);
    const subdomains = previewUrl.hostname.split(".");
    const mainSubdomain = subdomains[0];
    expect(mainSubdomain.length).toBeLessThanOrEqual(63);
    expect(previewUrl.hostname).toMatch(
      /^medium-org-name-for-truncation-preview-[a-f0-9-]{23,}\.docs\.buildwithfern\.com$/
    );
  }
});

it("preview domain truncation - errors out because too long", async () => {
  const fdr = getClient({ authed: true, url: inject("url") });

  const startDocsPreviewResponse =
    await fdr.docs.v2.write.startDocsPreviewRegister({
      orgId: FdrAPI.OrgId(
        "extremely-long-organization-name-that-is-way-too-long-and-will-cause-an-error-because-it-exceeds-the-character-limit-by-a-lot"
      ),
      filepaths: [
        DocsV1Write.FilePath("logo.png"),
        DocsV1Write.FilePath("guides/guide.mdx"),
      ],
    });

  // this should not work beceause org id is too long
  expect(startDocsPreviewResponse.ok).toBe(false);
});
