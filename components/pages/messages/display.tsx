"use client";
import React, { useRef } from "react";
import useFetchMessages from "./hooks/getMessages";
import SendBox from "./send-box";
import { useSession } from "next-auth/react";
import { UserType } from "@/lib/interfaces/user.interface";
import { ParentType } from "@/lib/interfaces/parent.interface";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useQueryClient } from "@tanstack/react-query";
import { pusherClient } from "@/lib/pusher";
import { MessageType } from "@/lib/interfaces/message.interface";
import SingleMessage from "./card/single-message";

const MessageDisplay = ({
  chatId,
  recipient,
}: {
  chatId: string;
  recipient: UserType | ParentType | undefined;
}) => {
  const MessagesEndRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();

  const initialMessages = useFetchMessages(1, 20, chatId);
  const { data: session } = useSession();
  const userInfo = session?.user as UserType | ParentType;
  console.log(initialMessages);

  React.useEffect(() => {
    if (MessagesEndRef.current) {
      MessagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }

    pusherClient.subscribe(chatId);

    pusherClient.bind("incoming-message", (newMessage: MessageType) => {
      queryClient.invalidateQueries({
        queryKey: [`chats-messages:${chatId}`],
      });
      queryClient.invalidateQueries({
        queryKey: [`chats`],
      });
    });
    return () => {
      pusherClient.unsubscribe(chatId);
    };
  }, []);

  React.useEffect(() => {
    if (MessagesEndRef.current) {
      MessagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }

    return () => {};
  }, [initialMessages]);

  return (
    <>
      <div className="flex flex-col flex-1">
        {initialMessages?.data.length === 0 ? (
          <div className="w-full h-[calc(100vh-9rem)] flex flex-col justify-end items-center">
            <p className="w-full p-2 text-center">
              Send a message to start your conversation now!
            </p>
          </div>
        ) : (
          <>
            <ScrollArea className="w-full h-[calc(100vh-9rem)]">
              <div className="w-full p-1 h-[calc(100vh-9rem)] flex flex-col-reverse justify-start">
                {initialMessages?.data?.map((message: MessageType) => {
                  const side =
                    message.sender._id === userInfo?._id ? "Me" : "Other";

                  return (
                    <div className="pb-1" key={message._id}>
                      <SingleMessage
                        side={side}
                        date={message.createdAt}
                        today={new Date()}
                        content={message.content}
                        senderImage={
                          side === "Me"
                            ? userInfo?.profileURL || ""
                            : (recipient?.profileURL as string)
                        }
                        senderName={
                          side === "Me"
                            ? userInfo?.name || ""
                            : (recipient?.name as string)
                        }
                        isImage={false}
                      />
                    </div>
                  );
                })}
                <div ref={MessagesEndRef}></div>
              </div>
            </ScrollArea>
          </>
        )}
      </div>
      <SendBox senderId={userInfo?._id as string} chatId={chatId} />
    </>
  );
};

export default MessageDisplay;
