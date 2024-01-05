"use client";

// BACKEND
import { ParentType } from "@/lib/interfaces/parent.interface";
import React from "react";
import { SelectedProvider } from "./non-accepted/context/useSelected";
import ParentMain from "./main";

const ParentComponent = ({
  userInfo,
  manage_link,
  sessionId,
  studentId,
  status,
}: {
  userInfo: ParentType;
  manage_link: string;
  sessionId: string;
  studentId: string;
  status: boolean;
}) => {
  console.log(userInfo);
  return (
    <>
      <SelectedProvider>
        <ParentMain
          parent={userInfo}
          manage_link={manage_link}
          sessionId={sessionId}
          status={status}
          studentId={studentId}
        />
      </SelectedProvider>
    </>
  );
};

export default ParentComponent;
