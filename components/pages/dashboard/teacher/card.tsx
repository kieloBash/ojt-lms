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
import { ArrowDownLeft, CheckCircle, XCircle } from "lucide-react";
import { AttendanceType } from "@/lib/interfaces/attendance.interface";
import { convertTime } from "@/utils/helpers/convertTime";
import Link from "next/link";
import dayjs from "dayjs";
import { StudentType } from "@/lib/interfaces/student.interface";
import { Button } from "@/components/ui/button";
import {
  updateStudentNo,
  updateStudentYes,
} from "@/lib/actions/attendance.action";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

interface AlbumArtworkProps extends React.HTMLAttributes<HTMLDivElement> {
  album: AttendanceType;
  aspectRatio?: "portrait" | "square";
  width?: number;
  height?: number;
}

export function AlbumArtwork({
  album,
  aspectRatio = "portrait",
  width,
  height,
  className,
  ...props
}: AlbumArtworkProps) {
  const queryClient = useQueryClient();
  return (
    <div className={cn("space-y-3", className)} {...props}>
      <ContextMenu>
        <ContextMenuTrigger>
          <div className="overflow-hidden rounded-md bg-main-600">
            <Image
              src={""}
              alt={album.class.class}
              width={width}
              height={height}
              className={cn(
                "h-auto w-auto object-cover transition-all hover:scale-105",
                aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
              )}
            />
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent className="w-48">
          <ContextMenuSub>
            <ContextMenuSubTrigger>View Attendance</ContextMenuSubTrigger>
            <ContextMenuSubContent className="w-48">
              {album.classParticipants?.map((s) => {
                const attending = album.studentsPresent?.find(
                  (d: StudentType) => d._id === s._id
                );

                return (
                  <ContextMenuItem key={s._id} className="capitalize">
                    {attending !== undefined ? (
                      <>
                        <Button
                          type="button"
                          onClick={async () => {
                            const res = await updateStudentNo({
                              studentId: s._id as string,
                              attendanceId: album._id as string,
                            });
                            if (res) {
                              queryClient.invalidateQueries({
                                queryKey: [`attendance:upcoming-attendance`],
                              });
                              // window.location.reload();
                            }
                          }}
                          variant={"ghost"}
                          className="w-5 h-5 p-0 mr-2 rounded-full"
                        >
                          <CheckCircle className="text-green-600 transition hover:text-green-300" />
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          type="button"
                          onClick={async () => {
                            const res = await updateStudentYes({
                              studentId: s._id as string,
                              attendanceId: album._id as string,
                            });
                            if (res) {
                              queryClient.invalidateQueries({
                                queryKey: [`attendance:upcoming-attendance`],
                              });
                              // window.location.reload();
                            }
                          }}
                          variant={"ghost"}
                          className="w-5 h-5 p-0 mr-2 rounded-full"
                        >
                          <XCircle className="text-red-600 transition hover:text-red-300" />
                        </Button>
                      </>
                    )}
                    {s.name}
                  </ContextMenuItem>
                );
              })}
            </ContextMenuSubContent>
          </ContextMenuSub>
          <ContextMenuSeparator />
          <Link href={`https://google.com`} target="_blank">
            <ContextMenuItem className="cursor-pointer">
              <ArrowDownLeft className="w-4 h-4 mr-2" /> View Link
            </ContextMenuItem>
          </Link>
        </ContextMenuContent>
      </ContextMenu>
      <div className="space-y-1 text-sm">
        <div className="flex items-center justify-between w-full">
          <h3 className="font-medium leading-none">{album.class.class}</h3>
          <h3 className="font-medium leading-none">{album.class.day}</h3>
        </div>
        <div className="flex items-center justify-between w-full">
          <p className="text-xs text-muted-foreground">
            {convertTime(album.startTime, album.endTime)}
          </p>
          <p className="text-xs text-muted-foreground">
            {dayjs(album.date).format("MM/DD/YYYY")}
          </p>
        </div>
      </div>
    </div>
  );
}
