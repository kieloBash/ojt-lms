"use client";
import React from "react";
import { AlbumArtwork } from "./card";
import useUpcomingAttendance from "./hooks/useUpcomingAttendance";
import { Skeleton } from "@/components/ui/skeleton";

const CardsList = () => {
  const attendances = useUpcomingAttendance(new Date());
  return (
    <div className="flex w-full pb-4 space-x-4">
      {attendances.isLoading || !attendances.data ? (
        <>
          {Array(10)
            .fill([])
            .map((_, index) => (
              <div className="flex flex-col gap-2" key={index}>
                <Skeleton className="w-[250px] h-[330px]" />
                <Skeleton className="w-[250px] h-[40px]" />
              </div>
              //   <AlbumArtwork
              //     key={index}
              //     album={_}
              //     className="w-[250px]"
              //     aspectRatio="portrait"
              //     width={250}
              //     height={330}
              //   />
            ))}
        </>
      ) : (
        <>
          {attendances.data.map((_, index) => (
            <AlbumArtwork
              key={index}
              album={_}
              className="w-[250px]"
              aspectRatio="portrait"
              width={250}
              height={330}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default CardsList;
