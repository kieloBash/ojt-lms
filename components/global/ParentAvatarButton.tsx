"use client";
import React from "react";
import { useSelectedChild } from "./context/useSelectedChild";
import { ParentType } from "@/lib/interfaces/parent.interface";

// UI
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const ParentAvatarButton = ({ parent }: { parent: ParentType }) => {
  const { selectedChild, setSelectedChild } = useSelectedChild();
  console.log(selectedChild);
  if (!selectedChild) return null;

  return (
    <div className="w-full h-20 pt-4">
      <DropdownMenu>
        <DropdownMenuTrigger className="rounded-full">
          <Avatar className="w-12 h-12">
            <AvatarImage src={parent?.profileURL || ""} alt="@shadcn" />
            <AvatarFallback>{parent?.name[0]}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          side={"right"}
          className="mt-6 w-80"
          sideOffset={8}
        >
          <DropdownMenuLabel className="flex items-center justify-start">
            <div className="flex flex-col">
              <span className="font-semibold">{parent?.email}</span>
              <span className="font-normal text-slate-600">Parent</span>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <RadioGroup
            defaultValue={selectedChild._id}
            className="grid grid-flow-row grid-cols-1"
          >
            {parent.children?.map((child) => {
              return (
                <div key={child._id}>
                  <RadioGroupItem
                    onClick={() => setSelectedChild(child)}
                    value={child._id as string}
                    id={child._id}
                    className="sr-only peer"
                  />
                  <Label
                    htmlFor={child._id}
                    className="transition flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-main-100 hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <div className="flex items-center justify-start flex-1 w-full">
                      <Avatar className="mr-4 border w-14 h-14">
                        <AvatarImage src={child.profileURL} />
                        <AvatarFallback className="uppercase">
                          {child.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col gap-1">
                        <span className="font-semibold capitalize">
                          {child.name}
                        </span>
                        <span className="font-normal text-slate-600">
                          {child.status}

                          {child.status !== "Enrolling" ? ` - ${child?.package} Package` : ""}
                        </span>
                      </div>
                    </div>
                  </Label>
                </div>
              );
            })}
          </RadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ParentAvatarButton;
