"use client";

import { fetchConnectionAttendances } from "@/lib/actions/attendance.action";
import { AgeGroupType } from "@/lib/interfaces/class.interface";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";

const useAvailAttendances = (ageGroup: AgeGroupType) => {
  const { data, isLoading } = useQuery({
    queryKey: [`materials:avail`, ageGroup],
    queryFn: async () => {
      const year = dayjs().year();
      const month = dayjs().month();

      const { attendances } = await fetchConnectionAttendances({
        year,
        month,
        ageGroup,
      });
      return { attendances };
    },
  });
  return { data: data?.attendances, isLoading };
};

export default useAvailAttendances;
