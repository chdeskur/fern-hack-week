import { useMemo } from "react";

import { useMDXComponents } from "@mdx-js/react";
import { NodeViewProps, NodeViewWrapper } from "@tiptap/react";
import { getMDXComponent } from "mdx-bundler/client";

import { ErrorBoundary } from "@/docs/components/error-boundary";
import { MDX_COMPONENTS } from "@/docs/mdx/components";
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
    // Check that there is code to render AND that the component is supported, otherwise render an unsupported content component
    const Component =
      originalElement?.code &&
      originalElement?.name &&
      typeof MDX_COMPONENTS[originalElement?.name] !== "undefined"
        ? getMDXComponent(originalElement?.code)
        : () => <UnsupportedContent>{textContent}</UnsupportedContent>;
    return Component;
  }, [originalElement?.code, originalElement?.name, textContent]);

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
