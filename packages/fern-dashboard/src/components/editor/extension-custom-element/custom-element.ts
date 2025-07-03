import { Node, mergeAttributes } from "@tiptap/core";
import { Plugin, PluginKey } from "@tiptap/pm/state";
import { ReplaceStep } from "@tiptap/pm/transform";

export interface CustomElementOptions {
  /**
   * The HTML attributes for a custom element node.
   * @default {}
   * @example { class: 'foo' }
   */
  HTMLAttributes: Record<string, any>;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    customElement: {
      /**
       * Set a custom element.
       * @example editor.commands.setCustomElement()
       */
      setCustomElement: () => ReturnType;
    };
  }
}

/**
 * This extension allows you to create custom elements.
 */
export const CustomElement = Node.create<CustomElementOptions>({
  name: "custom-element",

  priority: 1000,

  addOptions() {
    return {
      HTMLAttributes: {
        class:
          "border-l-1 min-h-13 relative mb-4 block w-full select-none overflow-hidden whitespace-pre rounded-r-xl border-red-500 bg-red-100 p-3 after:absolute after:right-2 after:top-2 after:flex after:h-9 after:items-center after:justify-center after:rounded-lg after:bg-white after:px-2 after:content-['Unsupported_content']",
      },
    };
  },

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
      contenteditable: {
        default: false,
      },
      "data-hash": {
        default: null,
      },
      "data-type": {
        default: null,
      },
      "data-name": {
        default: null,
      },
    };
  },

  parseHTML() {
    return [{ tag: "custom-element" }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "custom-element",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      0,
    ];
  },

  addCommands() {
    return {
      setCustomElement:
        () =>
        ({ commands }) => {
          return commands.setNode(this.name);
        },
    };
  },

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey("custom-element"),
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
              if (node.type.name === "custom-element") {
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
