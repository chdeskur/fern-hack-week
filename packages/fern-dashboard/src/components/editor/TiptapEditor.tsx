"use client";

import { EditorProvider, EditorProviderProps } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import BubbleMenu from "./BubbleMenu";
import FloatingMenu from "./FloatingMenu";
import CustomElement from "./extension-custom-element";

// Configure Tiptap extensions
const extensions = [StarterKit, CustomElement];
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
      parseOptions={{
        // Required to preserve formatting in custom element previews
        preserveWhitespace: "full",
      }}
      editorContainerProps={{ className }}
      // We need to set immediatelyRender to true so that the original formatting is preserved in the custom element previews
      // Tiptap will complain about this in dev mode, claiming that SSR has been detected
      // However, we are not rendering this component on the server (see "use client" above)
      // It seems this error is getting thrown due to the way that Tiptap is checking for SSR, as it considers all Next apps to be SSR
      // See isNext flag definition here: https://github.com/ueberdosis/tiptap/blob/1d4d9283d840e53ef5f129478841b0b933140335/packages/react/src/useEditor.ts#L11
      immediatelyRender={true}
      onUpdate={onUpdate}
    >
      {!disableFloatingMenu && <FloatingMenu />}
      {!disableBubbleMenu && <BubbleMenu />}
    </EditorProvider>
  );
}
