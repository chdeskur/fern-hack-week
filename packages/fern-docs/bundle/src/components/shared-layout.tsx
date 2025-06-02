import "server-only";

import React from "react";

import { Announcement } from "@/components/header/Announcement";
import { HeaderContent } from "@/components/header/HeaderContent";
import { NavbarLinks } from "@/components/header/NavbarLinks";
import { SidebarContainer } from "@/components/sidebar/SidebarContainer";
import { ThemedDocs } from "@/components/themes/ThemedDocs";
import { setMdxSerializer } from "@/context/MdxSerializerContext";
import { MdxServerComponent } from "@/mdx/components/server-component";
import { DocsLoader } from "@/server/docs-loader";
import { isLocal } from "@/server/isLocal";
import { createCachedMdxSerializer } from "@/server/mdx-serializer";

import { LoginButton } from "./login-button";

export default async function SharedLayout({
  children,
  headertabs,
  sidebar,
  versionSelect,
  productSelect,
  loader,
  logo,
}: {
  children: React.ReactNode;
  headertabs: React.ReactNode;
  sidebar?: React.ReactNode;
  versionSelect: React.ReactNode;
  productSelect: React.ReactNode;
  loader: DocsLoader;
  logo: React.ReactNode;
}) {
  const isLocalEnvironment = isLocal();
  const serialize = createCachedMdxSerializer(loader);
  setMdxSerializer(serialize);

  const [config, edgeFlags, colors, layout, root] = await Promise.all([
    loader.getConfig(),
    loader.getEdgeFlags(),
    loader.getColors(),
    loader.getLayout(),
    loader.getRoot(),
  ]);
  const theme = edgeFlags.isCohereTheme ? "cohere" : "default";
  const announcementText = config.announcement?.text;

  const hasProductsOrVersions =
    root.child.type === "productgroup" || root.child.type === "versioned";

  return (
    <ThemedDocs
      theme={theme}
      isSidebarFixed={
        !!colors.dark?.sidebarBackground ||
        !!colors.light?.sidebarBackground ||
        layout.isHeaderDisabled
      }
      lightSidebarClassName={
        colors.light?.sidebarBackgroundTheme === "dark" ? "dark" : undefined
      }
      darkSidebarClassName={
        colors.dark?.sidebarBackgroundTheme === "light" ? "light" : undefined
      }
      lightHeaderClassName={
        colors.light?.headerBackgroundTheme === "dark" ? "dark" : undefined
      }
      darkHeaderClassName={
        colors.dark?.headerBackgroundTheme === "light" ? "light" : undefined
      }
      isHeaderDisabled={layout.isHeaderDisabled}
      announcement={
        announcementText && (
          <Announcement announcement={announcementText}>
            <React.Suspense fallback={announcementText}>
              <MdxServerComponent
                serialize={serialize}
                mdx={announcementText}
              />
            </React.Suspense>
          </Announcement>
        )
      }
      header={
        <HeaderContent
          className="max-w-page-width mx-auto"
          logo={<React.Suspense fallback={null}>{logo}</React.Suspense>}
          versionSelect={
            <React.Suspense fallback={null} key="version-select-1">
              {versionSelect}
            </React.Suspense>
          }
          productSelect={
            <React.Suspense fallback={null} key="product-select-1">
              {productSelect}
            </React.Suspense>
          }
          showSearchBar={layout.searchbarPlacement === "HEADER"}
          navbarLinks={<NavbarLinks loader={loader} />}
          loginButton={
            <React.Suspense fallback={null}>
              <LoginButton
                loader={loader}
                size="sm"
                className="ml-2"
                disabled={isLocalEnvironment}
              />
            </React.Suspense>
          }
          forceHeader={edgeFlags.isCohereTheme}
        />
      }
      productSelect={
        <React.Suspense fallback={null} key="product-select-2">
          {productSelect}
        </React.Suspense>
      }
      tabs={headertabs}
      showSearchBarInTabs={layout.searchbarPlacement === "HEADER_TABS"}
      sidebar={
        <SidebarContainer
          logo={<React.Suspense fallback={null}>{logo}</React.Suspense>}
          showSearchBar={layout.searchbarPlacement === "SIDEBAR"}
          showHeaderInSidebar={layout.isHeaderDisabled}
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
              <LoginButton
                loader={loader}
                className="my-6 flex w-full justify-between lg:hidden"
                showIcon
              />
            </React.Suspense>
          }
        >
          {sidebar}
        </SidebarContainer>
      }
      hasProductsOrVersions={hasProductsOrVersions}
      versionSelect={
        <React.Suspense fallback={null} key="version-select-2">
          {versionSelect}
        </React.Suspense>
      }
    >
      {children}
    </ThemedDocs>
  );
}
