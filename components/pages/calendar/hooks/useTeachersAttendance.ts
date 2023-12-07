"use client";

import { fetchTeacherAttendances } from "@/lib/actions/attendance.action";
import { useQuery } from "@tanstack/react-query";

const useTeacherAttendance = (currDate: Date) => {
  const { data, isLoading } = useQuery({
    queryKey: [
      `attendance:${currDate.getFullYear()}:${currDate.getMonth()}`,
      currDate.getMonth(),
    ],
    queryFn: async () => {
      const { attendances } = await fetchTeacherAttendances({
        year: currDate.getFullYear(),
        month: currDate.getMonth(),
      });
      return attendances;
    },
  });
  return { data, isLoading };
};

export default useTeacherAttendance;
