"use client";
import React, { useEffect, useMemo, useState } from "react";

// UI
import { NextClassCard } from "./card/next-class";
import { ScrollArea } from "@/components/ui/scroll-area";

// BACKEND
import { UserType } from "@/lib/interfaces/user.interface";
import { ParentType } from "@/lib/interfaces/parent.interface";
import { AttendanceType } from "@/lib/interfaces/attendance.interface";
import { Button } from "@/components/ui/button";
import { Plus, PlusCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useCalendarContext } from "@/components/providers/CalendarProvider";
import dayjs from "dayjs";
import { AddClassScheduleModal } from "./modals/add-class-schedule";

const CalendarSideBar = ({
  userInfo,
  ATTENDANCES,
}: {
  userInfo: UserType | ParentType;
  ATTENDANCES: AttendanceType[];
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [open, setOpen] = useState<boolean>(false);

  const { monthIndex } = useCalendarContext();
  const currDate = dayjs().set("month", monthIndex);

  const filteredAttendance = useMemo(() => {
    let filtered: AttendanceType[] = [];
    filtered = ATTENDANCES.map((a: AttendanceType) => {
      const attendanceDate = dayjs(a.date);
      if (
        attendanceDate.month() === currDate.month() &&
        attendanceDate.year() === currDate.year()
      ) {
        return a;
      }
    }).filter((a): a is AttendanceType => a !== undefined);

    return filtered;
  }, [ATTENDANCES, monthIndex]);

  function getOrdinalSuffix(num: number) {
    if (num >= 11 && num <= 13) {
      return "th";
    }
    switch (num % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  }

  return (
    <>
      <AddClassScheduleModal
        open={open}
        setOpen={(e) => {
          setSelectedIndex(-1);
          setOpen(e);
        }}
        indexMonth={selectedIndex - 1}
      />
      <article className="flex flex-col items-start justify-start w-full max-w-xs gap-4 bg-white">
        <ScrollArea className="w-full h-[calc(100vh-7rem)] pb-4 bg-white">
          <main className="flex flex-col items-start justify-start gap-2 px-2">
            {filteredAttendance?.map((attendance: AttendanceType, index) => {
              return (
                <NextClassCard
                  key={attendance._id}
                  attendance={attendance}
                  index={index}
                />
              );
            })}
            {Array(5 - filteredAttendance.length)
              .fill([])
              .map((_, index) => {
                const newIdx = filteredAttendance.length + 1 + index;
                return (
                  <Card
                    className="flex items-center justify-center w-full h-20 max-w-xs transition-colors cursor-pointer hover:bg-slate-100"
                    key={index}
                    onClick={() => {
                      setSelectedIndex(newIdx);
                      setOpen(true);
                    }}
                  >
                    <div className="flex">
                      <PlusCircle className="w-5 h-5 mr-2" />
                      Add {newIdx}
                      {getOrdinalSuffix(newIdx)} Week Class
                    </div>
                  </Card>
                );
              })}
          </main>
        </ScrollArea>
      </article>
    </>
  );
};

export default CalendarSideBar;
