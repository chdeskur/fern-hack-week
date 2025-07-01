"use client";

import React, { useEffect, useState } from "react";
import { flushSync } from "react-dom";
import * as ReactDOM from "react-dom/client";

import { MDXProvider, useMDXComponents } from "@mdx-js/react";
import { EditorEvents } from "@tiptap/react";
import { getMDXComponent } from "mdx-bundler/dist/client";

import { SerializeMdxResponse } from "@fern-api/docs-mdx/bundler/serialize";

import TiptapEditor from "@/components/editor/TiptapEditor";
import { useMdxState } from "@/providers/MdxStateContext";

import { htmlToMdx } from "./htmlToMdx";
import { savePageVersion } from "./savePageVersion";

export declare namespace PageEditor {
  export interface Props {
    className?: string;
    serializedMdx: SerializeMdxResponse;
    orgName: string;
    slug: string;
    editThisPageUrl?: string;
    fileName: string;
  }
}

// SEE: https://tiptap.dev/docs/editor/getting-started/install/react
export default function PageEditor({
  className,
  serializedMdx,
  orgName,
  slug,
  fileName,
}: PageEditor.Props) {
  const { code, jsxElements } = serializedMdx;
  const [initialHtml, setInitialHtml] = useState<string | null>(null);

  const { setMdxState } = useMdxState();

  useEffect(() => {
    try {
      void getInitialHtml(code, jsxElements).then(setInitialHtml);
    } catch (error) {
      console.error("Error rendering MDX to HTML:", error);
      setInitialHtml(null);
    }
  }, [code, jsxElements]);

  function onTiptapEditorUpdate(props: EditorEvents["update"]) {
    const html = props.editor.getHTML();
    const mdx = htmlToMdx(html);
    void savePageVersion({ orgName, slug, mdx });
    setMdxState(fileName, mdx);
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

function createMdxComponents(jsxElements: string[]): Record<string, any> {
  const components: Record<string, any> = {};

  for (const jsxElement of jsxElements) {
    // Create a fallback component for each unsupported JSX element
    // Our custom Tiptap extension recognizes <fallback /> and renders a placeholder
    components[jsxElement] = function FallbackComponent() {
      const tag = "fallback";
      // TODO: Resolve "The tag <fallback> is unrecognized in this browser"
      return React.createElement(tag);
    };
  }

  return components;
}

function getInitialHtml(code: string, jsxElements: string[]): Promise<string> {
  const Component = getMDXComponent(code, {
    MdxJsReact: { useMDXComponents },
  });

  // HACK: I don't love this approach using ReactDOM to render a temporary DOM element
  // TODO: find a better way to generate the initial HTML without using ReactDOM
  return new Promise((resolve) => {
    // Create a temporary DOM element to render
    const tempEl = document.createElement("div");
    // Ensure that the temporary DOM element doesn't visibly render and create layout shifts
    Object.assign(tempEl.style, {
      position: "absolute",
      top: "-9999px",
      left: "-9999px",
      opacity: "0",
    });
    document.body.appendChild(tempEl);

    // Set up a container to render to and properly extract HTML from
    tempEl.innerHTML = '<div id="mdx-container"></div>';
    const container = tempEl.querySelector("#mdx-container");

    if (container) {
      const root = ReactDOM.createRoot(container);
      // Render on the next tick
      setTimeout(() => {
        // HACK: Force React to render synchronously, I really don't love using flushSync here
        flushSync(() => {
          root.render(
            <MDXProvider components={createMdxComponents(jsxElements)}>
              <Component />
            </MDXProvider>
          );
        });

        const html = container.innerHTML;

        // Clean up
        root.unmount();
        document.body.removeChild(tempEl);
        resolve(html);
      }, 0);
    } else {
      document.body.removeChild(tempEl);
      resolve("");
    }
  });
}
