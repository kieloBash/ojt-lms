"use client";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { pageLimit } from "@/utils/constants/data/pagelimit";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  total: number;
}

export function DataTablePagination<TData>({
  table,
  total,
}: DataTablePaginationProps<TData>) {
  const params = useSearchParams();
  const page = params.get("page") ? params.get("page") : 1;
  // console.log({ page, total });
  return (
    <div className="flex items-center justify-between px-2">
      <div className="flex-1 text-sm text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {page} of {Math.floor(total / pageLimit) + 1}
        </div>
        <div className="flex items-center space-x-2">
          <Link
            href={{
              pathname: "/materials",
              query: { page: Math.max(Number(page) - 1, 1) },
            }}
          >
            <Button
              variant="outline"
              className="w-8 h-8 p-0"
              onClick={() => table.previousPage()}
              disabled={Number(page) === 1}
            >
              <span className="sr-only">Go to previous page</span>
              <ChevronLeftIcon className="w-4 h-4" />
            </Button>
          </Link>
          <Link
            href={{ pathname: "/materials", query: { page: Number(page) + 1 } }}
          >
            <Button
              variant="outline"
              className="w-8 h-8 p-0"
              onClick={() => table.nextPage()}
              disabled={Number(page) === Math.floor(total / pageLimit) + 1}
            >
              <span className="sr-only">Go to next page</span>
              <ChevronRightIcon className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
