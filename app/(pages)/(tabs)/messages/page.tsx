import Image from "next/image";
import React from "react";
import LOGO from "@/public/logo-2.svg";
import { NewChatModal } from "@/components/pages/messages/modals/new-chat";
import { authUserClerk } from "@/lib/actions/parent.action";
import { UserType } from "@/lib/interfaces/user.interface";
import { ParentType } from "@/lib/interfaces/parent.interface";
import { Loader2 } from "lucide-react";
import MessageSidebar from "./sidebar";

const MessagesPage = async () => {
  const user = (await authUserClerk()) as UserType | ParentType;

  if (!user)
    return (
      <section className="flex items-center justify-center w-full h-full">
        <Loader2 className="w-6 h-6 animate-spin" />
      </section>
    );

  return (
    <>
      <MessageSidebar />
      <section className="flex-col items-center justify-center flex-1 hidden lg:flex xl:flex md:flex">
        <div className="relative flex items-center justify-center w-full -mb-4 overflow-hidden">
          <Image src={LOGO} alt="Umonics Logo" width={500} />
        </div>
        <div className="mt-8 mb-2 text-4xl text-center">
          Start a conversation now!
        </div>
        <NewChatModal blank user={user} />
      </section>
    </>
  );
};

export default MessagesPage;
