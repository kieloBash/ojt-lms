"use client";

import { fetchSingleParentClerkId } from "@/lib/actions/parent.action";
import { ParentType } from "@/lib/interfaces/parent.interface";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";

const useUserInfo = () => {
  const { user, isLoaded } = useUser();

  const { data, isLoading } = useQuery({
    queryKey: [`userInfo`],
    queryFn: async () => {
      console.log(user);
      if (!user) return null;
      console.log(user);

      console.log(user.id);
      const parentInfo = await fetchSingleParentClerkId({
        clerkId: user.id,
      });

      console.log(parentInfo);
      return parentInfo as ParentType;
    },
  });

  console.log(data);

  return { data, isLoading };
};

export default useUserInfo;
