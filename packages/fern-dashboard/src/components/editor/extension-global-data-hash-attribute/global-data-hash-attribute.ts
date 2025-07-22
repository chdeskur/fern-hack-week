import { Node } from "@tiptap/core";

export const GlobalDataHashAttribute = Node.create({
  addGlobalAttributes: () => [
    {
      // These are the types that I expect to be present in the editor
      // Note: the "text" type is not included here, since it cannot have attributes
      // TODO: is there a way to get list directly from Tiptap and the extensions?
      types: [
        "doc",
        "paragraph",
        "heading",
        "blockquote",
        "codeBlock",
        "hardBreak",
        "horizontalRule",
        "bulletList",
        "orderedList",
        "listItem",
      ],
      attributes: {
        "data-hash": {
          default: null,
          // Prevent this attribute from being inherited by new blocks when splitting
          keepOnSplit: false,
          parseHTML: (element) => element.getAttribute("data-hash") || null,
          renderHTML: (attributes) => {
            // Sometimes Tiptap will output extraneous elements that inherit other elements' attributes
            // Check data-type to ensure data-hash is only kept for elements that were created by mdxToHtml
            if (
              attributes["data-hash"] != null &&
              attributes["data-type"] != null
            ) {
              return { "data-hash": attributes["data-hash"] };
            }
            return {};
          },
        },
      },
    },
  ],
});
