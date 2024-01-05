"use client";

import { useSelectedChild } from "@/components/global/context/useSelectedChild";
import { fetchWeeklyAttendances } from "@/lib/actions/attendance.action";
import { AttendanceType } from "@/lib/interfaces/attendance.interface";
import { AgeGroupType } from "@/lib/interfaces/class.interface";
import { classClosedChecker } from "@/utils/helpers/calendar/helpers";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";

const useAttendancePerWeek = (
  weekIndex: number,
  currDate: dayjs.Dayjs,
  attendance: AttendanceType
) => {
  const { selectedChild } = useSelectedChild();
  const { data, isLoading } = useQuery({
    queryKey: [`attendances:week-${weekIndex}`, weekIndex, currDate],
    queryFn: async () => {
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
      console.log(
        StartOfWeek.set("date", StartOfWeek.get("date") - 1)
          .toDate()
          .toDateString()
      );
      console.log(currDate.startOf("month").toDate()
      .toDateString());
      console.log(currDate.date() < 7);
      console.log(currDate.date());
      
      // console.log(
      //   EndOfWeek.set("date", EndOfWeek.get("date") - 1)
      //     .toDate()
      //     .toDateString()
      // );

      const attendances = await fetchWeeklyAttendances({
        StartOfWeek: StartOfWeek.set("date", StartOfWeek.get("date") - 1)
          .toDate()
          .toDateString(),
        EndOfWeek: EndOfWeek.set("date", EndOfWeek.get("date") - 1)
          .toDate()
          .toDateString(),
        ageGroup: selectedChild?.gradeLevel as AgeGroupType,
      });

      // console.log(attendances.attendances);

      const filtered = attendances.attendances.filter((a) => {
        const attDate = dayjs(a.date);

        const closed = classClosedChecker({ dayLimit: 1, attDate });

        if (!closed && a._id !== attendance._id) {
          return a;
        }

        // return a
      });

      // console.log(filtered);

      return filtered;
    },
    enabled: weekIndex >= 0,
  });
  return { data, isLoading };
};

export default useAttendancePerWeek;
