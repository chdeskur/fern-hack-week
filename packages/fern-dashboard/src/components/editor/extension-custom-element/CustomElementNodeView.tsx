import { NodeViewProps, NodeViewWrapper } from "@tiptap/react";

export type CustomElementNodeViewProps = Partial<NodeViewProps> & {
  children?: React.ReactNode;
};
export const CustomElementNodeView = ({
  node,
  children,
}: CustomElementNodeViewProps) => {
  const { textContent } = node ?? {};

  return (
    <NodeViewWrapper className="border-l-1 min-h-13 relative mb-4 block w-full overflow-hidden !whitespace-pre-wrap rounded-r-xl border-gray-800 bg-gray-300/50 p-3 after:absolute after:right-2 after:top-2 after:flex after:h-9 after:items-center after:justify-center after:rounded-lg after:border after:border-red-500 after:bg-red-100 after:px-2 after:text-red-500 after:content-['Unsupported_content']">
      {children ?? textContent}
    </NodeViewWrapper>
  );
};
