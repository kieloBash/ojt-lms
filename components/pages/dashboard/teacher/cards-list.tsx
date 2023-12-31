"use client";
import React from "react";
import { AlbumArtwork } from "./card";
import useUpcomingAttendance from "./hooks/useUpcomingAttendance";
import { Skeleton } from "@/components/ui/skeleton";

const CardsList = () => {
  const attendances = useUpcomingAttendance(new Date());
  console.log(attendances);
  return (
    <div className="flex w-full pb-4 space-x-4">
      {attendances.isLoading || !attendances.data ? (
        <>
          {Array(10)
            .fill([])
            .map((_, index) => (
              <div className="flex flex-col gap-2" key={index}>
                <Skeleton className="w-[190px] h-[300px]" />
                <Skeleton className="w-[190px] h-[40px]" />
              </div>
            ))}
        </>
      ) : (
        <>
          {attendances.data.map((_, index) => (
            <AlbumArtwork
              key={index}
              album={_}
              className="w-[190px]"
              aspectRatio="portrait"
              width={200}
              height={300}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default CardsList;
