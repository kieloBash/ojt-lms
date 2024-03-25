"use client";
import React from "react";

// UI
import { Button } from "@/components/ui/button";
import {
  CalendarDays,
  ChevronLeftIcon,
  ChevronRightIcon,
  Menu,
} from "lucide-react";
import { useCalendarContext } from "@/components/providers/CalendarProvider";
import dayjs from "dayjs";
import { useSelectedChild } from "@/components/global/context/useSelectedChild";

const CalendarTopBar = () => {
  const { monthIndex, setMonthIndex, setToggleSidebar, toggleSidebar } =
    useCalendarContext();

  const { selectedChild } = useSelectedChild();

  if (
    selectedChild?.status === "Not Paid" ||
    selectedChild?.status === "Enrolling"
  )
    return (
      <div className="flex items-center justify-between w-full h-20 px-4 bg-white" />
    );

  

  return (
    <>
      {/* MOBILE */}
      <div className="flex items-center justify-center w-full h-20 px-4 py-6 bg-white lg:hidden xl:hidden md:hidden">
        <div className="flex items-center justify-center gap-4">
          <Button
            variant={"ghost"}
            className="w-12 h-12 p-2 mr-4 rounded-full"
            type="button"
            onClick={() => setToggleSidebar(!toggleSidebar)}
          >
            <div className="flex gap-6">
              <Menu className="w-10 h-10" />
              <h1 className="text-4xl font-bold">Calendar</h1>
            </div>
          </Button>
        </div>
      </div>

      {/* DESKTOP */}
      <div className="items-center justify-between hidden w-full h-20 px-4 py-6 bg-white lg:flex xl:flex md:flex">
        <div className="flex items-center justify-center gap-4">
          <CalendarDays className="w-10 h-10" />
          <h1 className="text-4xl font-bold">Calendar</h1>
        </div>
        <div className="flex items-center justify-center gap-8 w-[27rem]">
          <Button
            onClick={() => {
              setMonthIndex(dayjs().month());
            }}
            type="button"
            variant={"outline"}
            className="font-bold"
          >
            Today
          </Button>
          <span className="flex-1 text-2xl font-bold">
            {dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")}
          </span>
          <div className="flex items-center justify-center gap-2">
            <Button
              type="button"
              onClick={() => setMonthIndex(monthIndex - 1)}
              variant={"outline"}
              className="w-8 h-8 p-1"
            >
              <ChevronLeftIcon className="w-full h-full" />
            </Button>
            <Button
              type="button"
              onClick={() => setMonthIndex(monthIndex + 1)}
              variant={"outline"}
              className="w-8 h-8 p-1"
            >
              <ChevronRightIcon className="w-full h-full" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CalendarTopBar;
