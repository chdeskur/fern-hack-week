import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Table } from "@tanstack/react-table";
import { MessageSquare } from "lucide-react";

import { Input } from "@/components/ui/input";

interface QueriesDataTableHeaderProps<TData> {
  table: Table<TData>;
}

export function QueriesDataTableHeader<TData>({
  table,
}: QueriesDataTableHeaderProps<TData>) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <MessageSquare className="h-4 w-4" />
        <span>Conversations</span>
      </div>
      <div className="relative">
        <MagnifyingGlassIcon className="text-radix-gray-9 absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
        <Input
          placeholder="Search..."
          value={(table.getColumn("query")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("query")?.setFilterValue(event.target.value)
          }
          className="text-radix-gray-9 placeholder:text-radix-gray-9 h-9 max-w-sm rounded-full pl-9"
          autoFocus
        />
      </div>
    </div>
  );
}
