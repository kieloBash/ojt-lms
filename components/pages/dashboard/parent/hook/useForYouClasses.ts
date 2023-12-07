"use client";

import { fetchForYouAttendances } from "@/lib/actions/attendance.action";
import { AgeGroupType } from "@/lib/interfaces/class.interface";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";

const useForYouClasses = (childId: string, ageGroup: AgeGroupType) => {
  const { data, isLoading } = useQuery({
    queryKey: [`classes:for-you-${childId}`, childId],
    queryFn: async () => {
      const year = dayjs().year();
      const month = dayjs().month();

      const { attendances } = await fetchForYouAttendances({
        year,
        month,
        ageGroup,
      });
      return { attendances };
    },
  });
  return { data: data?.attendances, isLoading };
};

export default useForYouClasses;
