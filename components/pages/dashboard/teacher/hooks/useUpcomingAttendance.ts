"use client";

import { fetchUpcomingAttendances } from "@/lib/actions/attendance.action";
import { useQuery } from "@tanstack/react-query";

const useUpcomingAttendance = (currDate: Date) => {
  const { data, isLoading } = useQuery({
    queryKey: [
      `attendance:upcoming-attendance`,
      currDate.getMonth(),
    ],
    queryFn: async () => {
      const { attendances } = await fetchUpcomingAttendances({
        year: currDate.getFullYear(),
        month: currDate.getMonth(),
      });
      return attendances;
    },
  });
  return { data, isLoading };
};

export default useUpcomingAttendance;
