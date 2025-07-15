"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowRight, MessageSquare } from "lucide-react";

import { FernFai } from "@fern-api/fai-sdk";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

interface ConversationsDataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function ConversationsDataTable<TData, TValue>({
  columns,
  data,
}: ConversationsDataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="rounded-md border p-4">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            <span className="text-lg font-semibold">Conversations</span>
          </div>
          <div>
            <Input
              placeholder="Search..."
              value={
                (table
                  .getColumn("firstUserMessage")
                  ?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table
                  .getColumn("firstUserMessage")
                  ?.setFilterValue(event.target.value)
              }
              className="h-9 max-w-sm rounded-full"
              autoFocus
            />
          </div>
        </div>
        <div>
          <Button variant="outline">Last week</Button>
        </div>
      </div>
      <div className="">
        <Table className="table-fixed">
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="cursor-pointer border-none"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={
                        cell.column.id === "created_at"
                          ? "w-32"
                          : cell.column.id === "actions"
                            ? "w-16"
                            : undefined
                      }
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export const columns: ColumnDef<FernFai.Conversation>[] = [
  {
    id: "firstUserMessage",
    accessorFn: (conversation) => {
      const firstUserTurn = conversation.turns.find(
        (turn) => turn.role.toUpperCase() === "USER"
      );
      return firstUserTurn?.text ?? "";
    },
    header: "Conversations",
    cell: ({ row }) => {
      const text = row.getValue("firstUserMessage") as string;
      return (
        <div className="truncate" title={text}>
          {text}
        </div>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: "",
    cell: ({ row }) => {
      const date = new Date(row.getValue("created_at") as string);
      return (
        <div className="font-medium">
          {date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </div>
      );
    },
  },
  {
    header: () => {
      return <div></div>;
    },
    id: "actions",
    cell: () => {
      return (
        <div className="text-gray-1100 flex flex-row items-center">
          View
          <ArrowRight className="ml-1 h-3 w-3" />
        </div>
      );
    },
  },
];
