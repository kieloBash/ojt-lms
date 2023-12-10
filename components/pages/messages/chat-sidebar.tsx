"use client";
import React, { useState } from "react";
import ChatCard from "./card/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";
import useFetchChats from "./hooks/getChats";
import { UserType } from "@/lib/interfaces/user.interface";
import { ParentType } from "@/lib/interfaces/parent.interface";
import useDebounce from "@/components/hooks/useDebounce";
import { Skeleton } from "@/components/ui/skeleton";

const ChatSidebar = () => {
  const { data: session } = useSession();
  const userInfo = session?.user as UserType | ParentType;

  const [searchString, setSearchString] = useState("");
  const debouncedString = useDebounce(searchString, 500);
  const chats = useFetchChats(1, 10, debouncedString, userInfo?._id as string);

  return (
    <main className="flex flex-col flex-1 gap-1 px-2">
      <Input
        value={searchString}
        onChange={(e) => setSearchString(e.target.value)}
        type="text"
        className="w-full"
        placeholder="Search user..."
      />
      {chats.isLoading ? (
        <>
          <div className="w-full border rounded-md h-[calc(100vh-8.5rem)]">
            <div className="flex flex-col px-2">
              {Array(8)
                .fill([])
                .map((_, index) => (
                  <>
                    <Skeleton key={index} className="flex flex-1 h-20 px-2" />
                  </>
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
                      (d) => d._id !== userInfo._id
                    );
                    return (
                      <>
                        <ChatCard
                          key={index}
                          latestMessage={chat.latestMessage}
                          user={recipient}
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
