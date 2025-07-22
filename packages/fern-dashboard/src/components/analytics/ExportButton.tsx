import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";

import { Button } from "@/components/ui/button";

interface ExportButtonProps {
  onClick: () => void;
  isLoading?: boolean;
  disabled?: boolean;
}

export function ExportButton({
  onClick,
  isLoading,
  disabled,
}: ExportButtonProps) {
  return (
    <Button
      size="sm"
      variant="outline"
      onClick={onClick}
      disabled={disabled || isLoading}
      className="flex items-center gap-2 text-black"
    >
      <ArrowDownTrayIcon className="h-4 w-4" />
      {isLoading ? "Exporting..." : "Export CSV"}
    </Button>
  );
}
