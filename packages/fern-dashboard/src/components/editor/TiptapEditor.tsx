"use client";

import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import { EditorProvider, EditorProviderProps } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import BubbleMenu from "./BubbleMenu";
import FloatingMenu from "./FloatingMenu";
import Fallback from "./extension-fallback";

// Configure Tiptap extensions
const extensions = [StarterKit, Link, Underline, Fallback];
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
          class: "prose prose-md m-5 focus:outline-none max-w-none",
        },
      }}
      editorContainerProps={{ className }}
      immediatelyRender={false}
      onUpdate={onUpdate}
    >
      {!disableFloatingMenu && <FloatingMenu />}
      {!disableBubbleMenu && <BubbleMenu />}
    </EditorProvider>
  );
}
