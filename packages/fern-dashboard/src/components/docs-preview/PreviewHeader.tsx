"use client";

import { AbstractHeaderContent } from "@fern-docs/components/abstract/AbstractHeaderContent";
import { FERN_SEARCH_BUTTON_ID } from "@fern-docs/components/constants";
import { DesktopSearchButton } from "@fern-docs/search-ui/components/desktop/desktop-search-button";

export function PreviewHeader({
  versionSelect,
  productSelect,
  navbarLinks,
  logo,
  showSearchBar,
}: {
  headertabs?: React.ReactNode;
  versionSelect?: React.ReactNode;
  productSelect?: React.ReactNode;
  navbarLinks?: React.ReactNode;
  logo?: React.ReactNode;
  showSearchBar?: boolean;
}) {
  return (
    <AbstractHeaderContent
      className="max-w-page-width mx-auto"
      logo={logo}
      versionSelect={versionSelect}
      productSelect={productSelect}
      showSearchBar={showSearchBar}
      searchBar={
        <DesktopSearchButton
          id={FERN_SEARCH_BUTTON_ID}
          className="fern-header-search-bar cursor-not-allowed overflow-hidden"
        />
      }
      navbarLinks={navbarLinks}
    />
  );
}
