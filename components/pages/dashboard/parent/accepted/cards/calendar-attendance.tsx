"use client";
import React, { useEffect, useState } from "react";

// UI
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Check, Clock, Link as LinkIcon, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";

// BACKEND
import Link from "next/link";
import { StudentType } from "@/lib/interfaces/student.interface";
import useStudentAttendances from "@/components/pages/calendar/hooks/useStudentAttendances";
import { convertTime } from "@/utils/helpers/convertTime";
import dayjs from "dayjs";
import { classUpcomingChecker } from "@/utils/helpers/calendar/helpers";

const CalendarAttendance = ({
  selectedChild,
}: {
  selectedChild: StudentType;
}) => {
  const Attendance = useStudentAttendances(selectedChild._id as string);

  // console.log(Attendance);

  const [attendanceTotals, setAttendanceTotals] = useState({
    absent: 0,
    present: 0,
    pending: 0,
  });

  useEffect(() => {
    // Initialize variables for totals
    let absent = 0;
    let present = 0;
    let pending = 0;

    // Iterate through attendance data
    Attendance?.data?.forEach((attendance) => {
      // Check if the student is present in the current attendance record
      const isStudentPresent = attendance?.studentsPresent?.find(
        (student) => student._id === selectedChild._id
      );

      // Check if the class is upcoming
      const isClassUpcoming = classUpcomingChecker({
        attDate: dayjs(attendance.date),
        startTime: attendance.startTime,
        endTime: attendance.endTime,
      });

      // Update totals based on conditions
      if (isStudentPresent) present++;
      else {
        if (!isClassUpcoming) pending++;
        else absent++;
      }
    });

    // Update state with the calculated totals
    setAttendanceTotals({ absent, present, pending });
  }, [Attendance.data, selectedChild]);

  if (Attendance.isLoading)
    return (
      <div className="flex items-center justify-center w-full h-full">
        <Loader2 className="w-6 h-6 animate-spin" />;
      </div>
    );
  return (
    <ScrollArea className="w-full h-[calc(100vh-15rem)]">
      <div className="w-full h-full px-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[150px]">Class</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Attendance</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Attendance?.data?.map((single) => (
              <TableRow key={single._id}>
                <TableCell>{single.class.class}</TableCell>
                <TableCell className="">
                  {convertTime(single.startTime, single.endTime)}
                </TableCell>
                <TableCell>
                  {dayjs(single.date).format("MMMM DD YYYY, dddd")}
                </TableCell>
                <TableCell className="font-medium text-right">
                  {single.studentsPresent?.find(
                    (e) => e._id === selectedChild._id
                  ) ? (
                    <span className="text-green-500">Present</span>
                  ) : (
                    <>
                      {!classUpcomingChecker({
                        attDate: dayjs(single.date),
                        startTime: single.startTime,
                        endTime: single.endTime,
                      })
                        ? "Pending"
                        : "Absent"}
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Present</TableCell>
              <TableCell className="text-right">
                {attendanceTotals.present}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3}>Absent</TableCell>
              <TableCell className="text-right">
                {attendanceTotals.absent}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3}>Pending</TableCell>
              <TableCell className="text-right">
                {attendanceTotals.pending}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell className="text-right">
                {attendanceTotals.absent +
                  attendanceTotals.pending +
                  attendanceTotals.present}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </ScrollArea>
  );
};

export default CalendarAttendance;
