"use client";

import { useSelectedChild } from "@/components/global/context/useSelectedChild";
import { useCalendarContext } from "@/components/providers/CalendarProvider";
import { fetchWeeklyAttendances } from "@/lib/actions/attendance.action";
import { AgeGroupType } from "@/lib/interfaces/class.interface";
import { classClosedChecker } from "@/utils/helpers/calendar/helpers";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";

const useWeeklyAttendance = (
  indexMonth: number,
  prevDateAttendance?: Date | undefined
) => {
  const { monthIndex } = useCalendarContext();
  const { selectedChild } = useSelectedChild();
  const format = "MMM DD YYYY, dddd";

  const startOfMonth = dayjs().set("month", monthIndex).startOf("month");
  const currDate = dayjs(prevDateAttendance);
  // console.log(currDate.toDate().toDateString());

  let StartOfWeek: dayjs.Dayjs;
  if (currDate.date() < 7) {
    StartOfWeek = currDate.startOf("month");
    console.log(StartOfWeek.format(format));
  } else {
    if (currDate.day() === 6)
      StartOfWeek = dayjs().set(
        "date",
        currDate.startOf("week").get("date") + 6
      );
    else
      StartOfWeek = dayjs().set(
        "date",
        currDate.startOf("week").get("date") - 1
      );
    // console.log(StartOfWeek.format(format));
  }
  let EndOfWeek: dayjs.Dayjs;
  if (currDate.date() > 26) {
    EndOfWeek = currDate.endOf("month").day(5);
  } else {
    if (currDate.day() === 6)
      EndOfWeek = dayjs().set("date", currDate.endOf("week").get("date") + 6);
    else
      EndOfWeek = dayjs().set("date", currDate.endOf("week").get("date") - 1);

    // console.log(EndOfWeek.format(format));
  }

  // console.log(StartOfWeek.format("MMM DD YYYY, dddd"));
  // console.log(EndOfWeek.format("MMM DD YYYY, dddd"));
  // console.log(currDate.startOf("month").format("MMM DD YYYY, dddd"));

  const { data, isLoading } = useQuery({
    queryKey: [`attendances:week-${indexMonth}`, indexMonth, currDate],
    queryFn: async () => {
      const attendances = await fetchWeeklyAttendances({
        StartOfWeek: StartOfWeek.toDate().toDateString(),
        EndOfWeek: EndOfWeek.toDate().toDateString(),
        ageGroup: selectedChild?.gradeLevel as AgeGroupType,
      });

      // console.log(attendances.attendances);

      const filtered = attendances.attendances.filter((a) => {
        const attDate = dayjs(a.date);
        const today = dayjs();

        const closed =
          today.isAfter(attDate.set("date", attDate.date() + 2)) ||
          today.isAfter(attDate);

        if (!closed) {
          return a;
        }
      });

      // console.log(filtered);

      return filtered;
    },
    enabled: indexMonth >= 0,
  });
  return { data, isLoading };
};

export default useWeeklyAttendance;
