"use client";

import { fetchStudentAttendances } from "@/lib/actions/attendance.action";
import { useQuery } from "@tanstack/react-query";

const useStudentAttendances = (studentId: string) => {
  const { data, isLoading } = useQuery({
    queryKey: [`attendances:${studentId}`, studentId],
    queryFn: async () => {
      const attendances = await fetchStudentAttendances({ studentId });
      console.log(attendances);
      return attendances;
    },
  });
  return { data, isLoading };
};

export default useStudentAttendances;
