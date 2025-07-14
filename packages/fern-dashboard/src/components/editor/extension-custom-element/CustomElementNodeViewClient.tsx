"use client";

import {
  CustomElementNodeView,
  CustomElementNodeViewProps,
} from "./CustomElementNodeView";

/**
 * To render this directly, we need to wrap this in a use client component. For use in tiptap,
 * we can have this stay server-side. This is nothing but a wrapper with a "use client" tag.
 */
export const CustomElementNodeViewClient = ({
  node,
  children,
}: CustomElementNodeViewProps) => {
  return <CustomElementNodeView node={node}>{children}</CustomElementNodeView>;
};
