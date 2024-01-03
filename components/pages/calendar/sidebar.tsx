"use client";
import React, { useMemo, useState } from "react";

// UI
import { NextClassCard } from "./card/next-class";
import { ScrollArea } from "@/components/ui/scroll-area";

// BACKEND
import { UserType } from "@/lib/interfaces/user.interface";
import { ParentType } from "@/lib/interfaces/parent.interface";
import { AttendanceType } from "@/lib/interfaces/attendance.interface";
import { PlusCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useCalendarContext } from "@/components/providers/CalendarProvider";
import dayjs from "dayjs";
import { AddClassScheduleModal } from "./modals/add-class-schedule";
import { AlertHoliday } from "./modals/propt-holiday";
import { getWeek } from "@/utils/helpers/getWeek";
import {
  classClosedChecker,
  classUpcomingChecker,
} from "@/utils/helpers/calendar/helpers";
import { Label } from "@/components/ui/label";

const CalendarSideBar = ({
  userInfo,
  ATTENDANCES,
}: {
  userInfo: UserType | ParentType;
  ATTENDANCES: AttendanceType[];
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [prevDateAttendance, setPrevDateAttendance] = useState<
    Date | undefined
  >();
  const [open, setOpen] = useState<boolean>(false);
  const { toggleSidebar } = useCalendarContext();

  const { monthIndex, holidays } = useCalendarContext();
  const currDate = dayjs().set("month", monthIndex);

  const filteredAttendance = useMemo(() => {
    let filtered: AttendanceType[] = [];
    filtered = ATTENDANCES.map((a: AttendanceType) => {
      const attendanceDate = dayjs(a.date);
      if (
        attendanceDate.month() === currDate.month() &&
        attendanceDate.year() === currDate.year()
      ) {
        // if (!classClosedChecker({ dayLimit: 0, attDate: attendanceDate }))
        return a;
      }
    }).filter((a): a is AttendanceType => a !== undefined);

    return filtered;
  }, [ATTENDANCES, monthIndex]);

  const { start, end } = getWeek(new Date());

  const thisWeekHoliday =
    holidays.filter(
      (h) =>
        dayjs(h.date).isAfter(dayjs(start)) &&
        dayjs(h.date).isBefore(dayjs(end))
    ) || [];

  const upcomingClasses = filteredAttendance.filter((a) => {
    const attDate = dayjs(a.date);
    if (
      !classUpcomingChecker({
        attDate,
        startTime: a.startTime,
        endTime: a.endTime,
      })
    )
      return a;
  });
  console.log(filteredAttendance);
  console.log(upcomingClasses);

  if (!toggleSidebar) return null;
  return (
    <>
      {thisWeekHoliday.length > 0 && (
        <AlertHoliday
          toggle={thisWeekHoliday.length > 0}
          holidays={thisWeekHoliday}
        />
      )}
      {open && (
        <AddClassScheduleModal
          open={open}
          setOpen={(e) => {
            setSelectedIndex(-1);
            setOpen(e);
          }}
          indexMonth={selectedIndex}
          prevDateAttendance={prevDateAttendance}
        />
      )}
      <article className="flex flex-col items-start justify-center w-full max-w-xs p-1 bg-white">
        {upcomingClasses.length > 0 ? (
          <Label className="w-full text-xl font-bold text-center">
            Upcoming Classes
          </Label>
        ) : (
          <Label className="w-full text-xl font-bold text-center">
            Add Classes
          </Label>
        )}
        <ScrollArea className="w-full h-[calc(100vh-9rem)] pb-4 bg-white">
          <main className="flex flex-col items-start justify-start gap-2 px-2 py-4">
            {upcomingClasses?.map((attendance: AttendanceType, index) => {
              return (
                <NextClassCard
                  key={attendance._id}
                  attendance={attendance}
                  index={index}
                />
              );
            })}
            {filteredAttendance.length <= 3 && (
              <Card
                className="flex items-center justify-center w-full h-20 max-w-xs transition-colors cursor-pointer hover:bg-slate-100"
                onClick={() => {
                  setSelectedIndex(filteredAttendance.length);
                  setOpen(true);
                  if (filteredAttendance.length === 0)
                    setPrevDateAttendance(new Date());
                  else {
                    const temp = dayjs(
                      filteredAttendance[filteredAttendance.length - 1].date
                    );
                    setPrevDateAttendance(
                      temp.set("date", temp.get("date") + 7).toDate()
                    );
                  }
                }}
              >
                <div className="flex">
                  <PlusCircle className="w-5 h-5 mr-2" />
                  Add Class
                </div>
              </Card>
            )}
          </main>
        </ScrollArea>
      </article>
    </>
  );
};

export default CalendarSideBar;
