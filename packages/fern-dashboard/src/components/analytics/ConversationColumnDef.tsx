"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowRight } from "lucide-react";

import { FernFai } from "@fern-api/fai-sdk";

export const columns: ColumnDef<FernFai.Query>[] = [
  {
    id: "query",
    accessorFn: (query) => query.text,
    header: "Query",
    cell: ({ row }) => {
      const text = row.getValue("query") as string;
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
          <ArrowRight className="ml-1 h-3 w-3" />
        </div>
      );
    },
  },
];
