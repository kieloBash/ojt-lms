import AvatarProfile from "@/components/global/AvatarProfile";
import MessageDisplay from "@/components/pages/messages/display";
import { fetchSingleChat } from "@/components/pages/messages/hooks/action";
import { authUserClerk } from "@/lib/actions/parent.action";
import { PageProps } from "@/lib/interfaces/page.props";
import { isParent } from "@/utils/helpers/isParent";
import React from "react";
import MessageSidebar from "../sidebar";
import BackButton from "./back-btn";

const SingleMessagePage = async ({ params }: PageProps) => {
  const data = await fetchSingleChat({ chatId: params.chatId as string });
  const userInfo = await authUserClerk();
  if (!userInfo) return null;
  // console.log(userInfo);

  const recipient = data?.users.find((d) => d._id !== userInfo._id);

  return (
    <>
      <div className="hidden lg:block xl:block md:block">
        <MessageSidebar />
      </div>
      <section className="flex flex-col flex-1">
        <header className="flex items-center justify-between w-full h-20 px-1 lg:px-4 bg-main-700">
          <div className="flex items-center justify-start gap-1.5 lg:gap-4">
            <BackButton />
            <AvatarProfile
              name={recipient?.name || ""}
              profileURL={recipient?.profileURL || ""}
              size="md"
            />
            <div className="flex flex-col items-start justify-center -space-y-1">
              <h2 className="text-xl font-bold tracking-tight text-white capitalize lg:text-3xl">
                {recipient?.name}
              </h2>
              <p className="text-xs text-white capitalize lg:text-sm">
                {recipient?.role ? recipient?.role : "Parent"}
              </p>
            </div>
          </div>
          {isParent(userInfo) && (
            <p className="text-[0.6rem] lg:text-xs text-white lg:w-full lg:max-w-md max-w-[6rem] lg:text-right text-center">
              Active only within working hours from 8:00am-6:00pm
            </p>
          )}
        </header>
        <main className="flex flex-col flex-1">
          <MessageDisplay
            chatId={params.chatId as string}
            recipient={recipient}
          />
        </main>
      </section>
    </>
  );
};

export default SingleMessagePage;
