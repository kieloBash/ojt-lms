"use client";

import { fetchUsers } from "@/lib/actions/user.action";
import { useQuery } from "@tanstack/react-query";

const useFetchTemp = () => {
  const { data, isLoading } = useQuery({
    queryKey: [`users`],
    queryFn: async () => {
      const { users } = await fetchUsers();
      return users;
    },
  });
  return { data, isLoading };
};

export default useFetchTemp;
