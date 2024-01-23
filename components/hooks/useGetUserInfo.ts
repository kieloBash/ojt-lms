"use client";

import { fetchSingleParentClerkId } from "@/lib/actions/parent.action";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";

const useGetUserInfo = () => {
  const { user, isLoaded } = useUser();

  const { data, isLoading } = useQuery({
    enabled: isLoaded,
    queryKey: [`user-info`],
    queryFn: async () => {
      const data = await fetchSingleParentClerkId({
        clerkId: user?.id as string,
      });
      console.log(data);
      return data;
    },
  });
  return { data, isLoading };
};

export default useGetUserInfo;
