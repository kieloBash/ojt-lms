"use client";

// BACKEND
import { ParentType } from "@/lib/interfaces/parent.interface";
import React from "react";
import { SelectedProvider } from "./non-accepted/context/useSelected";
import ParentMain from "./main";

const ParentComponent = ({
  userInfo,
  manage_link,
}: {
  userInfo: ParentType;
  manage_link: string;
}) => {
  console.log(userInfo);
  return (
    <>
      <SelectedProvider>
        <ParentMain parent={userInfo} manage_link={manage_link} />
      </SelectedProvider>
    </>
  );
};

export default ParentComponent;
