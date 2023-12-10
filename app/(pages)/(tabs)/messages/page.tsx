import Image from "next/image";
import React from "react";
import LOGO from "@/public/logo-2.svg";
import { NewChatModal } from "@/components/pages/messages/modals/new-chat";

const MessagesPage = () => {
  return (
    <section className="flex flex-col items-center justify-center flex-1">
      <div className="relative flex items-center justify-center w-full -mb-4 overflow-hidden">
        <Image src={LOGO} alt="Umonics Logo" width={500} />
      </div>
      <div className="mt-8 mb-2 text-4xl text-center">
        Start a conversation now!
      </div>
      <NewChatModal blank/>
    </section>
  );
};

export default MessagesPage;
