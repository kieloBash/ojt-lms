"use client";
import React from "react";

// UI
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useCalendarContext } from "@/components/providers/CalendarProvider";
import dayjs from "dayjs";
import { useSelectedChild } from "@/components/global/context/useSelectedChild";

const CalendarTopBar = () => {
  const { monthIndex, setMonthIndex, calendarType, setCalendarType } =
    useCalendarContext();

  const { selectedChild } = useSelectedChild();

  if (
    selectedChild?.status === "Not Paid" ||
    selectedChild?.status === "Enrolling"
  )
    return (
      <div className="flex items-center justify-between w-full px-4 bg-white h-28" />
    );

  return (
    <div className="flex items-center justify-between w-full px-4 bg-white h-28">
      <div className="flex items-center justify-center gap-8">
        <h1 className="text-4xl font-bold">Calendar</h1>
        <div className="flex items-center justify-center gap-1 px-2 py-1 rounded-lg bg-slate-200">
          <Button
            className={`w-24 py-2 h-fit ${
              calendarType === "Week"
                ? "bg-white text-black hover:bg-white border font-semibold"
                : "text-black bg-slate-200 hover:bg-slate-100"
            }`}
            onClick={() => setCalendarType("Week")}
          >
            Week
          </Button>
          <Button
            className={`w-24 py-2 h-fit ${
              calendarType === "Month"
                ? "bg-white text-black hover:bg-white border font-semibold"
                : "text-black bg-slate-200 hover:bg-slate-100"
            }`}
            onClick={() => setCalendarType("Month")}
          >
            Month
          </Button>
        </div>
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
  );
};

export default CalendarTopBar;
