"use client";

import { FernLinkButton } from "@/components/FernLinkButton";
import { useBasePath } from "@/state/navigation";

export default function ReturnHomeButton() {
  const basePath = useBasePath();
  return <FernLinkButton href={basePath} text="Return home" intent="primary" />;
}
