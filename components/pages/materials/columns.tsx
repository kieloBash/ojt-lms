"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";

import { file_types } from "./data/data";
import { DataTableColumnHeader } from "./data-table-column-header";
import { MaterialType } from "./data/schema";
import { DataTableRowActions } from "./data-table-row-actions";
import dayjs from "dayjs";

export const columns: ColumnDef<MaterialType>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value: any) =>
          table.toggleAllPageRowsSelected(!!value)
        }
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value: any) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "filename",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => (
      <div className="w-full line-clamp-1">{row.getValue("filename")}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "gradeLevel",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Level" />
    ),
    cell: ({ row }) => {
      const levels = row.getValue("gradeLevel") as string[];
      return <div className="w-full line-clamp-1">{levels.join(", ")}</div>;
    },
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "available",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const available = row.getValue("available") as boolean;
      return (
        <div className="w-full line-clamp-1">
          {available ? "Available" : "Unavailable"}
        </div>
      );
    },
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type" />
    ),
    cell: ({ row }) => {
      const type = row.getValue("type") as string;
      const filetype = file_types.find((file) => file.label === type);
      if (!filetype) {
        return null;
      }

      return (
        <div className="flex w-[100px] items-center">
          {filetype.icon && (
            <filetype.icon className="w-4 h-4 mr-2 text-muted-foreground" />
          )}
          <span>{filetype.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last Modified" />
    ),
    cell: ({ row }) => (
      <div className="w-full line-clamp-1">
        {dayjs(row.getValue("createdAt")).format("MM/DD/YYYY")}
      </div>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
