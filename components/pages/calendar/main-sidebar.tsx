"use client";
import { useCalendarContext } from "@/components/providers/CalendarProvider";
import React, { useEffect } from "react";

const MainSidebarCalendar = () => {
  const { toggleSidebar } = useCalendarContext();

  if (!toggleSidebar) return null;


  return (
    <>
      {/* <div className="flex items-center justify-center border-r w-72">
        <p className="">Coming Soon...</p>
      </div> */}
    </>
  );
};

export default MainSidebarCalendar;
