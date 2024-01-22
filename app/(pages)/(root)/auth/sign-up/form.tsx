import React from "react";
import { SignUp } from "@clerk/nextjs";

import Image from "next/image";
import SVG1 from "@/public/svg/share.svg";

const RegisterForm = () => {
  return (
    <div className="grid w-full h-screen grid-cols-7 bg-white">
      <div className="flex flex-col items-center justify-between col-span-4 pb-4 pl-4">
        <div className="flex flex-col items-center justify-center flex-1">
          <h1 className="text-6xl font-semibold text-main-500">Join Now!</h1>
          <p className="">To let your child experience only the best.</p>
        </div>
        <div className="relative w-full overflow-hidden h-72">
          <Image
            className=""
            src={SVG1}
            alt="homepage"
            fill
            objectFit={"cover"}
          />
        </div>
      </div>
      <div className="flex items-center justify-center col-span-3">
        <SignUp />
      </div>
    </div>
  );
};

export default RegisterForm;
