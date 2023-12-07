"use client";
import React from "react";

// BACKEND
import dayjs from "dayjs";
import { cn } from "@/lib/utils";
import { AttendanceType } from "@/lib/interfaces/attendance.interface";
import { getMatrixMonth } from "@/utils/helpers/calendar/helpers";
import { daysOfWeek } from "@/utils/constants/daysOfWeek";

const MiniCalendarCard = ({ selected }: { selected: AttendanceType[] }) => {
  const currMonthIdx = dayjs().month();
  const currMonth = getMatrixMonth(currMonthIdx);
  const format = "DD-MM-YY";
  const today = dayjs().format(format);

  const days = selected.map((d) => dayjs(d.date).format("dddd"));

  //
  const year = dayjs().year();
  const firstDayOFMonth = dayjs(new Date(year, currMonthIdx, 1)).day();
  const lastDayOfMonth = dayjs(new Date(year, currMonthIdx))
    .endOf("month")
    .day();

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-xs p-4 bg-white border shadow rounded-2xl dark:bg-gray-700">
      <div className="text-base text-muted-foreground">Calendar</div>
      <div className="flex flex-wrap overflow-hidden">
        <div className="w-full rounded shadow">
          <div className="flex items-center justify-center mb-4">
            <div className="text-2xl font-semibold text-center text-black dark:text-white">
              {dayjs(new Date(dayjs().year(), currMonthIdx)).format(
                "MMMM YYYY"
              )}
            </div>
          </div>
          <div className="-mx-2 text-sm">
            <table className="w-full dark:text-white">
              <tr>
                {currMonth[0].map((day, i) => {
                  return (
                    <th key={i} className="px-2 py-3 md:px-3 ">
                      {day.format("dd").charAt(0)}
                    </th>
                  );
                })}
              </tr>
              {currMonth.map((row, i) => {
                let selectedDay = -1;

                if (i < days.length) selectedDay = daysOfWeek.indexOf(days[i]);

                return (
                  <tr key={i} className="overflow-hidden rounded-full">
                    {row.map((day, idx) => {
                      const currDay = day.format(format);
                      const dayClass =
                        today === currDay && "text-main-700 font-bold";

                      const DaySelectedClass = cn(
                        "",
                        i === 0
                          ? i === selected.length &&
                              firstDayOFMonth < day.day() &&
                              "bg-main-100"
                          : i === 4
                          ? i === selected.length &&
                            lastDayOfMonth >= day.day() &&
                            "bg-main-100"
                          : i === selected.length && "bg-main-100"
                      );

                      if (selectedDay === day.day())
                        return (
                          <td
                            key={idx}
                            className="relative px-1 py-3 text-center cursor-default"
                          >
                            <span className={`${dayClass}`}>
                              {day.format("D")}
                            </span>
                            <span className="absolute bottom-0 w-2 h-2 transform -translate-x-1/2 rounded-full bg-main-500 left-1/2"></span>
                          </td>
                        );
                      else
                        return (
                          <td
                            key={idx}
                            className={`px-2 py-3 text-center cursor-default md:px-3 ${DaySelectedClass}`}
                          >
                            <span className={`${dayClass}`}>
                              {day.format("D")}
                            </span>
                          </td>
                        );
                    })}
                  </tr>
                );
              })}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiniCalendarCard;
