"use client";
import React from "react";

// UI
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Check, Clock, Link as LinkIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StudentType } from "@/lib/interfaces/student.interface";
import useStudentAttendances from "@/components/pages/calendar/hooks/useStudentAttendances";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { convertTime } from "@/utils/helpers/convertTime";
import { Label } from "@/components/ui/label";
import dayjs from "dayjs";

const CalendarAttendance = ({
  selectedChild,
}: {
  selectedChild: StudentType;
}) => {
  const Attendance = useStudentAttendances(selectedChild._id as string);

  if (Attendance.isLoading) return null;

  return (
    <ScrollArea className="w-full h-[calc(100vh-15rem)]">
      <div className="grid w-full h-full grid-flow-row grid-cols-1 gap-4 px-4">
        {Attendance.data &&
          Attendance.data?.map((a) => {
            return (
              <div className="flex flex-col" key={a._id}>
                <Label className="text-xl font-bold">
                  {dayjs(a.date).format("MMMM DD")}
                </Label>
                <Separator className="mt-2 mb-4" />
                <div className="ml-10">
                  <Card className="w-full">
                    <CardContent className="p-2">
                      <div className="flex h-24">
                        <div className="flex flex-col items-center justify-center w-48 text-2xl font-bold">
                          <h3 className="uppercase">{a.class.class}</h3>
                          <div className="w-20 h-1 bg-black" />
                        </div>
                        <Separator orientation={"vertical"} />
                        <div className="flex items-center justify-between flex-1 px-8">
                          <div className="flex flex-col items-start justify-center flex-1 gap-1">
                            <div className="flex items-center justify-center text-xs text-muted-foreground">
                              <LinkIcon className="w-4 h-4 mr-2" />
                              <Link
                                className="hover:underline"
                                href={
                                  a.link || "http://localhost:3000/dashboard"
                                }
                              >
                                <span>
                                  {a.link || "http://localhost:3000/dashboard"}
                                </span>
                              </Link>
                            </div>
                            <div className="flex items-center justify-center">
                              <Clock className="w-4 h-4 mr-2" />
                              <h2 className="text-xl font-semibold">
                                {convertTime(a.startTime, a.endTime)}
                              </h2>
                            </div>
                          </div>
                          <Button
                            variant={"ghost"}
                            className={`${
                              true
                                ? "text-green-800 border-green-800 bg-green-200"
                                : ""
                            }`}
                          >
                            <Check className="w-5 h-5 mr-2" />
                            Going
                          </Button>
                          {/* <Button
            variant={"ghost"}
            className={`${
              true
                ? "text-red-800 border-red-800 bg-red-200"
                : ""
            }`}
          >
            <X className="w-5 h-5 mr-2" />
            Not Going
          </Button> */}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            );
          })}
      </div>
    </ScrollArea>
  );
};

export default CalendarAttendance;
