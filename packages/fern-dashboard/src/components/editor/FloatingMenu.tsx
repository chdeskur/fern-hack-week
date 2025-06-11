import { MouseEventHandler } from "react";

import { useCurrentEditor } from "@tiptap/react";
import { FloatingMenu as EditorFloatingMenu } from "@tiptap/react/menus";

import { Icon } from "@/components/icon/Icon";

type FloatingMenuAction =
  | "toggleHeading1"
  | "toggleHeading2"
  | "toggleHeading3"
  | "toggleBulletList"
  | "toggleOrderedList"
  | "toggleQuote"
  | "setLink";

export default function FloatingMenu() {
  const { editor } = useCurrentEditor();

  function menuItemClickHandler(action: FloatingMenuAction) {
    return () => {
      if (!editor) return;

      switch (action) {
        case "toggleHeading1":
          editor.chain().focus().toggleHeading({ level: 1 }).run();
          break;
        case "toggleHeading2":
          editor.chain().focus().toggleHeading({ level: 2 }).run();
          break;
        case "toggleHeading3":
          editor.chain().focus().toggleHeading({ level: 3 }).run();
          break;
        case "toggleBulletList":
          editor.chain().focus().toggleBulletList().run();
          break;
        case "toggleOrderedList":
          editor.chain().focus().toggleOrderedList().run();
          break;
        case "toggleQuote":
          editor.chain().focus().toggleBlockquote().run();
          break;
        case "setLink":
          // TODO: This should open an additional popover to edit the link
          editor
            .chain()
            .focus()
            .setLink({ href: "https://www.google.com" })
            .run();
          break;
      }
    };
  }

  return (
    <EditorFloatingMenu
      editor={null}
      options={{ placement: "bottom-start" }}
      shouldShow={({ editor, state }) => {
        const { selection } = state;
        const { $from } = selection;

        // Check if we're at the start of an empty paragraph
        return (
          editor.isFocused &&
          selection.empty &&
          $from.parent.type.name === "paragraph" &&
          $from.parent.textContent === "" &&
          $from.parentOffset === 0
        );
      }}
    >
      <div className="border-1 text-gray-1100 flex min-w-60 flex-col border-gray-500 bg-white p-2 shadow-sm">
        <FloatingMenuHeading title="Basics" />
        <FloatingMenuItem title="Text" iconProps={{ variant: "Type" }} />
        <FloatingMenuItem
          title="Heading 1"
          iconProps={{ variant: "Heading1" }}
          onClick={menuItemClickHandler("toggleHeading1")}
        />
        <FloatingMenuItem
          title="Heading 2"
          iconProps={{ variant: "Heading2" }}
          onClick={menuItemClickHandler("toggleHeading2")}
        />
        <FloatingMenuItem
          title="Heading 3"
          iconProps={{ variant: "Heading3" }}
          onClick={menuItemClickHandler("toggleHeading3")}
        />
        <FloatingMenuItem
          title="Bulleted list"
          iconProps={{ variant: "List" }}
          onClick={menuItemClickHandler("toggleBulletList")}
        />
        <FloatingMenuItem
          title="Numbered list"
          iconProps={{ variant: "ListOrdered" }}
          onClick={menuItemClickHandler("toggleOrderedList")}
        />
        <FloatingMenuItem
          title="Quote"
          iconProps={{ variant: "MessageSquareQuote" }}
          onClick={menuItemClickHandler("toggleQuote")}
        />
        <FloatingMenuItem
          title="Link"
          iconProps={{ variant: "Link" }}
          onClick={menuItemClickHandler("setLink")}
        />
      </div>
    </EditorFloatingMenu>
  );
}

declare namespace FloatingMenuHeading {
  export interface Props {
    title: string;
  }
}

function FloatingMenuHeading({ title }: FloatingMenuHeading.Props) {
  return (
    <div className="px-2 pb-2 pt-1 text-sm font-bold uppercase text-gray-800">
      {title}
    </div>
  );
}

declare namespace FloatingMenuItem {
  export interface Props {
    title: string;
    iconProps: Icon.Props;
    onClick?: MouseEventHandler<HTMLButtonElement>;
  }
}

function FloatingMenuItem({
  title,
  iconProps,
  onClick,
}: FloatingMenuItem.Props) {
  const { size = 20, ...restIconProps } = iconProps;

  return (
    <button
      className="flex h-8 cursor-pointer items-center gap-2 px-2 hover:bg-gray-300"
      onClick={onClick}
    >
      <div className="flex size-4 items-center justify-center">
        <Icon size={size} {...restIconProps} />
      </div>
      <div className="text-md font-medium">{title}</div>
    </button>
  );
}
