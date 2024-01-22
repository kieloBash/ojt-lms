"use client";
import React, { useState } from "react";

// UI
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import StepOne from "@/components/pages/onboarding/step-one";
import StepTwo from "@/components/pages/onboarding/step-two";

import { useRouter } from "next/navigation";
import dayjs from "dayjs";

const OnboardingPage = () => {
  const [page, setPage] = useState(0);
  const [name, setName] = useState("");
  const [dob, setDOB] = useState("");
  const router = useRouter();

  const PAGES = [
    <StepOne />,
    <StepTwo
      name={name}
      dob={dob}
      setName={(e: string) => setName(e)}
      setDOB={(e: string) => setDOB(e)}
    />,
  ];
  const TEXT = [
    {
      header: "Welcome!",
      p: "Explore our new Umonics Method Learning Management System!",
    },
    {
      header: "Start now!",
      p: "To start of, make sure to fill up the form of your child's information.",
    },
  ];

  function calculateAge(dob: Date) {
    var diff_ms = Date.now() - dob.getTime();
    var age_dt = new Date(diff_ms);

    return Math.abs(age_dt.getUTCFullYear() - 1970);
  }

  return (
    <article className="grid w-full h-screen grid-cols-7">
      {PAGES[page]}
      <div className="flex flex-col items-center justify-between col-span-2 px-8 py-20 bg-main-500">
        <div className="flex flex-col items-center justify-start">
          <div className="font-black text-white">
            <div className="flex items-center justify-center p-4 rounded-full w-36 h-36 bg-main-700">
              <h2 className="text-8xl">{page + 1}</h2>
            </div>
          </div>
          <h1 className="mt-8 text-5xl font-bold text-white">
            {TEXT[page].header}
          </h1>
          <p className="mt-3 text-sm text-center text-white">{TEXT[page].p}</p>
        </div>
        {page === 1 ? (
          <>
            <Button
              type="button"
              disabled={page === 1 && (name === "" || dob === "")}
              onClick={() => {
                if (calculateAge(new Date(dob))) {
                  router.push(`/onboarding/success?name=${name}&dob=${dob}`);
                } else {
                  router.push("/onboarding/fail");
                }
              }}
              variant={"secondary"}
              className="w-56 h-16 text-lg font-semibold rounded-full"
            >
              Next <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </>
        ) : (
          <>
            <Button
              type="button"
              onClick={() => {
                if (page + 1 < TEXT.length) setPage((prev) => prev + 1);
              }}
              variant={"secondary"}
              className="w-56 h-16 text-lg font-semibold rounded-full"
            >
              Next <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </>
        )}
      </div>
    </article>
  );
};

export default OnboardingPage;
