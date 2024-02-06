"use client";

import { fetchSingleParentClerkId } from "@/lib/actions/parent.action";
import { ParentType } from "@/lib/interfaces/parent.interface";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";

const useUserInfo = () => {
  const { user, isLoaded } = useUser();
  console.log(user);

  const { data, isLoading } = useQuery({
    queryKey: [`userInfo`],
    enabled: user !== undefined,
    queryFn: async () => {
      if (!user) return null;

      const parentInfo = await fetchSingleParentClerkId({
        clerkId: user.id,
      });

      return parentInfo as ParentType;
    },
  });

  console.log(data);

  return { data, isLoading };
};

export default useUserInfo;
