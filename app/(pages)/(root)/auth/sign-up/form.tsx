import React from "react";
import { SignUp } from "@clerk/nextjs";

import Image from "next/image";
import SVG1 from "@/public/svg/share.svg";

const RegisterForm = () => {
  return (
    <>
      {/* MOBILE */}
      <div className="flex items-center justify-center w-full h-full py-6">
        <div className="flex flex-col items-center justify-center w-full">
          <div className="flex flex-col items-center justify-center flex-1 mb-6">
            <h1 className="text-6xl font-semibold text-main-500">Join Now!</h1>
            <p className="">To let your child experience only the best.</p>
          </div>
          <SignUp />
        </div>
      </div>
      
      {/* DESKTOP */}
      <div className="hidden w-full h-screen grid-cols-7 bg-white xl:grid md:grid lg:grid">
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
    </>
  );
};

export default RegisterForm;
