"use client";

import { useState } from "react";

import { savePageVersion } from "./savePageVersion";

export declare namespace PageSubtitle {
  export interface Props {
    className?: string;
    initialText: string;
    orgName: string;
    slug: string;
  }
}

export default function PageSubtitle({
  className,
  initialText,
  orgName,
  slug,
}: PageSubtitle.Props) {
  const [text, setText] = useState(initialText);

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const nextText = e.target.value;
    setText(nextText);
    void savePageVersion({ orgName, slug, subtitle: nextText });
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
