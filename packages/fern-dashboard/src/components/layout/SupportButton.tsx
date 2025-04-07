"use client";

import { getPylon } from "../pylon/getPylon";
import { Button } from "../ui/button";

export function SupportButton() {
  return (
    <Button
      size="sm"
      variant="outline"
      onClick={() => {
        getPylon()?.("show");
        getPylon()?.("showChatBubble");
      }}
    >
      Support
    </Button>
  );
}
