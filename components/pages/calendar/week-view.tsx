"use client";
import React from "react";

// DAYS
import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";
import isoWeek from "dayjs/plugin/isoWeek";

// UI
import { TIMESLOTS } from "@/utils/constants";
import { AttendanceType } from "@/lib/interfaces/attendance.interface";
import { UserType } from "@/lib/interfaces/user.interface";
import { ParentType } from "@/lib/interfaces/parent.interface";
import { convertTime } from "@/utils/helpers/convertTime";

const WeeklyView = ({
  attendance,
  userInfo,
}: {
  attendance: AttendanceType[];
  userInfo: UserType | ParentType;
}) => {
  dayjs.extend(weekOfYear);
  dayjs.extend(isoWeek);
  const format = "DD/MM/YYYY";

  const week = dayjs().week();
  const year = dayjs().year();

  const days: dayjs.Dayjs[] = [];
  for (let i = 0; i < 7; i++) {
    const day = dayjs().year(year).isoWeek(week).day(i);
    days.push(day);
  }

  const AttendanceInWeek = days.map((currDay) => {
    return attendance.filter(
      (a) => dayjs(a.date).format(format) === dayjs(currDay).format(format)
    );
  });

  let temp = TIMESLOTS.map((timeslot) => {
    const att = AttendanceInWeek.map((attendances) => {
      const filtered = attendances.filter((a) => {
        const currTime = timeslot.split(":");
        const attendanceStartTime = dayjs(a.date)
          .hour(Number(currTime[0]))
          .minute(Number(currTime[1]));

        const attendanceEndTime = dayjs(a.date)
          .hour(Number(currTime[0]) + 1)
          .minute(Number(currTime[1]));

        const startTime = a.startTime.split(":");
        const classStart = dayjs(a.date)
          .hour(Number(startTime[0]))
          .minute(Number(startTime[1]));

        if (
          classStart.isAfter(attendanceStartTime) &&
          classStart.isBefore(attendanceEndTime)
        ) {
          return a;
        }
      });

      return filtered;
    });

    return att;
  }).filter((item) => item.length > 0);

  interface AttendanceDict {
    [key: string]: any[];
  }

  let TimeslotsAndAttendanceDict: AttendanceDict = {};

  TIMESLOTS.reduce((dict: AttendanceDict, timeslot, i) => {
    dict[timeslot] = temp[i];
    return dict;
  }, TimeslotsAndAttendanceDict);

  return (
    <div className="relative w-full h-full bg-white">
      <div className="relative flex flex-col w-full -mt-4">
        <div className="sticky top-0 w-full h-20 bg-white">
          <div className="flex w-full py-2">
            <div className="flex items-center justify-center w-20" />
            <ul className="grid w-full grid-cols-7 grid-rows-1">
              {days.map((d, index) => {
                const selectedClassName =
                  d.format(format) === dayjs().format(format) &&
                  "bg-main-500 text-white";

                return (
                  <li
                    key={index}
                    className="flex flex-col items-center justify-center h-18"
                  >
                    <p className="">{d.format("dd")}</p>
                    <div
                      className={`w-9 h-9 p-2 flex justify-center items-center rounded-full text-lg ${selectedClassName}`}
                    >
                      <span className="">{d.format("DD")}</span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <ul className="flex flex-col w-full h-full">
          {TIMESLOTS.map((timeslot, i) => {
            return (
              <li className="flex w-full min-h-[4rem] border-t" key={i}>
                <p className="flex flex-col w-20 min-h-[4rem] p-2 border-r text-sm">
                  {timeslot}
                </p>
                <div className="grid w-full min-h-[4rem] grid-cols-7 grid-rows-1">
                  {Array(7)
                    .fill([])
                    .map((_, index) => {
                      const temp = TimeslotsAndAttendanceDict[timeslot];

                      return (
                        <div className="flex flex-col p-2 border-r" key={index}>
                          {temp[index].map((data: AttendanceType) => {
                            return (
                              <>
                                <p className="w-full">
                                  {data.class.class} - {data.ageGroup}
                                </p>
                                <p className="">
                                  {convertTime(data.startTime, data.endTime)}
                                </p>
                              </>
                            );
                          })}
                        </div>
                      );
                    })}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default WeeklyView;
