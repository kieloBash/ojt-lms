"use client";
import { useCalendarContext } from "@/components/providers/CalendarProvider";
import React, { useEffect, useMemo, useState } from "react";
import MonthlyView from "./month-view";
import WeeklyView from "./week-view";
import { AttendanceType } from "@/lib/interfaces/attendance.interface";
import { Loader2 } from "lucide-react";
import { useSelectedChild } from "@/components/global/context/useSelectedChild";
import dayjs, { Dayjs } from "dayjs";
import { isParent } from "@/utils/helpers/isParent";
import { UserType } from "@/lib/interfaces/user.interface";
import { ParentType } from "@/lib/interfaces/parent.interface";
import CalendarSideBar from "./sidebar";
import MainSidebarCalendar from "./main-sidebar";
import { MissedAlert } from "./modals/missed-alert";
import Attendance from "@/lib/models/attendance.model";
import useAttendanceFinal from "./hooks/useAttendancesFinal";
import { AskAlert } from "./modals/ask-alert";
import {
  getWeeklyDatesInAMonth,
  isDateAfterWeekEnd,
  isDateInWeek,
} from "@/utils/helpers/getWeeksInMonth";
import useNewFetchWeekly from "./hooks/new/useNewFetchWeekly";
import { AgeGroupType } from "@/lib/interfaces/class.interface";

const CalendarComponent = ({
  userInfo,
}: {
  userInfo: UserType | ParentType;
}) => {
  const { calendarType, monthIndex } = useCalendarContext();
  const { selectedChild } = useSelectedChild();
  const [alertMissed, setAlertMissed] = useState(false);
  const [alertAsk, setAlertAsk] = useState(false);

  const ATTENDANCES = useAttendanceFinal({
    studentId: selectedChild?._id,
    currDate: new Date(),
    isParent: isParent(userInfo),
    monthIndex,
  });

  function checkArrayForDateInWeek(weekStart: Dayjs, weekEnd: Dayjs) {
    for (const item of ATTENDANCES?.data) {
      const itemDate = dayjs(item.date);
      if (isDateInWeek(itemDate, weekStart, weekEnd)) {
        return item; // Found an item in the array within the week
      }
    }
    return null; // No items found within the week
  }

  const currentWeek = useMemo(() => {
    const weeks = getWeeklyDatesInAMonth(monthIndex);
    let currentWeek: { start: Dayjs; end: Dayjs } | undefined;
    const today = dayjs();
    weeks.forEach((week) => {
      if (
        today.isSame(week.start) ||
        today.isSame(week.end) ||
        (today.isAfter(week.start) && today.isBefore(week.end))
      ) {
        currentWeek = week;
      }
    });
    return currentWeek;
  }, [monthIndex]);

  const attendancesOptions = useNewFetchWeekly({
    indexMonth: monthIndex,
    selectedWeek: currentWeek,
  });

  console.log(attendancesOptions);

  useEffect(() => {
    if (ATTENDANCES?.data && (!alertMissed || !alertAsk) && currentWeek) {
      const attendanceFound = checkArrayForDateInWeek(
        currentWeek.start,
        currentWeek.end
      );

      if (!attendanceFound) {
        if (dayjs().get("day") === 4 || attendancesOptions.data?.length === 0)
          setAlertMissed(true);
        else setAlertAsk(true);
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
      <MissedAlert
        open={alertMissed}
        openChange={(e) => setAlertMissed(e)}
        classLevel={selectedChild?.gradeLevel as AgeGroupType}
      />
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
