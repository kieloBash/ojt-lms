"use client";

import {
  fetchStudentAttendances,
  fetchTeacherAttendances,
} from "@/lib/actions/attendance.action";
import { AttendanceType } from "@/lib/interfaces/attendance.interface";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";

const useAttendanceFinal = ({
  studentId,
  currDate,
  isParent,
}: {
  studentId?: string;
  currDate: Date;
  isParent: boolean;
}) => {
  if (isParent && studentId) {
    const studentAtt = useQuery({
      queryKey: [`attendances:${studentId}`, studentId],
      queryFn: async () => {
        const attendances = await fetchStudentAttendances({ studentId });
        console.log(attendances);
        const filtered = attendances.filter(
          (a) => dayjs(a.date).get("month") === dayjs().get("month")
        );
        return filtered;
      },
      enabled: !!studentId,
    });
    return {
      data: studentAtt.data as AttendanceType[],
      isLoading: studentAtt.isLoading,
    };
  } else {
    const teacherAtt = useQuery({
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
      enabled: !!currDate,
    });
    return {
      data: teacherAtt.data as AttendanceType[],
      isLoading: teacherAtt.isLoading,
    };
  }
};

export default useAttendanceFinal;
