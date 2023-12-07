"use client";
import React from "react";

// UI
import { Checkbox } from "@/components/ui/checkbox";

const classes = [
  {
    id: "N1",
  },
  {
    id: "N2",
  },
  {
    id: "K1",
  },
  {
    id: "K2",
  },
] as const;

const ClassesCheckboxes = () => {
  return (
    <ul className="flex flex-col w-full gap-2">
      {classes.map((item, index) => {
        return (
          <li className="flex w-full gap-2" key={index}>
            <Checkbox onCheckedChange={(checked) => {}} />
            <span className="">{item.id}</span>
          </li>
        );
      })}
    </ul>
  );
};

export default ClassesCheckboxes;
