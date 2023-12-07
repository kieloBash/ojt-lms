import React from "react";

// UI
import Image from "next/image";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ClassesType } from "@/lib/interfaces/class.interface";
import { Skeleton } from "@/components/ui/skeleton";
import { Clock4 } from "lucide-react";
import { convertTime } from "@/utils/helpers/convertTime";

interface ClassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  classCourse?: ClassesType;
  aspectRatio?: "portrait" | "square";
  width?: number;
  height?: number;
  skeleton?: boolean;
}

export function ClassCard({
  skeleton = false,
  classCourse,
  aspectRatio = "portrait",
  width,
  height,
  className,
  ...props
}: ClassCardProps) {
  if (skeleton && !classCourse)
    return (
      <div className={cn("space-y-3", className)} {...props}>
        <div className="overflow-hidden rounded-md">
          <Skeleton className="" />
          <Skeleton
            className={cn(
              "w-[250px] h-[330px] object-cover",
              aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
            )}
          />
        </div>

        <div className="space-y-1 text-sm">
          <Skeleton className="h-[16px] w-full" />
          <Skeleton className="h-[12px] w-1/2" />
        </div>
      </div>
    );
  if (classCourse) {
    const courseTime = convertTime(classCourse.startTime, classCourse.endTime);
    return (
      <div className={cn("space-y-3 group", className)} {...props}>
        <Link
          href={`/dashboard/new-enrollment/${classCourse?._id}`}
          className="overflow-hidden rounded-md"
        >
          <div className="overflow-hidden rounded-md">
            <Image
              src={classCourse?.image || ""}
              alt={classCourse.class}
              width={width}
              height={height}
              className={cn(
                "h-auto w-auto object-cover transition-all hover:scale-105 bg-main-500",
                aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
              )}
            />
          </div>
        </Link>
        <div className="space-y-1 text-lg">
          <h3 className="font-medium leading-none uppercase transition-colors group-hover:text-main-700">
            {classCourse?.class}
          </h3>
          <p className="text-xs text-muted-foreground">
            {/* {classCourse?.repeatedDays?.join(", ")} */}
          </p>
          <div className="flex items-center justify-start gap-2">
            <div className="p-1 rounded-full w-7 h-7 bg-main-50">
              <Clock4 className="w-full h-full text-main-700" />
            </div>
            <p className="text-sm text-muted-foreground">{courseTime}</p>
          </div>
        </div>
      </div>
    );
  }
}
