"use client";
import React from "react";

import Image from "next/image";
import SVG1 from "@/public/svg/share.svg";

const StepOne = () => {
  return (
    <div className="relative flex flex-col items-center justify-between col-span-5">
      <div className="flex items-center justify-center flex-1">
        <p className="w-full max-w-[34rem] text-lg text-center text-main-500">
          {`We are the Umonics Method here to lead your children's future to the
      next success.`}
        </p>
      </div>
      <div className="relative w-full overflow-hidden h-[20rem]">
        <Image
          className=""
          src={SVG1}
          alt="homepage"
          fill
          // objectFit={"cover"}
        />
      </div>
    </div>
  );
};

export default StepOne;
