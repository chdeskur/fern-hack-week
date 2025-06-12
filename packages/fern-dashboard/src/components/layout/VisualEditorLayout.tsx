import { ReactNode } from "react";

import { AbstractHeaderContent } from "@fern-docs/components/abstract/AbstractHeaderContent";

export declare namespace VisualEditorLayout {
  export interface Props {
    children: React.JSX.Element;
    headertabs?: React.ReactNode;
    versionSelect?: React.ReactNode;
    productSelect?: React.ReactNode;
    sidebar?: React.ReactNode;
    logo?: React.ReactNode;
  }
}

export async function VisualEditorLayout({
  headertabs,
  versionSelect,
  productSelect,
  sidebar,
  logo,
  children,
}: VisualEditorLayout.Props) {
  return (
    <div className="flex h-full w-full flex-col bg-gray-100">
      <Header />
      <Preview
        headertabs={headertabs}
        versionSelect={versionSelect}
        productSelect={productSelect}
        sidebar={sidebar}
        logo={logo}
      >
        {children}
      </Preview>
    </div>
  );
}

function Header() {
  return (
    <div className="flex h-12 items-center justify-center border-b border-gray-500 bg-white px-2 shadow-sm">
      <div className="flex-1 text-left">Back | Title</div>
      <div className="flex-1 text-center">ProfPic | Undo | Redo | Settings</div>
      <div className="flex-1 text-right">
        Icons | Preview | Files | Commit | Publish
      </div>
    </div>
  );
}

function Preview({
  headertabs,
  versionSelect,
  productSelect,
  // sidebar,
  logo,
  children,
}: {
  children: ReactNode;
  headertabs?: React.ReactNode;
  versionSelect?: React.ReactNode;
  productSelect?: React.ReactNode;
  sidebar?: React.ReactNode;
  logo?: React.ReactNode;
}) {
  return (
    <div className="border-1 m-2 flex flex-1 flex-col rounded-2xl border-gray-500 bg-white shadow-sm">
      <div className="flex w-full flex-col">
        <PreviewHeader
          headertabs={headertabs}
          versionSelect={versionSelect}
          productSelect={productSelect}
          logo={logo}
        />
        <PreviewSubHeader />
      </div>
      <div className="flex flex-1">
        <PreviewSidebar />
        <div className="flex flex-1 justify-center">{children}</div>
      </div>
    </div>
  );
}

function PreviewHeader({
  // headertabs,
  versionSelect,
  productSelect,
  logo,
}: {
  headertabs?: React.ReactNode;
  versionSelect?: React.ReactNode;
  productSelect?: React.ReactNode;
  logo?: React.ReactNode;
}) {
  return (
    <div className="fern-header-content">
      <AbstractHeaderContent
        className="max-w-page-width mx-auto"
        logo={logo}
        versionSelect={versionSelect}
        productSelect={productSelect}
        navbarLinks={<div>Links</div>}
        mobileMenuButton={<div>Menu</div>}
        themeSwitch={<div>Theme</div>}
      />
    </div>
  );
}

function PreviewSubHeader() {
  return (
    <div className="flex h-12 items-center border-b border-gray-500 bg-white px-2">
      <div>Tabs</div>
      <div>...</div>
    </div>
  );
}

function PreviewSidebar() {
  return (
    <div className="w-64 border-r border-gray-500">
      <div>Sidebar</div>
      <div>...</div>
    </div>
  );
}
