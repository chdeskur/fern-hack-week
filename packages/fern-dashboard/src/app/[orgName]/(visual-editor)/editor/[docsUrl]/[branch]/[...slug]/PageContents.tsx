"use client";

import { useEffect } from "react";

import { MdxToHtmlResponse } from "@fern-docs/mdx";

import { useMdxState } from "@/providers/MdxStateContext";

import PageEditor from "./PageEditor";
import PageSubtitle from "./PageSubtitle";
import PageTitle from "./PageTitle";

export declare namespace PageContents {
  export interface Props {
    fileName: string;
    initialHtml: MdxToHtmlResponse["html"];
    frontmatter: MdxToHtmlResponse["frontmatter"];
    customElements: MdxToHtmlResponse["customElements"];
  }
}

export default function PageContents({
  fileName,
  initialHtml,
  frontmatter,
  customElements,
}: PageContents.Props) {
  const { title, subtitle } = frontmatter ?? {};

  const { updateDependencies } = useMdxState();

  useEffect(() => {
    // Set up initial mdx dependencies
    updateDependencies(fileName, {
      html: initialHtml,
      frontmatter: frontmatter,
      customElements: customElements,
    });
  }, [fileName, initialHtml, frontmatter, customElements, updateDependencies]);

  return (
    <>
      <PageTitle
        className="w-full max-w-2xl"
        fileName={fileName}
        initialText={String(title)}
      />
      <PageSubtitle
        className="w-full max-w-2xl"
        fileName={fileName}
        initialText={String(subtitle)}
      />
      <PageEditor
        className="w-full max-w-2xl"
        fileName={fileName}
        initialHtml={initialHtml}
      />
    </>
  );
}
