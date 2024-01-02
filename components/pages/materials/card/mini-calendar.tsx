"use client";
import React, { useState } from "react";

// BACKEND
import dayjs from "dayjs";
import { AttendanceType } from "@/lib/interfaces/attendance.interface";
import { getMatrixMonth } from "@/utils/helpers/calendar/helpers";
import { daysOfWeek } from "@/utils/constants/daysOfWeek";

const MiniCalendarCard = ({
  selected,
  attendanceToChange,
  setAttendanceToChange,
}: {
  selected: AttendanceType[];
  attendanceToChange: AttendanceType | undefined;
  setAttendanceToChange: (e: AttendanceType | undefined) => void;
}) => {
  const currMonthIdx = dayjs().month();
  const currMonth = getMatrixMonth(currMonthIdx);
  const format = "DD-MM-YY";

  const days = selected.map((d) => dayjs(d.date).format("dddd"));

  //
  const year = dayjs().year();

  console.log(selected);

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
                        dayjs(attendanceToChange?.date).format(format) ===
                          currDay && "text-main-700 font-black";

                      if (
                        selected.find(
                          (d) =>
                            dayjs(d.date).format(format) ===
                              day.format(format) &&
                            (d.classParticipants?.length || 0) > 0
                        )
                      ) {
                        return (
                          <td
                            key={idx}
                            onClick={() => {
                              const daySel = selected.find(
                                (d) =>
                                  dayjs(d.date).format("MM/DD/YYYY") ===
                                  day.format("MM/DD/YYYY")
                              );
                              setAttendanceToChange(daySel);
                            }}
                            className="relative px-1 py-3 text-center transition-colors cursor-pointer hover:text-main-300"
                          >
                            <span className={`${dayClass}`}>
                              {day.format("D")}
                            </span>
                            <span className="absolute bottom-0 w-2 h-2 transform -translate-x-1/2 rounded-full bg-main-500 left-1/2"></span>
                          </td>
                        );
                      } else
                        return (
                          <td
                            key={idx}
                            className={`px-2 py-3 text-center cursor-default md:px-3 text-muted-foreground`}
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
