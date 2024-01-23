"use client";
import React from "react";

// VID
import { CldVideoPlayer } from "next-cloudinary";
import "next-cloudinary/dist/cld-video-player.css";

import OptInForm from "./form";

const VideoPlayer = () => {
  return (
    <section className="grid w-full h-[calc(100vh-6rem)] grid-cols-5 gap-20 px-20">
      <div className="flex items-center justify-center col-span-2">
        <div className="w-full h-[17rem]">
          <CldVideoPlayer
            id="sea-turtle"
            width={"1920"}
            height={"1080"}
            src="umonics/sample1"
            logo={{
              imageUrl:
                "https://res.cloudinary.com/colbycloud-next-cloudinary/image/upload/v1676058142/assets/space-jelly-cosmo-helmet.svg",
              onClickUrl: "/",
            }}
          />
        </div>
      </div>
      <div className="flex flex-col items-start justify-center col-span-3">
        <h4 className="text-base font-medium uppercase text-main-500">
          The Ultimate learning experience specialized for your child
        </h4>
        <h1 className="mt-1 text-6xl font-extrabold">
          The Umonics Method Learning Management System
        </h1>
        <p className="mt-8 text-lg text-medium">
          Discover new learning materials{" "}
          <span className="font-bold text-main-500">specially made</span> for
          your child. We specialize in giving only the{" "}
          <span className="font-bold text-main-500">best experience</span> and
          platform for your child to grow!
        </p>
        <OptInForm />
      </div>
    </section>
  );
};

export default VideoPlayer;
