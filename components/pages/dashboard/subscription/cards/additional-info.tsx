import Image from "next/image";
import React from "react";

import SAMPLE1 from "@/public/sample-1.jpg";
import SAMPLE2 from "@/public/sample-2.jpg";
// import Footer from "./footer";

const AdditionalInfo = () => {
  return (
    <section className="flex flex-col items-center justify-center w-full gap-4 px-20 pt-8 mt-6">
      <h3 className="text-3xl font-bold text-center">
        Why the Ultimate Learning Experience ($57) is Your Best Choice:
      </h3>
      <div className="grid grid-cols-2 grid-flow-row gap-10 w-full max-w-[60rem] h-[30rem]">
        <div className="relative w-full h-full overflow-hidden aspect-square rounded-2xl">
          <Image
            className=""
            src={SAMPLE1}
            alt="sample1"
            fill
            objectFit={"cover"}
          />
        </div>
        <div className="relative w-full h-full overflow-hidden aspect-square rounded-2xl">
          <Image
            className=""
            src={SAMPLE2}
            alt="sample2"
            fill
            objectFit={"cover"}
          />
        </div>
        <div className="flex flex-col">
          <h4 className="font-bold">Tailored Options</h4>
          <p className="">
            {`The $57 option provides the most comprehensive and tailored
            resources for your child's education.`}
          </p>
        </div>
        <div className="flex flex-col">
          <h4 className="font-bold">Maximum Benefit</h4>
          <p className="">
            {`Ensuring you get the maximum benefit, with added features and
            resources to support your child's academic success.`}
          </p>
        </div>
      </div>
      <article className="flex flex-col w-full mt-10">
        <h1 className="text-xl font-bold text-center">
          {`📈 Secure Your Child's Learning Journey Today!`}
        </h1>
        <p className="text-center">
          {`Don't miss out on this opportunity to give your child the gift of
          enhanced learning and academic success. Our exclusive packages are
          designed to cater to varying needs, and the $57 option provides
          unparalleled value for your child's educational growth.`}
        </p>
      </article>
      <div className="flex items-center justify-between pt-10 text-sm font-light text-dark-1">
        <span className="">
          {` © Preschool Memory Enrichment Training Programme by The Umonics Method
            All Rights Reserved 2023`}
        </span>
      </div>
      {/* <Footer /> */}
    </section>
  );
};

export default AdditionalInfo;
