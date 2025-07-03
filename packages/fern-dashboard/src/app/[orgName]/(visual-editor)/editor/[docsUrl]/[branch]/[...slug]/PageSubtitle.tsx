"use client";

import { useState } from "react";

import { useMdxState } from "@/providers/MdxStateContext";

export declare namespace PageSubtitle {
  export interface Props {
    className?: string;
    fileName: string;
    initialText?: string;
  }
}

export default function PageSubtitle({
  className,
  fileName,
  initialText,
}: PageSubtitle.Props) {
  const [text, setText] = useState(initialText);

  const { stageChanges } = useMdxState();

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const nextText = e.target.value;
    setText(nextText);
    stageChanges(fileName, { frontmatter: { subtitle: nextText } });
  }

  return (
    <div className={["flex", className].join(" ")}>
      <input
        className="mx-5 flex-1 text-base focus:outline-none"
        name="subtitle"
        onChange={onChange}
        placeholder="Add a subtitle"
        value={text}
      />
    </div>
  );
}
