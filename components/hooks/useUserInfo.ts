"use client";

import { fetchSingleParentClerkId } from "@/lib/actions/parent.action";
import { ParentType } from "@/lib/interfaces/parent.interface";
import { UserType } from "@/lib/interfaces/user.interface";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

const useUserInfo = () => {
  const { user, isLoaded } = useUser();
  const [userInfo, setUserInfo] = useState<ParentType | UserType>();

  console.log(user);
  console.log(userInfo);

  useEffect(() => {
    async function getParent() {
      if (!user || !isLoaded) return null;
      const parentInfo = await fetchSingleParentClerkId({
        clerkId: user.id,
      });
      console.log(parentInfo);
      return parentInfo;
    }

    if (user && !userInfo) {
      getParent().then((res) => {
        if (res) {
          setUserInfo(res);
        }
      });
    }
  }, [user, userInfo]);

  return userInfo;
};

export default useUserInfo;
