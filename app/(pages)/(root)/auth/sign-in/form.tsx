import React from "react";
import { SignIn } from "@clerk/nextjs";

import Image from "next/image";
import HOMEPAGE_PIC from "@/public/homepage-2.jpg";

const LoginForm = () => {
  return (
    <>
      {/* MOBILE */}
      <div className="flex items-center justify-center w-full h-full py-6 lg:hidden">
        <div className="flex flex-col items-center justify-center col-span-3">
          <h1 className="mb-6 text-4xl font-bold text-center uppercase">
            The <span className="text-main-500">Umonics</span> Method
          </h1>
          <SignIn />
        </div>
      </div>
      {/* DESKTOP */}
      <div className="hidden w-full h-screen grid-cols-7 gap-10 lg:grid">
        <div className="flex flex-col items-center justify-center col-span-3">
          <h1 className="mb-6 text-4xl font-semibold uppercase">
            The <span className="text-main-500">Umonics</span> Method
          </h1>
          <SignIn />
        </div>
        <div className="col-span-4 p-6">
          <div className="relative w-full h-full overflow-hidden bg-white border-2 shadow-2xl rounded-xl">
            <Image
              className=""
              src={HOMEPAGE_PIC}
              alt="homepage"
              fill
              objectFit={"cover"}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
