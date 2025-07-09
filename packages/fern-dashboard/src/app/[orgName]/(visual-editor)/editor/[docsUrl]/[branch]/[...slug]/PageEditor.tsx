"use client";

import React from "react";

import { EditorEvents } from "@tiptap/react";

import TiptapEditor from "@/components/editor/TiptapEditor";
import { useMdxState } from "@/providers/MdxStateContext";

export declare namespace PageEditor {
  export interface Props {
    className?: string;
    filename: string;
    initialHtml?: string;
  }
}

// SEE: https://tiptap.dev/docs/editor/getting-started/install/react
export default function PageEditor({
  className,
  filename,
  initialHtml,
}: PageEditor.Props) {
  const { stageChanges } = useMdxState();

  function onTiptapEditorUpdate(props: EditorEvents["update"]) {
    const html = props.editor.getHTML();
    stageChanges(filename, { html });
  }

  // TODO: add a loading state, possibly as a Suspense boundary
  return (
    initialHtml != null && (
      <TiptapEditor
        className={className}
        content={initialHtml}
        onUpdate={onTiptapEditorUpdate}
      />
    )
  );
}
