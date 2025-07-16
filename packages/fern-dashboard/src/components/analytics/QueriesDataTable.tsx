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

import { getConversation } from "@/app/actions/getConversation";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

import { QueriesDataTableHeader } from "./QueriesDataTableHeader";

interface QueriesDataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  baseDocsUrl: string;
  onSelectConversation: (conversation: FernFai.Conversation) => void;
  selectedConversation: FernFai.Conversation | null;
}

export function QueriesDataTable<TData, TValue>({
  columns,
  data,
  baseDocsUrl,
  onSelectConversation,
  selectedConversation,
}: QueriesDataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="flex flex-row gap-6 rounded-md p-4">
      <div className="grow">
        <QueriesDataTableHeader table={table} />
        <div className="max-h-[400px] min-h-[400px] overflow-y-auto">
          <Table className="table-fixed">
            <TableBody>
              {table?.getRowModel()?.rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={
                      selectedConversation?.conversation_id ===
                        (row.original as FernFai.Query).conversation_id &&
                      "selected"
                    }
                    className="data-[state=selected]:bg-accent cursor-pointer border-none"
                    onClick={async () => {
                      const conversation = await getConversation({
                        domain: baseDocsUrl,
                        conversationId: (row.original as FernFai.Query)
                          .conversation_id,
                      });
                      onSelectConversation(conversation);
                    }}
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
    </div>
  );
}

export const columns: ColumnDef<FernFai.Query>[] = [
  {
    id: "query",
    accessorFn: (query) => query.text,
    header: "Query",
    cell: ({ row }) => {
      const text = row.getValue("query") as string;
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
