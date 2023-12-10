"use client";

import { fetchMessages } from "@/lib/actions/message.action";
import { MessageType } from "@/lib/interfaces/message.interface";
import { useQuery } from "@tanstack/react-query";

const useFetchMessages = (pageNumber = 1, pageSize = 10, chatId = "") => {
  const { data, isLoading } = useQuery({
    queryKey: [`chats-messages:${chatId}`, pageNumber, pageSize],
    enabled: chatId !== "",
    queryFn: async () => {
      const { messages } = await fetchMessages({
        pageNumber,
        pageSize,
        chatId,
      });
      return { messages };
    },
    // refetchInterval: 60000,
  });
  const messages = data?.messages as MessageType[];
  return { data: messages || [], isLoading };
};

export default useFetchMessages;