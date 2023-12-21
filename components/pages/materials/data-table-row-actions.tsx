"use client";

import { Row } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import { materialsSchema } from "./data/schema";
import { GRADE_LEVELS } from "@/utils/constants/data/gradeLevels";
import Link from "next/link";
import { storage } from "@/lib/firebase";
import { deleteObject, ref } from "firebase/storage";
import {
  deleteMaterial,
  updateGradeLevels,
  updateStatus,
} from "@/lib/actions/materials.action";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const file = materialsSchema.parse(row.original);

  const queryClient = useQueryClient();

  const handleDeleteFile = async () => {
    try {
      const fileRef = ref(storage, `materials/${file.filename}`);
      await deleteObject(fileRef);
      await deleteMaterial({ id: file._id });
      queryClient.invalidateQueries({
        queryKey: [`materials`],
      });
    } catch (error: any) {
      console.error("Error deleting file:", error.message);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <MoreVertical className="w-4 h-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        <Link href={file.url} target="_blank" className="cursor-pointer">
          <DropdownMenuItem className="cursor-pointer">Open</DropdownMenuItem>
        </Link>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Status</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup
              value={file.available ? "Available" : "Unavailable"}
            >
              <DropdownMenuRadioItem
                value={"Available"}
                disabled={file.available}
                onClick={async () => {
                  await updateStatus({ id: file._id, status: file.available });
                  queryClient.invalidateQueries({
                    queryKey: [`materials`],
                  });
                }}
              >
                {"Available"}
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem
                value={"Unavailable"}
                disabled={!file.available}
                onClick={async () => {
                  await updateStatus({ id: file._id, status: file.available });
                  queryClient.invalidateQueries({
                    queryKey: [`materials`],
                  });
                }}
              >
                {"Unavailable"}
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Grade Level</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            {GRADE_LEVELS.map((lvl) => (
              <DropdownMenuCheckboxItem
                key={lvl.level}
                checked={file.gradeLevel?.includes(lvl.level)}
                onCheckedChange={async (checked) => {
                  let temp = file?.gradeLevel || [];
                  if (checked) {
                    temp.push(lvl.level);
                  } else {
                    temp = temp.filter((d) => d !== lvl.level);
                  }
                  const customOrder = ["N1", "N2", "K1", "K2"];
                  const sortedArray = temp.sort((a, b) => {
                    return customOrder.indexOf(a) - customOrder.indexOf(b);
                  });
                  await updateGradeLevels({
                    id: file._id,
                    gradeLevel: sortedArray,
                  });
                  queryClient.invalidateQueries({
                    queryKey: [`materials`],
                  });
                }}
              >
                {lvl.label}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuItem onClick={handleDeleteFile} className="cursor-pointer">
          Add To Attendance
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleDeleteFile} className="cursor-pointer">
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
