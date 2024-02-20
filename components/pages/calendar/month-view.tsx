"use client";
import React, { useState } from "react";

// UI
import { CalendarSheet } from "@/components/global/CalendarSideSheet";

import { AttendanceType } from "@/lib/interfaces/attendance.interface";
import dayjs from "dayjs";

// BACKEND
import { useCalendarContext } from "@/components/providers/CalendarProvider";
import { convertTime } from "@/utils/helpers/convertTime";
import { useQuery } from "@tanstack/react-query";
import { fetchSingleAttendanceById } from "@/lib/actions/attendance.action";
import { UserType } from "@/lib/interfaces/user.interface";
import { ParentType } from "@/lib/interfaces/parent.interface";
import { isParent } from "@/utils/helpers/isParent";
import { getMatrixMonth } from "@/utils/helpers/calendar/helpers";

const MonthlyView = ({
  attendance,
  userInfo,
}: {
  attendance: AttendanceType[];
  userInfo: UserType | ParentType;
}) => {
  const [sheetTrigger, setSheetTrigger] = useState(false);
  const [selectedAttendance, setSelectedAttendance] =
    useState<AttendanceType | null>(null);

  const format = "DD-MM-YY";
  const today = dayjs().format(format);

  const { monthIndex } = useCalendarContext();
  const monthMatrix = getMatrixMonth(monthIndex);

  function closeSheet(col: boolean) {
    setSheetTrigger(false);
    setSelectedAttendance(null);
  }

  const AGEGROUP_COLORS = {
    N1: "bg-violet-200 hover:bg-violet-100",
    N2: "bg-red-200 hover:bg-red-100",
    K1: "bg-green-200 hover:bg-green-100",
    K2: "bg-orange-200 hover:bg-orange-100",
  };

  // useQUERY
  const singleAttendance = useQuery({
    queryKey: [
      `attendance:selected-${selectedAttendance?._id}`,
      selectedAttendance?._id,
    ],
    queryFn: async () => {
      const { attendances } = await fetchSingleAttendanceById({
        attendanceId: selectedAttendance?._id as string,
      });
      return attendances;
    },
    enabled: selectedAttendance !== null,
  });

  return (
    <>
      {singleAttendance.status === "success" &&
        sheetTrigger &&
        selectedAttendance && (
          <CalendarSheet
            isParent={isParent(userInfo)}
            trigger={sheetTrigger}
            setTrigger={closeSheet}
            selectedAttendance={singleAttendance.data}
          />
        )}
      <div className="flex flex-col flex-1 w-full h-full bg-white">
        <div className="grid grid-cols-7 grid-rows-1">
          {monthMatrix[0].map((day, i) => {
            return (
              <div
                key={i}
                className="flex items-start justify-center w-full pt-2 text-sm font-semibold text-center border-r"
              >
                <div className="">
                  {day.format("dd").charAt(0)}
                  {day.format("dd").charAt(1)}
                </div>
              </div>
            );
          })}
        </div>
        <div className="grid flex-1 grid-cols-7 grid-rows-5">
          {monthMatrix.map((row, i) => {
            return (
              <React.Fragment key={i}>
                {row.map((day, idx) => {
                  const currDay = day.format(format);
                  const dayClass =
                    today === currDay && "bg-main-500 text-white";

                  const dayAttendances = attendance?.filter((d) => {
                    if (dayjs(d.date).format(format) === currDay) {
                      return d;
                    }
                  });

                  return (
                    <div
                      key={idx}
                      className="relative flex flex-col items-center justify-start w-full h-full p-2 border-b border-r"
                    >
                      <button
                        className={`${dayClass} w-8 h-8 hover:bg-main-200 rounded-full transition-colors mb-1`}
                      >
                        <span className="text-base">{day.format("D")}</span>
                      </button>
                      {dayAttendances && dayAttendances.length > 0 ? (
                        <>
                          {dayAttendances.map((dayAttendance) => {
                            const colorClass =
                              AGEGROUP_COLORS[dayAttendance.ageGroup];
                            const currDate = dayjs();
                            const endTimeArr = dayAttendance.endTime.split(":");
                            const startTimeArr =
                              dayAttendance.startTime.split(":");

                            const startTime = dayjs(dayAttendance.date)
                              .set("hour", Number(startTimeArr[0]))
                              .set("minute", Number(startTimeArr[1]) - 15);
                            const endTime = dayjs(dayAttendance.date)
                              .set("hour", Number(endTimeArr[0]))
                              .set("minute", Number(endTimeArr[1]));

                            const within =
                              currDate.isAfter(startTime) &&
                              currDate.isBefore(endTime);

                            return (
                              <button
                                key={dayAttendance._id as string}
                                onClick={() => {
                                  setSheetTrigger(true);
                                  setSelectedAttendance(dayAttendance);
                                }}
                                className="relative w-full"
                              >
                                {today === currDay && within && (
                                  <div className="absolute z-10 w-5 h-2 -translate-y-1/2 -left-2 top-1/2 rounded-e-full bg-main-500/90" />
                                )}
                                <div
                                  className={`w-full flex justify-between ${colorClass} mb-1 p-1 transition-colors`}
                                >
                                  <p className="text-xs">
                                    {dayAttendance.ageGroup} |{" "}
                                    {dayjs(new Date(dayAttendance.date)).format(
                                      "dddd"
                                    )}{" "}
                                    -{" "}
                                    {dayjs(new Date(dayAttendance.date)).format(
                                      "MM/DD"
                                    )}{" "}
                                    |{" "}
                                    {convertTime(
                                      dayAttendance.startTime,
                                      dayAttendance.endTime
                                    )}
                                  </p>

                                  {/* <p className="text-xs line-clamp-1">
                                    {convertTime(
                                      dayAttendance.startTime,
                                      dayAttendance.endTime
                                    )}
                                  </p> */}
                                </div>
                              </button>
                            );
                          })}
                        </>
                      ) : null}
                    </div>
                  );
                })}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default MonthlyView;
