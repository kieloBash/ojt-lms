"use client";

import { useSelectedChild } from "@/components/global/context/useSelectedChild";
import { useCalendarContext } from "@/components/providers/CalendarProvider";
import { fetchWeeklyAttendances } from "@/lib/actions/attendance.action";
import { AgeGroupType } from "@/lib/interfaces/class.interface";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";

const useWeeklyAttendance = (indexMonth: number) => {
  const { monthIndex } = useCalendarContext();
  const { selectedChild } = useSelectedChild();
  const startOfMonth = dayjs().set("month", monthIndex).startOf("month");
  const currDate = dayjs(startOfMonth).set(
    "date",
    startOfMonth.date() + 7 * indexMonth
  );

  let StartOfWeek: dayjs.Dayjs;
  if (currDate.date() < 7) {
    StartOfWeek = currDate.startOf("month");
  } else {
    StartOfWeek = currDate.startOf("week");
  }

  let EndOfWeek: dayjs.Dayjs;
  if (currDate.date() > 25) {
    EndOfWeek = currDate.endOf("month");
  } else {
    EndOfWeek = currDate.endOf("week");
  }

  const { data, isLoading } = useQuery({
    queryKey: [`attendances:week-${indexMonth}`, indexMonth, currDate],
    queryFn: async () => {
      const attendances = await fetchWeeklyAttendances({
        StartOfWeek: StartOfWeek.toDate().toDateString(),
        EndOfWeek: EndOfWeek.set("date", EndOfWeek.date() + 1)
          .toDate()
          .toDateString(),
        ageGroup: selectedChild?.gradeLevel as AgeGroupType,
      });

      const today = dayjs();

      const filtered = attendances.attendances.filter((a) => {
        const attDate = dayjs(a.date);

        const closed =
          today.isAfter(attDate.set("date", attDate.date() + 3)) ||
          today.isAfter(attDate);

        if (!closed) {
          return a;
        }
      });

      return filtered;
    },
    enabled: indexMonth >= 0,
  });
  return { data, isLoading };
};

export default useWeeklyAttendance;
