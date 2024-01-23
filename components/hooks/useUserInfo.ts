"use client";

import { fetchSingleParentClerkId } from "@/lib/actions/parent.action";
import { ParentType } from "@/lib/interfaces/parent.interface";
import { UserType } from "@/lib/interfaces/user.interface";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

const useUserInfo = () => {
  // const [userInfo, setUserInfo] = useState<ParentType | UserType>();;

  // useEffect(() => {
  //   async function getParent() {
  //     if (!user || !isLoaded) return null;
  //     const parentInfo = await fetchSingleParentClerkId({
  //       clerkId: user.id,
  //     });
  //     console.log(parentInfo);
  //     return parentInfo;
  //   }

  //   if (user && !userInfo) {
  //     getParent().then((res) => {
  //       if (res) {
  //         setUserInfo(res);
  //       }
  //     });
  //   }
  // }, [user, userInfo]);

  const { data, isLoading } = useQuery({
    queryKey: [`userInfo`],
    queryFn: async () => {
      const { user, isLoaded } = useUser();
      console.log(user);
      if (!user) return null;
      console.log(user);

      console.log(user.id);
      const parentInfo = await fetchSingleParentClerkId({
        clerkId: user.id,
      });

      console.log(parentInfo);
      return parentInfo;
    },
  });

  console.log(data);

  return { data, isLoading };
};

export default useUserInfo;
