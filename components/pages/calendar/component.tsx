"use client";
import { useCalendarContext } from "@/components/providers/CalendarProvider";
import React, { useEffect, useState } from "react";
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
import MainSidebarCalendar from "./main-sidebar";
import { MissedAlert } from "./modals/missed-alert";
import Attendance from "@/lib/models/attendance.model";
import useAttendanceFinal from "./hooks/useAttendancesFinal";
import { AskAlert } from "./modals/ask-alert";

const CalendarComponent = ({
  userInfo,
}: {
  userInfo: UserType | ParentType;
}) => {
  const { calendarType, monthIndex } = useCalendarContext();
  const currDate = dayjs().year(dayjs().year()).month(monthIndex);
  const { selectedChild } = useSelectedChild();
  const [alertMissed, setAlertMissed] = useState(false);
  const [alertAsk, setAlertAsk] = useState(false);

  const ATTENDANCES = useAttendanceFinal({
    studentId: selectedChild?._id,
    currDate: new Date(),
    isParent: isParent(userInfo),
  });

  useEffect(() => {
    if (ATTENDANCES?.data && (!alertMissed || !alertAsk)) {
      const thisWeek = dayjs().startOf("week").format("MM-DD-YYYY");
      const prompt = ATTENDANCES.data.find((d: AttendanceType) => {
        const comparedWeek = dayjs(d.date).startOf("week").format("MM-DD-YYYY");
        if (thisWeek === comparedWeek) return d;
      })
        ? true
        : false;

      if (prompt) return;

      if (dayjs().get("day") >= 3) {
        // MISSED
        // console.log("MISSED");
        setAlertMissed(true);
      } else {
        // ASK TO SCHEDULE
        // console.log("ASK TO SCHEDULE");
        setAlertAsk(true);
      }
    }
  }, [ATTENDANCES?.data]);

  if (selectedChild?.status === "Not Paid")
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-10rem)] bg-white w-full">
        <p className="">Waiting for Payments</p>
      </div>
    );

  if (selectedChild?.status === "Enrolling")
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-10rem)] bg-white w-full">
        <p className="">Please Enroll first</p>
      </div>
    );

  // console.log(ATTENDANCES);
  if (ATTENDANCES.isLoading)
    return (
      <div className="flex items-center justify-center w-full h-full">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );

  return (
    <>
      <MissedAlert open={alertMissed} openChange={(e) => setAlertMissed(e)} />
      <AskAlert open={alertAsk} openChange={(e) => setAlertAsk(e)} />
      {isParent(userInfo) ? (
        <CalendarSideBar
          userInfo={userInfo}
          ATTENDANCES={ATTENDANCES.data || []}
        />
      ) : (
        <MainSidebarCalendar />
      )}
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
