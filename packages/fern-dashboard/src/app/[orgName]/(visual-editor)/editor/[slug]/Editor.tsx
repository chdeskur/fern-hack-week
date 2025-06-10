"use client";

import { EditorEvents } from "@tiptap/react";

import TiptapEditor from "@/components/editor/TiptapEditor";

import { htmlToMdx } from "./htmlToMdx";
import { savePageVersion } from "./savePageVersion";

export declare namespace Editor {
  export interface Props {
    initialHtml: string;
    orgName: string;
    slug: string;
  }
}

// SEE: https://tiptap.dev/docs/editor/getting-started/install/react
export default function Editor({ initialHtml, orgName, slug }: Editor.Props) {
  async function onTiptapEditorUpdate(props: EditorEvents["update"]) {
    const html = props.editor.getHTML();
    const mdx = htmlToMdx(html);
    await savePageVersion({ orgName, slug, mdx });
  }

  return <TiptapEditor content={initialHtml} onUpdate={onTiptapEditorUpdate} />;
}
