"use client";

import { EditorEvents } from "@tiptap/react";

import TiptapEditor from "@/components/editor/TiptapEditor";
import { useMdxState } from "@/providers/MdxStateContext";

import { htmlToMdx } from "./htmlToMdx";
import { savePageVersion } from "./savePageVersion";

export declare namespace PageEditor {
  export interface Props {
    className?: string;
    initialHtml: string;
    orgName: string;
    slug: string;
    editThisPageUrl?: string;
    fileName: string;
  }
}

// SEE: https://tiptap.dev/docs/editor/getting-started/install/react
export default function PageEditor({
  className,
  initialHtml,
  orgName,
  slug,
  fileName,
}: PageEditor.Props) {
  const { setMdxState } = useMdxState();

  function onTiptapEditorUpdate(props: EditorEvents["update"]) {
    const html = props.editor.getHTML();
    const mdx = htmlToMdx(html);
    void savePageVersion({ orgName, slug, mdx });
    setMdxState(fileName, mdx);
  }

  return (
    <TiptapEditor
      className={className}
      content={initialHtml}
      onUpdate={onTiptapEditorUpdate}
    />
  );
}
