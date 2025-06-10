"use client";

import { DocumentTextIcon } from "@heroicons/react/24/outline";
import {
  BubbleMenu,
  EditorProvider,
  EditorProviderProps,
  FloatingMenu,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

// Configure Tiptap extensions
const extensions = [StarterKit];

export declare namespace TiptapEditor {
  export interface Props {
    className?: string;
    disableFloatingMenu?: boolean;
    disableBubbleMenu?: boolean;
    content?: EditorProviderProps["content"];
    onUpdate?: EditorProviderProps["onUpdate"];
  }
}

// SEE: https://tiptap.dev/docs/editor/getting-started/install/react
export default function TiptapEditor({
  className,
  disableFloatingMenu,
  disableBubbleMenu,
  content,
  onUpdate,
}: TiptapEditor.Props) {
  return (
    <EditorProvider
      extensions={extensions}
      content={content}
      editorProps={{
        attributes: {
          class: "prose prose-md m-5 focus:outline-none",
        },
      }}
      editorContainerProps={{ className }}
      immediatelyRender={false}
      onUpdate={onUpdate}
    >
      {!disableFloatingMenu && <EditorFloatingMenu />}
      {!disableBubbleMenu && <EditorBubbleMenu />}
    </EditorProvider>
  );
}

function EditorFloatingMenu() {
  return (
    <FloatingMenu editor={null} tippyOptions={{ placement: "auto-start" }}>
      <div className="border-1 flex min-w-60 flex-col border-gray-500 bg-white p-2 text-gray-900 shadow-sm">
        <FloatingMenuHeading title="Basics" />
        <FloatingMenuItem title="Text" icon={<DocumentTextIcon />} />
        <FloatingMenuItem title="Heading 1" icon={<DocumentTextIcon />} />
        <FloatingMenuItem title="Heading 2" icon={<DocumentTextIcon />} />
        <FloatingMenuItem title="Heading 3" icon={<DocumentTextIcon />} />
        <FloatingMenuItem title="Bulleted list" icon={<DocumentTextIcon />} />
        <FloatingMenuItem title="Numbered list" icon={<DocumentTextIcon />} />
        <FloatingMenuItem title="Quote" icon={<DocumentTextIcon />} />
        <FloatingMenuItem title="Link" icon={<DocumentTextIcon />} />
      </div>
    </FloatingMenu>
  );
}

declare namespace FloatingMenuHeading {
  export interface Props {
    title: string;
  }
}

function FloatingMenuHeading({ title }: FloatingMenuHeading.Props) {
  return <div className="p-1 text-sm font-medium uppercase">{title}</div>;
}

declare namespace FloatingMenuItem {
  export interface Props {
    title: string;
    icon: React.ReactNode;
  }
}

function FloatingMenuItem({ title, icon }: FloatingMenuItem.Props) {
  return (
    <button className="flex cursor-pointer items-center gap-2 p-1 hover:bg-gray-500">
      <div className="size-4">{icon}</div>
      <div className="text-md font-medium">{title}</div>
    </button>
  );
}

function EditorBubbleMenu() {
  return (
    <BubbleMenu editor={null}>
      <div className="border-1 flex items-center gap-1 border-gray-500 bg-white p-2 text-gray-900 shadow-sm">
        <BubbleMenuItem icon={<DocumentTextIcon />} />
        <BubbleMenuSeparator />
        <BubbleMenuItem icon={<DocumentTextIcon />} />
        <BubbleMenuItem icon={<DocumentTextIcon />} />
        <BubbleMenuItem icon={<DocumentTextIcon />} />
        <BubbleMenuItem icon={<DocumentTextIcon />} />
        <BubbleMenuItem icon={<DocumentTextIcon />} />
        <BubbleMenuItem icon={<DocumentTextIcon />} />
        <BubbleMenuSeparator />
        <BubbleMenuItem icon={<DocumentTextIcon />} />
        <BubbleMenuItem icon={<DocumentTextIcon />} />
      </div>
    </BubbleMenu>
  );
}

declare namespace BubbleMenuItem {
  export interface Props {
    icon: React.ReactNode;
  }
}

function BubbleMenuItem({ icon }: BubbleMenuItem.Props) {
  return (
    <button className="flex cursor-pointer items-center gap-2 p-1 hover:bg-gray-500">
      <div className="size-4">{icon}</div>
    </button>
  );
}

function BubbleMenuSeparator() {
  return <div>|</div>;
}
