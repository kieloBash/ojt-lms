"use client";

import { ParentType } from "@/lib/interfaces/parent.interface";
import { UserType } from "@/lib/interfaces/user.interface";

import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { getUserOptions } from "./action";
import { isParent } from "@/utils/helpers/isParent";

const useFetchUserOptions = (searchFilter = "") => {
  const { data: session } = useSession();
  const userInfo = session?.user as UserType | ParentType;

  console.log(userInfo);

  const { data, isLoading } = useQuery({
    queryKey: [`chats-users`, searchFilter],
    enabled: userInfo?._id !== "",
    queryFn: async () => {
      const data = await getUserOptions({
        isParent: isParent(userInfo),
        searchFilter,
      });
      return data;
    },
  });

  return { data, isLoading };
};

export default useFetchUserOptions;
