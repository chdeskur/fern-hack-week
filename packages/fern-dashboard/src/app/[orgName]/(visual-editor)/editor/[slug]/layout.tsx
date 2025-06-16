import { createEditableDocsLoader } from "@fern-api/docs-loader";
import { FernThemeProvider } from "@fern-docs/components";
import { AbstractHeaderTabsRoot } from "@fern-docs/components/abstract/AbstractHeaderTabsRoot";
import { NavbarLinks } from "@fern-docs/components/header/NavbarLinks";
import AbstractDefaultDocs from "@fern-docs/components/theming/AbstractDefaultDocs";
import { GlobalStyles } from "@fern-docs/components/theming/global-styles";

import { getCurrentSession } from "@/app/services/auth0/getCurrentSession";
import { Auth0OrgName } from "@/app/services/auth0/types";
import { PreviewHeader } from "@/components/docs-preview/PreviewHeader";

import "./index.css";

export default async function AuthedLayout({
  params,
  children,
  headertabs,
  versionSelect,
  productSelect,
  sidebar,
  logo,
}: Readonly<{
  params: Promise<{ orgName: Auth0OrgName }>;
  children: React.JSX.Element;
  headertabs: React.ReactNode;
  versionSelect: React.ReactNode;
  productSelect: React.ReactNode;
  sidebar: React.ReactNode;
  logo: React.ReactNode;
}>) {
  const { orgName } = await params;

  const session = await getCurrentSession();
  const loader = await createEditableDocsLoader(
    "localhost:3000",
    orgName,
    session?.accessToken
  );
  const [colors, layout, fonts, config, root] = await Promise.all([
    loader.getColors(),
    loader.getLayout(),
    loader.getFonts(),
    loader.getConfig(),
    loader.getRoot(),
  ]);
  // const announcementText = config.announcement?.text;

  const hasProductsOrVersions =
    root.child.type === "productgroup" || root.child.type === "versioned";

  const showSearchBar = layout.searchbarPlacement === "HEADER";

  return (
    <FernThemeProvider
      hasLight={Boolean(colors.light)}
      hasDark={Boolean(colors.dark)}
      lightThemeColor={colors.light?.themeColor}
      darkThemeColor={colors.dark?.themeColor}
    >
      <GlobalStyles
        domain={"fern.docs.buildwithfern.com"}
        layout={layout}
        fonts={fonts}
        light={colors.light}
        dark={colors.dark}
        inlineCss={config.css?.inline}
      />
      <div className="border-1 border-border m-2 flex flex-col overflow-hidden rounded-2xl shadow-sm">
        <AbstractDefaultDocs
          header={
            <PreviewHeader
              navbarLinks={<NavbarLinks loader={loader} />}
              headertabs={headertabs}
              versionSelect={versionSelect}
              productSelect={productSelect}
              logo={logo}
              showSearchBar={showSearchBar}
            />
          }
          lightSidebarClassName={
            colors.light?.sidebarBackgroundTheme === "dark" ? "dark" : undefined
          }
          darkSidebarClassName={
            colors.dark?.sidebarBackgroundTheme === "light"
              ? "light"
              : undefined
          }
          lightHeaderClassName={
            colors.light?.headerBackgroundTheme === "dark" ? "dark" : undefined
          }
          darkHeaderClassName={
            colors.dark?.headerBackgroundTheme === "light" ? "light" : undefined
          }
          isHeaderDisabled={layout.isHeaderDisabled}
          versionSelect={versionSelect}
          productSelect={productSelect}
          sidebar={sidebar}
          headerTabs={
            <AbstractHeaderTabsRoot showSearchBar={showSearchBar}>
              {headertabs}
            </AbstractHeaderTabsRoot>
          }
          hasProductsOrVersions={hasProductsOrVersions}
          // announcement={<div>Announcement</div>}
        >
          {children}
        </AbstractDefaultDocs>
      </div>
    </FernThemeProvider>
  );
}
