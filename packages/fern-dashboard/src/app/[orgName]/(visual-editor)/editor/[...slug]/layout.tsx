import React from "react";

import { createEditableDocsLoader } from "@fern-api/docs-loader";
import { FernThemeProvider } from "@fern-docs/components";
import { AbstractHeaderTabsRoot } from "@fern-docs/components/abstract/AbstractHeaderTabsRoot";
import { FERN_SEARCH_BUTTON_ID } from "@fern-docs/components/constants";
import { NavbarLinks } from "@fern-docs/components/header/NavbarLinks";
import { SidebarContainer } from "@fern-docs/components/sidebar/SidebarContainer";
import { RootNodeProvider } from "@fern-docs/components/state/navigation";
import { getAllSidebarRootNodes } from "@fern-docs/components/state/navigation-server";
import { getSidebarRootNodeIdToChildToParentsMap } from "@fern-docs/components/state/navigation-server";
import AbstractDefaultDocs from "@fern-docs/components/theming/AbstractDefaultDocs";
import { GlobalStyles } from "@fern-docs/components/theming/global-styles";
import { DesktopSearchButton } from "@fern-docs/search-ui/components/desktop/desktop-search-button";

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
  const [colors, layout, fonts, config, root, unsafe_fullRoot] =
    await Promise.all([
      loader.getColors(),
      loader.getLayout(),
      loader.getFonts(),
      loader.getConfig(),
      loader.getRoot(),
      loader.unsafe_getFullRoot(),
    ]);
  // const announcementText = config.announcement?.text;

  const hasProductsOrVersions =
    root.child.type === "productgroup" || root.child.type === "versioned";

  const showHeaderInSidebar = layout.isHeaderDisabled;

  const showSearchBarInHeaderTabs = layout.searchbarPlacement === "HEADER_TABS";
  const sidebarRootNodes = getAllSidebarRootNodes(unsafe_fullRoot);
  const sidebarRootNodesToChildToParentsMap =
    getSidebarRootNodeIdToChildToParentsMap(sidebarRootNodes);

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
      <RootNodeProvider
        sidebarRootNodesToChildToParentsMap={
          sidebarRootNodesToChildToParentsMap
        }
      >
        <div className="border-1 border-border m-2 flex flex-col overflow-hidden rounded-2xl shadow-sm">
          <AbstractDefaultDocs
            header={
              <PreviewHeader
                navbarLinks={<NavbarLinks loader={loader} />}
                headertabs={headertabs}
                versionSelect={versionSelect}
                productSelect={productSelect}
                logo={logo}
                showSearchBar={layout.searchbarPlacement === "HEADER"}
              />
            }
            lightSidebarClassName={
              colors.light?.sidebarBackgroundTheme === "dark"
                ? "dark"
                : undefined
            }
            darkSidebarClassName={
              colors.dark?.sidebarBackgroundTheme === "light"
                ? "light"
                : undefined
            }
            lightHeaderClassName={
              colors.light?.headerBackgroundTheme === "dark"
                ? "dark"
                : undefined
            }
            darkHeaderClassName={
              colors.dark?.headerBackgroundTheme === "light"
                ? "light"
                : undefined
            }
            isHeaderDisabled={layout.isHeaderDisabled}
            versionSelect={versionSelect}
            productSelect={productSelect}
            sidebar={
              <SidebarContainer
                logo={<React.Suspense fallback={null}>{logo}</React.Suspense>}
                showSearchBar={layout.searchbarPlacement === "SIDEBAR"}
                showHeaderInSidebar={showHeaderInSidebar}
                productSelect={
                  <React.Suspense fallback={null} key="product-select-3">
                    {productSelect}
                  </React.Suspense>
                }
                versionSelect={
                  <React.Suspense fallback={null} key="version-select-3">
                    {versionSelect}
                  </React.Suspense>
                }
                navbarLinks={
                  <React.Suspense fallback={null}>
                    <NavbarLinks loader={loader} />
                  </React.Suspense>
                }
                loginButton={
                  <React.Suspense fallback={null}>
                    {/* <LoginButton
                    loader={loader}
                    className="my-6 flex w-full justify-between lg:hidden"
                    showIcon
                  /> */}
                  </React.Suspense>
                }
                searchBar={<DesktopSearchButton />}
              >
                {sidebar}
              </SidebarContainer>
            }
            headerTabs={
              <AbstractHeaderTabsRoot
                searchBar={
                  showSearchBarInHeaderTabs && (
                    <DesktopSearchButton
                      id={FERN_SEARCH_BUTTON_ID}
                      className="fern-header-search-bar cursor-not-allowed overflow-hidden"
                    />
                  )
                }
              >
                {headertabs}
              </AbstractHeaderTabsRoot>
            }
            hasProductsOrVersions={hasProductsOrVersions}
            // announcement={<div>Announcement</div>}
          >
            {children}
          </AbstractDefaultDocs>
        </div>
      </RootNodeProvider>
    </FernThemeProvider>
  );
}
