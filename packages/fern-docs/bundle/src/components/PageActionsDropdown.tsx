"use client";

import { useState } from "react";

import { useSetAtom } from "jotai";
import { Check, ChevronDown, Copy } from "lucide-react";

import { FernButton, FernDropdown } from "@fern-docs/components";

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
          setShowCopied(true);

          setTimeout(() => {
            setShowCopied(false);
          }, 2000);
        });
      }
    } else if (value === "open-ai-search") {
      setSearchDialogState(true);
      setAskAi(true);
    }
  };

  return (
    <div className="fern-page-actions">
      <FernButton
        variant="minimal"
        className="w-fit rounded-r-none px-2"
        onClick={() => void handleValueChange("copy-page")}
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
        <FernButton variant="minimal" className="rounded-l-none px-2">
          <ChevronDown className="size-icon" />
        </FernButton>
      </FernDropdown>
    </div>
  );
}
