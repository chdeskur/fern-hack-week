import { NodeViewProps, NodeViewWrapper } from "@tiptap/react";

export const CustomElementNodeView = (props: NodeViewProps) => {
  const { textContent } = props.node;

  return (
    <NodeViewWrapper className="border-l-1 min-h-13 relative mb-4 block w-full overflow-hidden !whitespace-pre-wrap rounded-r-xl border-red-500 bg-red-100 p-3 after:absolute after:right-2 after:top-2 after:flex after:h-9 after:items-center after:justify-center after:rounded-lg after:bg-white after:px-2 after:content-['Unsupported_content']">
      {textContent}
    </NodeViewWrapper>
  );
};
