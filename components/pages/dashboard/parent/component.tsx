"use client";

// BACKEND
import { ParentType } from "@/lib/interfaces/parent.interface";
import React from "react";
import { SelectedProvider } from "./non-accepted/context/useSelected";
import ParentMain from "./main";

const ParentComponent = ({ userInfo }: { userInfo: ParentType }) => {
  console.log(userInfo);
  return (
    <>
      <SelectedProvider>
        <ParentMain parent={userInfo} />
      </SelectedProvider>
    </>
  );
};

export default ParentComponent;
