import { ReactNode } from "react";

export declare namespace VisualEditorLayout {
  export interface Props {
    children: React.JSX.Element;
  }
}

export async function VisualEditorLayout({
  children,
}: VisualEditorLayout.Props) {
  return (
    <div className="flex h-full w-full flex-col bg-gray-100">
      <Header />
      <Preview>{children}</Preview>
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

function Preview({ children }: { children: ReactNode }) {
  return (
    <div className="border-1 m-2 flex flex-1 flex-col border-gray-500 bg-white shadow-sm">
      <div className="flex flex-col">
        <PreviewHeader />
        <PreviewSubHeader />
      </div>
      <div className="flex flex-1">
        <PreviewSidebar />
        <div className="flex flex-1 justify-center">{children}</div>
      </div>
    </div>
  );
}

function PreviewHeader() {
  return (
    <div className="flex h-12 items-center justify-center border-b border-gray-500 bg-white px-2">
      <div className="flex-1 text-left">Logo</div>
      <div className="flex-1 text-center">Search</div>
      <div className="flex-1 text-right">...</div>
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
