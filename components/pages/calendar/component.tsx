"use client";
import { useCalendarContext } from "@/components/providers/CalendarProvider";
import React from "react";
import MonthlyView from "./month-view";
import WeeklyView from "./week-view";
import { AttendanceType } from "@/lib/interfaces/attendance.interface";
import { Loader2 } from "lucide-react";
import { useSelectedChild } from "@/components/global/context/useSelectedChild";
import dayjs from "dayjs";
import { isParent } from "@/utils/helpers/isParent";
import { UserType } from "@/lib/interfaces/user.interface";
import useStudentAttendances from "./hooks/useStudentAttendances";
import useTeacherAttendance from "./hooks/useTeachersAttendance";
import { ParentType } from "@/lib/interfaces/parent.interface";
import CalendarSideBar from "./sidebar";

const CalendarComponent = ({
  userInfo,
}: {
  userInfo: UserType | ParentType;
}) => {
  const { calendarType, monthIndex } = useCalendarContext();
  const currDate = dayjs().year(dayjs().year()).month(monthIndex);
  const { selectedChild } = useSelectedChild();

  let ATTENDANCES: any;

  if (isParent(userInfo)) {
    ATTENDANCES = useStudentAttendances(selectedChild?._id as string);
  } else {
    ATTENDANCES = useTeacherAttendance(currDate.toDate());
  }

  if (selectedChild?.status === "Not Paid")
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-10rem)] bg-white">
        <p className="">Waiting for Payment</p>
      </div>
    );

  if (selectedChild?.status === "Enrolling")
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-10rem)] bg-white">
        <p className="">Please Enroll first</p>
      </div>
    );

  if (ATTENDANCES.isLoading)
    return (
      <div className="flex items-center justify-center w-full h-full">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );

  return (
    <>
      <CalendarSideBar userInfo={userInfo} ATTENDANCES={ATTENDANCES.data} />
      {calendarType === "Month" ? (
        <MonthlyView
          userInfo={userInfo}
          attendance={ATTENDANCES.data as AttendanceType[]}
        />
      ) : (
        <WeeklyView
          userInfo={userInfo}
          attendance={ATTENDANCES.data as AttendanceType[]}
        />
      )}
    </>
  );
};

export default CalendarComponent;
