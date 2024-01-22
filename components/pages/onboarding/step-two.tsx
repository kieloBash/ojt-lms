"use client";
import React from "react";

import Image from "next/image";
import SVG1 from "@/public/svg/thinking.svg";
import { ChildInfoForm } from "./cards/child-info";

const StepTwo = ({
  name,
  dob,
  setName,
  setDOB,
}: {
  name: string;
  dob: string;
  setName: (e: string) => void;
  setDOB: (e: string) => void;
}) => {
  return (
    <div className="relative flex flex-col items-center justify-between col-span-5 gap-8 pt-8">
      <div className="relative z-10 flex flex-col items-center justify-center flex-1 mb-32">
        <ChildInfoForm
          name={name}
          dob={dob}
          setName={(e: string) => setName(e)}
          setDOB={(e: string) => setDOB(e)}
        />
      </div>
      <div className="fixed bottom-0 left-0 h-[25rem] w-[71.5vw] overflow-hidden z-0">
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

export default StepTwo;
