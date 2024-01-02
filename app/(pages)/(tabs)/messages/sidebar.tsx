import React from "react";

// UI
import ChatSidebar from "@/components/pages/messages/chat-sidebar";
import { NewChatModal } from "@/components/pages/messages/modals/new-chat";
import { authUserClerk } from "@/lib/actions/parent.action";
import { UserType } from "@/lib/interfaces/user.interface";
import { ParentType } from "@/lib/interfaces/parent.interface";

const MessageSidebar = async () => {
  const user = (await authUserClerk()) as UserType | ParentType;
  console.log(user);

  if (!user) return null;

  return (
    <article className="flex flex-col bg-white w-72">
      <header className="flex items-center justify-between w-full h-20 px-4">
        <h2 className="text-3xl font-bold tracking-tight text-main-500">
          Chats
        </h2>
        <NewChatModal user={user} />
      </header>
      <ChatSidebar />
    </article>
  );
};

export default MessageSidebar;
