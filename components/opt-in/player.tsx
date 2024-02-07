"use client";
import React from "react";

// VID
import { CldVideoPlayer } from "next-cloudinary";
import "next-cloudinary/dist/cld-video-player.css";

import OptInForm from "./form";
import CountdownTimer from "./timer";

const VideoPlayer = () => {
  return (
    <section className="grid w-full h-[calc(100vh-6rem)] grid-cols-5 gap-20 px-20">
      <div className="flex flex-col items-center justify-center col-span-2 gap-4">
        <div className="w-full max-w-[30rem] h-[17rem]">
          <CldVideoPlayer
            id="sea-turtle"
            width={"1920"}
            height={"1080"}
            src="umonics/promotional"
            logo={{
              imageUrl:
                "https://res.cloudinary.com/colbycloud-next-cloudinary/image/upload/v1676058142/assets/space-jelly-cosmo-helmet.svg",
              onClickUrl: "/",
            }}
          />
        </div>
        <div className="flex flex-col items-center justify-center space-y-0">
          <div className="flex items-center justify-center gap-4">
            <p className="text-xl font-medium text-black">Limited Promo Time</p>
            <div className="flex items-center justify-center space-x-1 text-green-500">
              <h2 className="text-4xl text-red-400 line-through">$120</h2>
              <h2 className="text-5xl font-bold">$57</h2>
            </div>
          </div>
          <CountdownTimer duration={3 * 60 * 1000} />
        </div>
      </div>
      <div className="relative flex flex-col items-start justify-center col-span-3 pb-2">
        <h4 className="text-lg font-medium uppercase text-main-500">
          The Ultimate learning experience specialised for preschoolers
        </h4>
        <h1 className="mt-1 text-5xl font-extrabold">
          {`Unlock Your Child's Potential with The Umonics Method!`}
        </h1>
        <p className="mt-6 text-base text-medium">
          {`Transform your learning journey with our cutting-edge perschool memory training programme. By signing up today, you'll gain immediate access
          to exclusive courses, interactive modules, and a community of lifelong
          learners.`}
        </p>
        {/* <p className="mt-8 text-lg text-medium">
          Discover new learning materials{" "}
          <span className="font-bold text-main-500">specially made</span> for
          your child. We specialize in giving only the{" "}
          <span className="font-bold text-main-500">best experience</span> and
          platform for your child to grow!
        </p> */}
        <OptInForm />
      </div>
    </section>
  );
};

export default VideoPlayer;
