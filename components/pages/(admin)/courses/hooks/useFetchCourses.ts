"use client";
import { useQuery } from "@tanstack/react-query";
import { fetchAllClassesLevels } from "../actions/fetch";
import { ClassesType } from "@/lib/interfaces/class.interface";

const useFetchCourses = () => {
  const groupByAgeGroup = (array: any[]) => {
    return array.reduce((result, item) => {
      const key = item.ageGroup;
      if (!result[key]) {
        result[key] = [];
      }
      result[key].push(item);
      return result;
    }, {} as Record<string, any[]>);
  };

  const { data, isLoading } = useQuery({
    queryKey: ["courses:all"],
    queryFn: async () => {
      const { classes } = await fetchAllClassesLevels();
      const groupedByAgeGroup = groupByAgeGroup(classes);

      // Sort each ageGroup by day and startTime
      for (const ageGroup in groupedByAgeGroup) {
        groupedByAgeGroup[ageGroup].sort((a: ClassesType, b: ClassesType) => {
          if (a.day === b.day) {
            return a.startTime.localeCompare(b.startTime);
          }
          return a.day.localeCompare(b.day);
        });
      }
      return groupedByAgeGroup;
    },
  });
  return { data, isLoading };
};

export default useFetchCourses;
