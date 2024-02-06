"use client";
import React, { useState } from "react";
import ChatCard from "./card/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import useFetchChats from "./hooks/getChats";
import useDebounce from "@/components/hooks/useDebounce";
import { Skeleton } from "@/components/ui/skeleton";
import { usePathname } from "next/navigation";
import useUserInfo from "@/components/hooks/useUserInfo";
import { Loader2 } from "lucide-react";

const ChatSidebar = () => {
  const { data: userInfo, isLoading } = useUserInfo();
  const pathname = usePathname();

  const [searchString, setSearchString] = useState("");
  const debouncedString = useDebounce(searchString, 500);
  const chats = useFetchChats(1, 10, debouncedString, userInfo?._id as string);
  // console.log(chats);

  if (isLoading)
    return (
      <div className="flex items-center justify-center w-full h-full">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );

    // console.log(chats.isLoading || chats?.data === undefined);

  return (
    <main className="flex flex-col flex-1 gap-1 px-2">
      <Input
        value={searchString}
        onChange={(e) => setSearchString(e.target.value)}
        type="text"
        className="w-full"
        placeholder="Search user..."
      />
      {chats.isLoading || chats?.data === undefined ? (
        <>
          <div className="w-full border rounded-md h-[calc(100vh-8.5rem)]">
            <div className="flex flex-col px-2 gap-1.5">
              {Array(2)
                .fill([])
                .map((_, index) => (
                  <Skeleton key={index} className="flex w-full h-20 px-2" />
                ))}
            </div>
          </div>
        </>
      ) : (
        <>
          {chats?.data?.length === 0 || chats?.data === undefined ? (
            <>
              <p className="w-full px-2 mt-4 text-center">No Chats found</p>
            </>
          ) : (
            <>
              <ScrollArea className="w-full border rounded-md h-[calc(100vh-8.5rem)]">
                <div className="px-2">
                  {chats?.data.map((chat, index) => {
                    const recipient = chat.users.find(
                      (d) => d._id !== userInfo?._id
                    );

                    return (
                      <>
                        <ChatCard
                          key={index}
                          chatId={chat._id as string}
                          latestMessage={chat.latestMessage}
                          user={recipient}
                          active={pathname.includes(chat?._id as string)}
                        />
                      </>
                    );
                  })}
                </div>
              </ScrollArea>
            </>
          )}
        </>
      )}
    </main>
  );
};

export default ChatSidebar;
