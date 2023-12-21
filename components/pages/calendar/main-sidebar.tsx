"use client";
import { useCalendarContext } from "@/components/providers/CalendarProvider";
import React from "react";

const MainSidebarCalendar = () => {
  const { toggleSidebar } = useCalendarContext();

  if (!toggleSidebar) return null;

  return <div className="border-r w-72"></div>;
};

export default MainSidebarCalendar;
