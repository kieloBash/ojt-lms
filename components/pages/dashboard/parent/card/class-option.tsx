"use client";
import React from "react";
import { convertTime } from "@/utils/helpers/convertTime";
import { AttendanceType } from "@/lib/interfaces/attendance.interface";

// UI
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import dayjs from 'dayjs'

const ClassOptionCard = ({
  d,
  add,
  length,
}: {
  d: AttendanceType;
  length: number;
  add: (sel: AttendanceType) => void;
}) => {
  const classTime = convertTime(d.startTime, d.endTime);
  const colorClass = `bg-main-100`;

  return (
    <div className="w-full max-w-xs p-4 overflow-hidden bg-white border shadow rounded-xl">
      <div className="flex flex-col items-center justify-between md:flex-row">
        <div className="flex items-center justify-between flex-grow w-full">
          <div className="flex flex-col items-start ml-4">
            <div className="flex flex-col">
              <span className="text-xl font-semibold text-gray-700 uppercase">
                {d.class.class}
              </span>
              <span className="text-sm text-muted-foreground">
                ({d.ageGroup})
              </span>
            </div>
          </div>
          <Badge className="px-3 py-2">{dayjs(d.date).format("dddd")}</Badge>
        </div>
      </div>
      <p className="mt-4 mb-2 text-lg text-gray-800"></p>
      <div className="flex items-center justify-end">
        <Badge className="px-3 py-2">{dayjs(d.date).format("D MMM YYYY")}</Badge>
      </div>
      <div
        className={`flex items-center justify-between p-2 my-6 rounded ${colorClass}`}
      >
        <div className="flex items-start justify-between w-full">
          <p className="flex-grow w-full text-base text-center text-dark-1">
            {classTime}
          </p>
        </div>
      </div>
      <Button
        disabled={length === 5}
        type="button"
        className="w-full px-4 py-2 text-base font-bold"
        onClick={() => add(d)}
      >
        Add to Schedule
      </Button>
    </div>
  );
};

export default ClassOptionCard;
