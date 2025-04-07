"use client";

import { getPylon } from "../pylon/getPylon";
import { Button } from "../ui/button";

export declare namespace SupportButton {
  export interface Props {
    className?: string;
  }
}

export function SupportButton({ className }: SupportButton.Props) {
  return (
    <Button
      size="sm"
      variant="outline"
      onClick={() => {
        getPylon()?.("show");
        getPylon()?.("showChatBubble");
      }}
      className={className}
    >
      Support
    </Button>
  );
}
