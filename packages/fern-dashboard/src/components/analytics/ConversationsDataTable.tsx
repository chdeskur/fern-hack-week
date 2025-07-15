"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowRight } from "lucide-react";

import { FernFai } from "@fern-api/fai-sdk";

import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

import { ConversationsDataTableHeader } from "./ConversationsDataTableHeader";

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
    <div className="rounded-md p-4">
      <ConversationsDataTableHeader table={table} />
      <div className="min-h-[400px]">
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
        <div
          className="truncate hover:text-clip hover:whitespace-normal"
          title={text}
        >
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
        <div>
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
        <div className="text-radix-gray-11 flex flex-row items-center">
          View
          <ArrowRight className="ml-1 h-3 w-3" />
        </div>
      );
    },
  },
];
