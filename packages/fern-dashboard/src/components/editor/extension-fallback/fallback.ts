import { Node, mergeAttributes } from "@tiptap/core";
import { Plugin, PluginKey } from "@tiptap/pm/state";
import { ReplaceStep } from "@tiptap/pm/transform";

export interface FallbackOptions {
  /**
   * The HTML attributes for a fallback node.
   * @default {}
   * @example { class: 'foo' }
   */
  HTMLAttributes: Record<string, any>;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    fallback: {
      /**
       * Set a fallback.
       * @example editor.commands.setFallback()
       */
      setFallback: () => ReturnType;
    };
  }
}

/**
 * This custom extension allows you to create fallbacks.
 */
export const Fallback = Node.create<FallbackOptions>({
  name: "fallback",

  priority: 1000,

  addOptions() {
    return {
      HTMLAttributes: { class: "h-32 w-full bg-gray-200" },
    };
  },

  group: "block",

  atom: true,

  draggable: false,

  selectable: false,

  addAttributes() {
    return {
      /**
       * This attribute is used to store the original content of the unsupported node.
       * @example <fallback data-content="<div class='custom' />">
       */
      "data-content": {
        default: null,
      },
    };
  },

  parseHTML() {
    return [{ tag: "fallback" }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
    ];
  },

  addCommands() {
    return {
      setFallback:
        () =>
        ({ commands }) => {
          return commands.setNode(this.name);
        },
    };
  },

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey("fallback"),
        /**
         * This plugin is used to prevent the fallback node from being replaced (deleted).
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
              if (node.type.name === "fallback") {
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
