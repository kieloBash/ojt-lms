"use client";

import { fetchRelatedClasses } from "@/lib/actions/class.action";
import { AgeGroupType } from "@/lib/interfaces/class.interface";
import { useQuery } from "@tanstack/react-query";

const useRelatedClasses = (grade: AgeGroupType, classId: string) => {
  const { data, isLoading } = useQuery({
    queryKey: [`classes:related`, grade, classId],
    queryFn: async () => {
      const { classes } = await fetchRelatedClasses([grade], classId);
      return { classes };
    },
  });
  return { data: data?.classes, isLoading };
};

export default useRelatedClasses;
