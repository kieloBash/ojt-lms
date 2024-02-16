"use client";

// UI
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CircleIcon } from "lucide-react";

// BACKEND
import { AttendanceType } from "@/lib/interfaces/attendance.interface";
import { convertTime } from "@/utils/helpers/convertTime";
import dayjs from "dayjs";
import React from "react";

import ChangeClassModal from "../modals/change-class";
import { Separator } from "@/components/ui/separator";
import GoingBtn from "../btn/going";

export function NextClassCard({
  attendance,
  index,
}: {
  index: number;
  attendance: AttendanceType;
}) {
  return (
    <Card className="w-full max-w-xs">
      <CardHeader className="grid grid-cols-[1fr_110px] items-start gap-4 space-y-0">
        <div className="space-y-1">
          <CardTitle>{dayjs(attendance.date).format("dddd")}</CardTitle>
          <CardDescription className="text-xs">
            {convertTime(attendance.startTime, attendance.endTime)}
          </CardDescription>
        </div>
        <div className="flex items-center space-x-1 rounded-md bg-secondary text-secondary-foreground">
          <GoingBtn attendance={attendance} />
          <Separator orientation="vertical" className="h-[20px]" />
          {index >= 0 && (
            <ChangeClassModal index={index} attendance={attendance} />
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between w-full space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            <CircleIcon className="w-3 h-3 mr-1 fill-main-400 text-main-400" />(
            {attendance.ageGroup})
          </div>

          <div>{attendance.date.toDateString()}</div>
        </div>
      </CardContent>
    </Card>
  );
}
