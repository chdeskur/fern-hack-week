import { useMemo } from "react";

import { useMDXComponents } from "@mdx-js/react";
import { NodeViewProps, NodeViewWrapper } from "@tiptap/react";
import { getMDXComponent } from "mdx-bundler/client";

import { ErrorBoundary } from "@/docs/components/error-boundary";
import { useOriginalElements } from "@/providers/OriginalElementsContext";

import { UnsupportedContent } from "../UnsupportedContent";

export const CustomElementNodeView = (props: NodeViewProps) => {
  const { attrs, textContent } = props.node;
  const hash = attrs["data-hash"];

  const { originalElements } = useOriginalElements();
  const originalElement = useMemo(
    () => originalElements[hash],
    [originalElements, hash]
  );

  const components = useMDXComponents();

  const Component = useMemo(() => {
    const Component = originalElement?.code
      ? getMDXComponent(originalElement?.code)
      : () => null;
    return Component;
  }, [originalElement?.code]);

  /**
   * Tiptap attempts to "best effort" render all basic HTML elements. This logic
   * is used to remove that behavior for unsupported elements, rather than let tiptap
   * try and fail.
   */
  const isUnsupportedHtml = useMemo(() => {
    if (!originalElement?.code) return false;
    return (
      originalElement.code.includes("<video") ||
      originalElement.code.includes("<iframe") ||
      originalElement.code.includes("video") ||
      originalElement.code.includes("iframe") ||
      originalElement.code.includes("<canvas") ||
      originalElement.code.includes("<embed") ||
      originalElement.code.includes("embed") ||
      originalElement.code.includes("ElevenLabsWaveform")
    );
  }, [originalElement?.code]);

  if (isUnsupportedHtml) {
    return (
      <NodeViewWrapper>
        <UnsupportedContent>{textContent}</UnsupportedContent>
      </NodeViewWrapper>
    );
  }

  return (
    <ErrorBoundary
      fallback={
        <NodeViewWrapper>
          <UnsupportedContent>{textContent}</UnsupportedContent>
        </NodeViewWrapper>
      }
    >
      <NodeViewWrapper>
        <Component components={components} />
      </NodeViewWrapper>
    </ErrorBoundary>
  );
};
