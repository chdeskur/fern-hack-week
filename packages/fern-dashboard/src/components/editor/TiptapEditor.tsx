"use client";

import { EditorProvider, EditorProviderProps } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import BubbleMenu from "./BubbleMenu";
import FloatingMenu from "./FloatingMenu";
import CustomElement from "./extension-custom-element";
import GlobalDataHashAttribute from "./extension-global-data-hash-attribute";

// Configure Tiptap extensions
const extensions = [StarterKit, CustomElement, GlobalDataHashAttribute];
export declare namespace TiptapEditor {
  export interface Props {
    className?: string;
    disableFloatingMenu?: boolean;
    disableBubbleMenu?: boolean;
    content?: EditorProviderProps["content"];
    onCreate?: EditorProviderProps["onCreate"];
    onUpdate?: EditorProviderProps["onUpdate"];
  }
}

// SEE: https://tiptap.dev/docs/editor/getting-started/install/react
export default function TiptapEditor({
  className,
  disableFloatingMenu,
  disableBubbleMenu,
  content,
  onCreate,
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
      parseOptions={{
        // Required to preserve formatting in custom element previews
        preserveWhitespace: true,
      }}
      editorContainerProps={{ className }}
      immediatelyRender={false}
      onCreate={onCreate}
      onUpdate={onUpdate}
    >
      {!disableFloatingMenu && <FloatingMenu />}
      {!disableBubbleMenu && <BubbleMenu />}
    </EditorProvider>
  );
}
