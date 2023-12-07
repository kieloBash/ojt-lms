"use client";

import { fetchParentTransactions } from "@/lib/actions/transaction.action";
import { ParentType } from "@/lib/interfaces/parent.interface";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

const useTransactions = () => {
  const { data: session } = useSession();
  const userInfo: ParentType = session?.user as ParentType;
  let transactionIds: string[] = [];

  transactionIds =
    (userInfo?.transactions || [])
      .filter((d) => d?._id !== undefined)
      .map((d) => {
        return d._id?.toString() || "";
      }) || [];

  const { data, isLoading } = useQuery({
    queryKey: [`transactions:${userInfo?._id}`, userInfo?._id],
    enabled: userInfo !== undefined && transactionIds.length > 0,
    queryFn: async () => {
      const { transactions } = await fetchParentTransactions({
        transactionIds,
      });

      console.log(transactions);
      return transactions;
    },
  });
  return { data, isLoading };
};

export default useTransactions;
