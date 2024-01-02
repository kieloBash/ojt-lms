"use client";

import { ParentType } from "@/lib/interfaces/parent.interface";
import { UserType } from "@/lib/interfaces/user.interface";

import { useQuery } from "@tanstack/react-query";
import { getUserOptions } from "./action";
import { isParent } from "@/utils/helpers/isParent";

const useFetchUserOptions = ({
  searchFilter = "",
  userInfo,
}: {
  searchFilter: string;
  userInfo: ParentType | UserType | undefined;
}) => {
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
