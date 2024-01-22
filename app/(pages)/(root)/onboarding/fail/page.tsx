import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import SignOutButtonFail from "./btn";

const OnboardingFailPage = () => {
  return (
    <article className="flex flex-col items-center justify-center w-full h-screen bg-main-500">
      <h1 className="mb-8 text-6xl font-medium text-white">Oops!</h1>
      <p className="w-full max-w-2xl text-center text-white">
        {`Sorry for the inconvinence, we don't have any courses available for your child at the
        moment. At the meantime you can visit our homepage to view more courses or register another child that is 2-6 years of age.
        Thank you!`}
      </p>
      <div className="flex gap-2 mt-6">
        <SignOutButtonFail />
        <Link href={"/onboarding"}>
          <Button className="transition border border-white hover:bg-main-400">
            Add new child information
          </Button>
        </Link>
      </div>
    </article>
  );
};

export default OnboardingFailPage;
