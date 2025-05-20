"use client";

import { useState } from "react";

import { useSetAtom } from "jotai";
import { Check, ChevronDown, Copy } from "lucide-react";

import { FernButton, FernDropdown } from "@fern-docs/components";

import { capturePosthogEventInternal } from "@/components/analytics/posthog";
import { searchDialogOpenAtom, useIsAskAiEnabled } from "@/state/search";

import {
  CopyPageOption,
  OpenAISearchOption,
  ViewAsMarkdownOption,
} from "./PageActionsDropdownOptions";
import { askAiAtom } from "./search";

export function PageActionsDropdown({ markdown }: { markdown: string }) {
  const [showCopied, setShowCopied] = useState<boolean>(false);

  // this is used to open the search dialog, and then AI chat
  const setSearchDialogState = useSetAtom(searchDialogOpenAtom);
  const setAskAi = useSetAtom(askAiAtom);

  const copyOption = CopyPageOption();
  const viewAsMarkdownOption = ViewAsMarkdownOption();
  const openAISearchOption = OpenAISearchOption();

  let options: FernDropdown.Option[] = [copyOption];
  if (useIsAskAiEnabled()) {
    options.push({ type: "separator" } as FernDropdown.SeparatorOption);
    options.push(openAISearchOption);
  }
  options = options.concat([
    { type: "separator" } as FernDropdown.SeparatorOption,
    viewAsMarkdownOption,
  ]);

  const handleValueChange = async (value: string) => {
    if (value === "copy-page") {
      if (markdown) {
        await navigator.clipboard.writeText(markdown).then(() => {
          capturePosthogEventInternal("page_actions_dropdown", {
            type: "copy-option",
            page_location: window.location.pathname,
          });

          setShowCopied(true);

          setTimeout(() => {
            setShowCopied(false);
          }, 2000);
        });
      }
    } else if (value === "open-ai-search") {
      setSearchDialogState(true);
      setAskAi(true);
      capturePosthogEventInternal("page_actions_dropdown", {
        type: "ai-search",
        page_location: window.location.pathname,
      });
    } else if (value === "view-as-markdown") {
      capturePosthogEventInternal("page_actions_dropdown", {
        type: "markdown",
        page_location: window.location.pathname,
      });
    }
  };

  return (
    <div className="fern-page-actions">
      <FernButton
        variant="minimal"
        className="w-fit rounded-r-none px-2"
        onClick={() => {
          capturePosthogEventInternal("page_actions_dropdown", {
            type: "copy-button",
            page_location: window.location.pathname,
          });
          void handleValueChange("copy-page");
        }}
      >
        {showCopied ? (
          <div className="flex items-center gap-2">
            <Check className="size-icon" />
            <span>Copied!</span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Copy className="size-icon" />
            <span>Copy page</span>
          </div>
        )}
      </FernButton>
      <FernDropdown
        options={options}
        onValueChange={(value) => void handleValueChange(value)}
        dropdownMenuElement={<a target="_blank" rel="noopener noreferrer" />}
      >
        <FernButton
          variant="minimal"
          className="rounded-l-none px-2"
          onClick={() => {
            capturePosthogEventInternal("page_actions_dropdown", {
              type: "open",
              page_location: window.location.pathname,
            });
          }}
        >
          <ChevronDown className="size-icon" />
        </FernButton>
      </FernDropdown>
    </div>
  );
}
