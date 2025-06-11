"use client";

import { useState } from "react";

import { savePageVersion } from "./savePageVersion";

export declare namespace PageTitle {
  export interface Props {
    className?: string;
    initialText: string;
    orgName: string;
    slug: string;
  }
}

export default function PageTitle({
  className,
  initialText,
  orgName,
  slug,
}: PageTitle.Props) {
  const [text, setText] = useState(initialText);

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const nextText = e.target.value;
    setText(nextText);
    void savePageVersion({ orgName, slug, title: nextText });
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
