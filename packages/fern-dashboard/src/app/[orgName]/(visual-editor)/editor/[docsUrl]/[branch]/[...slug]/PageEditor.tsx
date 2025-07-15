"use client";

import React, { useRef } from "react";

import { EditorEvents } from "@tiptap/react";

import { getChangedNodesFromHtml } from "@fern-docs/mdx";

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

  const originalTiptapHtml = useRef(initialHtml);

  function onTiptapEditorCreate(props: EditorEvents["create"]) {
    const latestTiptapHtml = props.editor.getHTML();
    originalTiptapHtml.current = latestTiptapHtml;
  }

  function onTiptapEditorUpdate(props: EditorEvents["update"]) {
    const latestTiptapHtml = props.editor.getHTML();
    if (originalTiptapHtml.current) {
      const changedNodes = getChangedNodesFromHtml(
        originalTiptapHtml.current,
        latestTiptapHtml
      );
      stageChanges(filename, { html: latestTiptapHtml, changedNodes });
    }
  }

  // TODO: add a loading state, possibly as a Suspense boundary
  return (
    initialHtml != null && (
      <TiptapEditor
        className={className}
        content={initialHtml}
        onCreate={onTiptapEditorCreate}
        onUpdate={onTiptapEditorUpdate}
      />
    )
  );
}
