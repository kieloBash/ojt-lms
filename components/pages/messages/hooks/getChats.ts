"use client";

import { useQuery } from "@tanstack/react-query";
import { searchChatsAll } from "./action";

const useFetchChats = (
  pageNumber = 1,
  pageSize = 10,
  searchFilter = "",
  userId = ""
) => {
  const { data, isLoading } = useQuery({
    queryKey: [`chats`, pageNumber, pageSize, searchFilter],
    enabled: userId !== "",
    queryFn: async () => {
      const data = await searchChatsAll({
        pageNumber,
        pageSize,
        userId,
        search: searchFilter,
      });
      return data || [];
    },
    // refetchInterval: 60000,
  });
  return { data, isLoading };
};

export default useFetchChats;
