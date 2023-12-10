import React from "react";

// UI
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import dayjs from "dayjs";
import { UserType } from "@/lib/interfaces/user.interface";
import { ParentType } from "@/lib/interfaces/parent.interface";
import Link from "next/link";
import { MessageType } from "@/lib/interfaces/message.interface";

const ChatCard = ({
  user,
  latestMessage,
}: {
  user: UserType | ParentType | undefined;
  latestMessage: MessageType | null;
}) => {
  return (
    <Link href={`/messages/${user?._id}`}>
      <div className="flex flex-1 h-20 px-2 transition cursor-pointer hover:bg-slate-200">
        <div className="flex items-center w-full space-x-4">
          <Avatar>
            <AvatarImage src={user?.profileURL || ""} />
            <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="w-full">
            <div className="flex items-center justify-between w-full">
              <p className="text-sm font-medium leading-none capitalize">
                {user?.name}
              </p>
              <p className="text-xs text-muted-foreground line-clamp-1">
                {latestMessage
                  ? dayjs(latestMessage.createdAt).format("hh:mmA")
                  : ""}
              </p>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-1">
              {latestMessage ? latestMessage.content : "Say hi to new user!"}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ChatCard;
