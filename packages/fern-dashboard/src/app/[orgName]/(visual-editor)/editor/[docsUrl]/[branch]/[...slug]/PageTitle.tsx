"use client";

import { useState } from "react";

import { useMdxState } from "@/providers/MdxStateContext";

export declare namespace PageTitle {
  export interface Props {
    className?: string;
    filename: string;
    initialText?: string;
  }
}

export default function PageTitle({
  className,
  filename,
  initialText,
}: PageTitle.Props) {
  const [text, setText] = useState(initialText ?? "");

  const { stageChanges } = useMdxState();

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const nextText = e.target.value;
    setText(nextText);
    stageChanges(filename, { frontmatter: { title: nextText } });
  }

  return (
    <div className={["flex", className].join(" ")}>
      <input
        className="mx-5 flex-1 text-3xl font-bold focus:outline-none"
        name="title"
        onChange={onChange}
        placeholder="Add a title"
        value={text}
      />
    </div>
  );
}
