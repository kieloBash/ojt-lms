"use client";
import { useQuery } from "@tanstack/react-query";

import { useSelectedChild } from "@/components/global/context/useSelectedChild";
import { useCalendarContext } from "@/components/providers/CalendarProvider";
import { fetchWeeklyAttendances } from "@/lib/actions/attendance.action";
import { AttendanceType } from "@/lib/interfaces/attendance.interface";
import { AgeGroupType } from "@/lib/interfaces/class.interface";
import dayjs, { Dayjs } from "dayjs";

const useNewFetchWeekly = ({
  indexMonth,
  selectedWeek,
}: {
  indexMonth: number;
  prevDateAttendance?: Date | undefined;
  selectedWeek:
    | {
        start: Dayjs;
        end: Dayjs;
      }
    | undefined;
}) => {
  const format = "MM/DD";
  const { selectedChild } = useSelectedChild();
  const { data, isLoading } = useQuery({
    queryKey: [
      `attendances:week-${selectedWeek?.start.format(
        format
      )}-${selectedWeek?.end.format(format)}|${indexMonth}`,
      indexMonth,
      selectedWeek?.start,
    ],
    queryFn: async () => {
      if (!selectedWeek) return;
      const attendances = await fetchWeeklyAttendances({
        StartOfWeek: selectedWeek.start.toDate().toDateString(),
        EndOfWeek: selectedWeek.end.toDate().toDateString(),
        ageGroup: selectedChild?.gradeLevel as AgeGroupType,
      });

      const filtered: AttendanceType[] = attendances.attendances.filter((a) => {
        const attDate = dayjs(a.date);
        const today = dayjs();
        const filter = attDate.set("date", attDate.date() - 1);

        const closed = today.isAfter(filter) || today.isAfter(attDate);

        if (!closed) {
          return a;
        }
      });

      return filtered;
    },
    enabled: indexMonth >= 0 && selectedWeek != undefined,
  });
  return { data, isLoading };
};

export default useNewFetchWeekly;
