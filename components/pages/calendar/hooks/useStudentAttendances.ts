"use client";

import { fetchStudentAttendances } from "@/lib/actions/attendance.action";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";

const useStudentAttendances = (studentId: string) => {
  const { data, isLoading } = useQuery({
    queryKey: [`attendances:${studentId}`, studentId],
    queryFn: async () => {
      const attendances = await fetchStudentAttendances({ studentId });
      console.log(attendances);
      const filtered = attendances.filter(
        (a) => dayjs(a.date).get("month") === dayjs().get("month")
      );
      return filtered;
    },
  });
  return { data, isLoading };
};

export default useStudentAttendances;
