"use client";

import { fetchSingleParentId } from "@/lib/actions/parent.action";
import { useQuery } from "@tanstack/react-query";

const useSingleParent = (_id: string) => {
  const { data, isLoading } = useQuery({
    queryKey: [`parent-${_id}`],
    queryFn: async () => {
      const parent = await fetchSingleParentId({ _id });
      return { parent };
    },
  });
  return { data: data?.parent, isLoading };
};

export default useSingleParent;
