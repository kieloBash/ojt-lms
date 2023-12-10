import React from "react";

// UI
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import TooltipButton from "@/components/global/TooltipButton";
import Image from "next/image";

const SingleMessage = ({
  side,
  date,
  content,
  today,
  senderImage,
  senderName,
  isImage = false,
}: {
  side: "Me" | "Other";
  date: Date;
  today: Date;
  content: string;
  senderImage: string;
  senderName: string;
  isImage: boolean;
}) => {
  const formattedDate =
    date.toDateString() === today.toDateString()
      ? date.toLocaleString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        })
      : date
          .toLocaleString("en-US", {
            day: "numeric",
            month: "short",
            hour: "2-digit",
            minute: "2-digit",
          })
          .replace(/\s/g, " ");
  return (
    <div
      className={`items-start gap-2 justify-start w-full ${
        side === "Other" ? "pr-10 flex" : "pl-10 flex flex-row-reverse"
      } h-fit`}
    >
      <div className="flex flex-col items-center justify-start w-10 h-full gap-2">
        <TooltipButton tooltip={formattedDate}>
          <Avatar>
            <AvatarImage src={senderImage} />
            <AvatarFallback className="text-white bg-main-400">
              {side === "Me" ? senderName[0] : "CN"}
            </AvatarFallback>
          </Avatar>
        </TooltipButton>
      </div>

      <div
        className={`flex flex-1 ${
          side === "Other" ? "pr-10 flex" : "pl-10 flex flex-row-reverse"
        }`}
      >
        <div className="max-w-md pl-2">
          {isImage ? (
            <>
              <div className="relative w-[13rem] p-2 h-[10rem] overflow-hidden border-2 rounded-lg">
                <Image src={content} fill alt="content" />
              </div>
            </>
          ) : (
            <>
              <p
                className={`p-2 rounded-md text-sm ${
                  side === "Other" ? "bg-slate-300" : "bg-main-300"
                }`}
              >
                <span className="">{content}</span>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleMessage;
