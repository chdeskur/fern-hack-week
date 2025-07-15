"use client";

import { useEffect } from "react";

import { MdxToHtmlResponse } from "@fern-docs/mdx";

import { useMdxState } from "@/providers/MdxStateContext";

import PageEditor from "./PageEditor";
import PageSubtitle from "./PageSubtitle";
import PageTitle from "./PageTitle";

export declare namespace PageContents {
  export interface Props {
    filename: string;
    initialHtml: MdxToHtmlResponse["html"];
    initialFrontmatter: MdxToHtmlResponse["frontmatter"];
    initialCustomElements: MdxToHtmlResponse["customElements"];
  }
}

export default function PageContents({
  filename,
  initialHtml,
  initialFrontmatter,
  initialCustomElements,
}: PageContents.Props) {
  const { title, subtitle } = initialFrontmatter ?? {};

  const { updateDependencies, changedMdxFiles, syncChanges } = useMdxState();

  // Set up initial mdx dependencies
  useEffect(() => {
    updateDependencies(filename, {
      html: initialHtml,
      frontmatter: initialFrontmatter,
      customElements: initialCustomElements,
    });
  }, [
    filename,
    initialHtml,
    initialFrontmatter,
    initialCustomElements,
    updateDependencies,
  ]);

  const changedMdxFile = changedMdxFiles[filename];

  // Watch for changes and sync to server
  useEffect(() => {
    syncChanges(filename);
  }, [changedMdxFile, filename, syncChanges]);

  return (
    <div className="max-w-content-width-wide mx-auto w-full">
      <PageTitle
        className="w-full"
        filename={filename}
        initialText={title ? String(title) : undefined}
      />
      <PageSubtitle
        className="w-full"
        filename={filename}
        initialText={subtitle ? String(subtitle) : undefined}
      />
      <PageEditor
        className="w-full"
        filename={filename}
        initialHtml={initialHtml}
      />
    </div>
  );
}
