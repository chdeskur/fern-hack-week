"use client";

import React from "react";

import { Rss } from "lucide-react";

import { CopyToClipboardButton } from "@fern-docs/components/CopyToClipboardButton";
import { FernButton } from "@fern-docs/components/FernButton";

export function RSSFeedButton() {
  const getRssUrl = () => {
    const currentUrl = window.location.href;
    return `${currentUrl}.rss`;
  };

  return (
    <CopyToClipboardButton content={getRssUrl}>
      {(onClick) => (
        <FernButton
          variant="outlined"
          onClick={onClick}
          rounded
          className="fern-rss-feed-button"
          rightIcon={<Rss className="text-(color:--accent-a11) size-3.5" />}
        >
          Subscribe via <span className="text-(color:--accent-a11)">RSS</span>
        </FernButton>
      )}
    </CopyToClipboardButton>
  );
}
