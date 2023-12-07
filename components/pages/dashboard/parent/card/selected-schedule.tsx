"use client";

// UI
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { AttendanceType } from "@/lib/interfaces/attendance.interface";
import { convertTime } from "@/utils/helpers/convertTime";
import dayjs from "dayjs";
import {
  ArrowDown,
  ArrowUp,
  Delete,
  MoreHorizontal,
  PlusCircle,
} from "lucide-react";

export function SelectedScheduleCard({
  classCourses,
  moveUp,
  moveDown,
  remove,
}: {
  classCourses: AttendanceType[];
  moveUp: (sel: number) => void;
  moveDown: (sel: number) => void;
  remove: (sel: number) => void;
}) {
  return (
    <Card className="w-[19rem]">
      <CardHeader className="pb-3">
        <CardTitle>Class Schedule</CardTitle>
        <CardDescription className="text-xs">
          You can modify it again later
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 grid-rows-4 gap-1">
        {classCourses.map((data, index) => {
          const classCourse = data as AttendanceType;
          const classTime = convertTime(
            classCourse.startTime,
            classCourse.endTime
          );
          return (
            <div
              key={classCourse._id}
              className="flex items-center justify-between h-16 p-2 -mx-2 space-x-4 transition-all rounded-md"
            >
              <div className="space-y-1">
                <div className="flex items-center justify-start gap-2">
                  <p className="text-lg font-semibold leading-none">
                    {classCourse.class.class}
                  </p>
                  <Badge variant={"outline"} className="py-1">
                    {dayjs(classCourse.date).format("dddd")}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{classTime}</p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant={"ghost"} size={"icon"}>
                    <MoreHorizontal />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-40">
                  <DropdownMenuLabel>
                    Week {index + 1} Schedule
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    {index > 0 && (
                      <DropdownMenuItem onClick={() => moveUp(index)}>
                        <ArrowUp className="w-4 h-4 mr-2" />
                        <span>Move up</span>
                      </DropdownMenuItem>
                    )}
                    {index < classCourses.length - 1 && (
                      <DropdownMenuItem onClick={() => moveDown(index)}>
                        <ArrowDown className="w-4 h-4 mr-2" />
                        <span>Move down</span>
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => remove(index)}>
                    <Delete className="w-4 h-4 mr-2" />
                    <span>Delete</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          );
        })}
        {Array(5 - classCourses.length)
          .fill([])
          .map((_, index) => {
            return (
              <div
                key={index}
                className="flex items-center justify-center h-16 p-2 -mx-2 space-x-4 transition-all border rounded-md"
              >
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <PlusCircle className="w-4 h-4" /> Add a class
                </div>
              </div>
            );
          })}
      </CardContent>
    </Card>
  );
}
