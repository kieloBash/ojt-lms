import AvatarProfile from "@/components/global/AvatarProfile";
import MessageDisplay from "@/components/pages/messages/display";
import { fetchSingleChat } from "@/components/pages/messages/hooks/action";
import { PageProps } from "@/lib/interfaces/page.props";
import { ParentType } from "@/lib/interfaces/parent.interface";
import { UserType } from "@/lib/interfaces/user.interface";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import React from "react";

const SingleMessagePage = async ({ params }: PageProps) => {
  const data = await fetchSingleChat({ chatId: params.chatId as string });
  const session = await getServerSession(authOptions);
  const userInfo = session?.user as UserType | ParentType;

  const recipient = data?.users.find((d) => d._id !== userInfo._id);

  return (
    <section className="flex flex-col flex-1">
      <header className="flex items-center justify-between w-full h-20 px-4 bg-main-700">
        <div className="flex items-center justify-start gap-4">
          <AvatarProfile
            name={recipient?.name || ""}
            profileURL={recipient?.profileURL || ""}
            size="lg"
          />
          <div className="flex flex-col items-start justify-center -space-y-1">
            <h2 className="text-3xl font-bold tracking-tight text-white capitalize">
              {recipient?.name}
            </h2>
            <p className="text-sm text-white capitalize">{recipient?.role ? recipient?.role : "Parent"}</p>
          </div>
        </div>
      </header>
      <main className="flex flex-col flex-1">
        <MessageDisplay
          chatId={params.chatId as string}
          recipient={recipient}
        />
      </main>
    </section>
  );
};

export default SingleMessagePage;
