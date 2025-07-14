import { Node, mergeAttributes } from "@tiptap/core";
import { Plugin, PluginKey } from "@tiptap/pm/state";
import { ReplaceStep } from "@tiptap/pm/transform";
import { ReactNodeViewRenderer } from "@tiptap/react";

import { CustomElementNodeView } from "./CustomElementNodeView";

/**
 * The tag name for the custom element node. Also used as the node name and the plugin key.
 */
const TAG = "custom-element";

export interface CustomElementOptions {
  /**
   * The HTML attributes for a custom element node.
   * @default {}
   * @example { class: 'foo' }
   */
  HTMLAttributes: Record<string, any>;
}

/**
 * This extension allows you to create custom elements.
 */
export const CustomElement = Node.create<CustomElementOptions>({
  name: TAG,

  priority: 1000,

  group: "block",

  content: "text*",

  atom: true,

  draggable: false,

  selectable: false,

  /**
   * The data attributes are used to store the original content of the custom element.
   * @example <custom-element data-hash="..." data-type="..." data-name="..." />
   */
  addAttributes() {
    return {
      "data-hash": {
        default: null,
      },
      "data-type": {
        default: null,
      },
      "data-name": {
        default: null,
      },
      /**
       * Set contenteditable to false to prevent the custom element from being edited.
       */
      contenteditable: {
        default: false,
      },
    };
  },

  addNodeView() {
    return ReactNodeViewRenderer(CustomElementNodeView, {
      as: "custom-element",
      attrs: ({ node }) => ({
        ...node.attrs,
      }),
    });
  },

  parseHTML() {
    return [{ tag: TAG }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      TAG,
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      0,
    ];
  },

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey(TAG),
        /**
         * This plugin is used to prevent the custom element node from being replaced (deleted).
         * @see https://github.com/ueberdosis/tiptap/issues/181#issuecomment-1213455982
         */
        filterTransaction(transaction, state) {
          let result = true; // true for keep, false for stop transaction
          const replaceSteps: number[] = [];
          transaction.steps.forEach((step, index) => {
            if (step instanceof ReplaceStep) {
              replaceSteps.push(index);
            }
          });

          replaceSteps.forEach((index) => {
            const step = transaction.steps[index] as ReplaceStep;
            const oldStart = step.from;
            const oldEnd = step.to;
            state.doc.nodesBetween(oldStart, oldEnd, (node) => {
              if (node.type.name === TAG) {
                result = false;
              }
            });
          });
          return result;
        },
      }),
    ];
  },
});
