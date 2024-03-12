"use client";
import React from "react";

// VID
import { CldVideoPlayer } from "next-cloudinary";
import "next-cloudinary/dist/cld-video-player.css";

const VideoLanding = () => {
  return (
    <div className="w-full max-w-[30rem] max-h-[17rem] rounded-lg overflow-hidden relative">
      <CldVideoPlayer
        id="promotional-2"
        width={"1920"}
        height={"1080"}
        src="umonics/promotional-2"
        // logo={{
        //   imageUrl:
        //     "https://res.cloudinary.com/colbycloud-next-cloudinary/image/upload/v1676058142/assets/space-jelly-cosmo-helmet.svg",
        //   onClickUrl: "/",
        // }}
      />
    </div>
  );
};

export default VideoLanding;
