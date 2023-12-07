"use client";

// BACKEND
import { ParentType } from "@/lib/interfaces/parent.interface";
import React from "react";
import useSingleParent from "./hook/useSingleParent";
import { SelectedProvider } from "./non-accepted/context/useSelected";
import ParentMain from "./main";

const ParentComponent = ({ userInfo }: { userInfo: ParentType }) => {
  const { data: parent, isLoading } = useSingleParent(userInfo?._id as string);
  if (isLoading) return null;
  if (parent.children.length === 0) return null;

  return (
    <SelectedProvider>
      <ParentMain parent={parent} />
    </SelectedProvider>
  );
};

export default ParentComponent;
