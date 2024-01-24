import React from "react";
import { Card } from "@/components/ui/card";
import Image from "next/image";

import step1 from "@/public/steps/step1.png";
import step2 from "@/public/steps/step2.png";
import step3 from "@/public/steps/step3.png";

const HelpPage = () => {
  const STEPS = [
    {
      title:
        "To get started enrolling for a class, go to the Calendar tab located on the left side.",
      img: step1,
    },
    {
      title:
        "To get started enrolling for a class, go to the Calendar tab located on the left side.",
      img: step2,
    },
    {
      title:
        "To get started enrolling for a class, go to the Calendar tab located on the left side.",
      img: step3,
    },
  ];
  return (
    <section className="flex flex-col flex-1 w-full min-h-screen">
      <div className="flex items-center justify-between w-full p-10 py-5">
        <div className="flex flex-col">
          <h2 className="text-3xl font-bold tracking-tight text-main-500">
            Help Desk
          </h2>
          <p className="text-sm text-muted-foreground">
            {`Here you can view all the frequently asked questions, and some
            tutorials to get you started. You can also message the admin for more inquiries.`}
          </p>
        </div>
      </div>
      <div className="px-10 pb-10">
        <Card className="flex flex-col p-4">
          <h1 className="text-3xl font-bold">
            How to get started enrolling for a class.
          </h1>
          {STEPS.map((step, index) => {
            return (
              <div key={index} className="flex flex-col w-full mt-8">
                <h2 className="text-2xl font-semibold">Step {index + 1}</h2>
                <p className="mb-4">{step.title}</p>
                <section className="grid grid-cols-2 h-[60vh] gap-4">
                  <div className="relative col-span-2 overflow-hidden rounded-lg shadow">
                    <Image src={step.img} alt={`step${index + 1}`} fill />
                  </div>
                </section>
              </div>
            );
          })}
        </Card>
      </div>
      {/* <MaterialsMain /> */}
    </section>
  );
};

export default HelpPage;
