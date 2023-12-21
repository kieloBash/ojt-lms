import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { BookCheck, XCircle } from "lucide-react";
import { AttendanceType } from "@/lib/interfaces/attendance.interface";
import Link from "next/link";
import dayjs from "dayjs";
import { convertTime } from "@/utils/helpers/convertTime";
// import { useQueryClient } from "@tanstack/react-query";

interface SmallCardProps extends React.HTMLAttributes<HTMLDivElement> {
  album?: AttendanceType;
  aspectRatio?: "portrait" | "square";
  width?: number;
  height?: number;
}

export function SmallCard({
  album,
  aspectRatio = "portrait",
  width,
  height,
  className,
  ...props
}: SmallCardProps) {
  //   const queryClient = useQueryClient();
  return (
    <div className={cn("space-y-2", className)} {...props}>
      <ContextMenu>
        <ContextMenuTrigger>
          <div
            // key={index}
            className="overflow-hidden text-white rounded-md w-[140px] bg-main-600"
          >
            <div
              className={cn(
                "h-auto w-auto aspect-square object-cover transition-all hover:scale-105 flex items-center justify-center "
              )}
            >
              <h1 className="text-2xl font-bold cursor-default">{"PARROT"}</h1>
            </div>
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent className="w-48">
          <Link href={`https://google.com`} target="_blank">
            <ContextMenuItem className="cursor-pointer">
              <BookCheck className="w-4 h-4 mr-2" /> Release Materials
            </ContextMenuItem>
            <ContextMenuItem className="cursor-pointer">
              <XCircle className="w-4 h-4 mr-2" /> Remove Class
            </ContextMenuItem>
          </Link>
        </ContextMenuContent>
      </ContextMenu>
      <div className="text-xs">
        {/* <div className="flex items-center justify-between w-full">
          <h3 className="font-medium leading-none">{album.class.class}</h3>
          <h3 className="font-medium leading-none">{album.class.day}</h3>
        </div> */}
        <div className="flex items-center justify-between w-full">
          <p className="text-xs text-muted-foreground">
            {/* {convertTime("11:00", "13:00")} */}
          </p>
          <p className="text-xs font-medium text-black">
            {dayjs(new Date()).format("MM/DD/YYYY")}
          </p>
        </div>
      </div>
    </div>
  );
}
