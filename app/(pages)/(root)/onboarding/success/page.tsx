"use client";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { PageProps } from "@/lib/interfaces/page.props";

import Image from "next/image";
import SVG1 from "@/public/svg/vr.svg";
import { LevelFormCard } from "./card";
import { calculateAge } from "@/utils/helpers/calculateAge";
import { AgeGroupType } from "@/lib/interfaces/class.interface";
import { useUser } from "@clerk/nextjs";
import { createNewParent } from "@/lib/actions/parent.action";
import { ParentType } from "@/lib/interfaces/parent.interface";
import { StudentType } from "@/lib/interfaces/student.interface";
import { toast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

const OnboardingSuccessPage = ({ searchParams }: PageProps) => {
  // console.log(searchParams);

  const { user } = useUser();
  const [gradeLevel, setGradeLevel] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleRegisterComplete() {
    if (!user) return null;
    setIsLoading(true);

    const newDataParent: ParentType = {
      clerkId: user.id,
      name: user.username || "User",
      email: user.emailAddresses[0].emailAddress as string,
      isEnrolled: false,
    };

    const newDataStudent: StudentType = {
      name: searchParams.name as string,
      age: calculateAge(new Date(searchParams.dob + "")),
      gradeLevel: gradeLevel as AgeGroupType,
      parent: newDataParent,
      status: "Enrolling",
      classSchedule: [],
    };

    console.log(newDataParent,newDataStudent);

    const res = await createNewParent({
      newDataParent,
      newDataStudent,
      password: "default",
    });

    if (res.success) {
      toast({
        // variant: "success",
        title: "Successfully Registered!",
      });
      window.location.assign("/");
    } else {
      toast({
        variant: "destructive",
        title: "Email already exists",
      });
      setIsLoading(false);
    }
  }

  return (
    <article className="grid w-full h-screen grid-cols-7">
      <div className="relative flex flex-col items-center justify-between col-span-5 gap-8 pt-8">
        <div className="relative z-10 flex flex-col items-center justify-center flex-1 mb-32">
          <LevelFormCard
            child_bday={searchParams.dob as string}
            setGradeLevel={(e: string) => setGradeLevel(e)}
          />
        </div>
        <div className="fixed bottom-0 left-0 h-[28rem] w-[71.5vw] overflow-hidden z-0">
          <Image
            className=""
            src={SVG1}
            alt="homepage"
            fill
            // objectFit={"cover"}
          />
        </div>
      </div>
      <div className="flex flex-col items-center justify-between col-span-2 px-8 py-20 bg-main-500">
        <div className="flex flex-col items-center justify-start">
          <div className="font-black text-white">
            <div className="flex items-center justify-center p-4 rounded-full w-36 h-36 bg-main-700">
              <h2 className="text-8xl">{2}</h2>
            </div>
          </div>
          <h1 className="mt-8 text-5xl font-bold text-white">{"Finish!"}</h1>
          <p className="mt-3 text-sm text-center text-white">
            {"This is the last step to begin your child's journey to success!"}
          </p>
        </div>
        <Button
          disabled={gradeLevel === "" || isLoading}
          type="button"
          variant={"secondary"}
          onClick={handleRegisterComplete}
          className="w-56 h-16 text-lg font-semibold rounded-full"
        >
          Get Started{" "}
          {isLoading && <Loader2 className="w-5 h-5 ml-2 animate-spin" />}
        </Button>
      </div>
    </article>
  );
};

export default OnboardingSuccessPage;
