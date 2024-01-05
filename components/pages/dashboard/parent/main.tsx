"use client";
import React from "react";
import { ParentType } from "@/lib/interfaces/parent.interface";
import { StudentType } from "@/lib/interfaces/student.interface";
import { useSelected } from "./non-accepted/context/useSelected";

// UI
import ChildSwitcher from "./child-switcher";
import NotAcceptedComponent from "./non-accepted/component";
import { useSelectedChild } from "@/components/global/context/useSelectedChild";
import StudentAcceptedScetion from "./accepted/main";
import SubscriptionMain from "../subscription/component";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const ParentMain = ({
  parent,
  manage_link,
}: {
  parent: ParentType;
  manage_link: string;
}) => {
  const { clear } = useSelected();
  const { setSelectedChild, selectedChild } = useSelectedChild();
  console.log(selectedChild);

  if (!selectedChild) return null;

  function handleSelectChild(sel: StudentType) {
    console.log(sel);
    setSelectedChild(sel);
    clear();
  }
  if (parent?.children?.length === 0 && parent?.children) return null;

  if (selectedChild.status === "Enrolling")
    return (
      <section className="flex flex-col w-full overflow-y-auto bg-white">
        <header className="flex flex-col items-center justify-center w-full bg-gradient-to-r from-blue-800 to-indigo-900 h-[16rem]">
          <div className="flex items-center justify-between w-full px-10 pb-8 -mt-10">
            <div className="flex gap-2">
              <h2 className="text-3xl font-bold tracking-tight text-white">
                Subscriptions
              </h2>
              <Link href={manage_link}>
                <Button>Billing</Button>
              </Link>
            </div>
            <ChildSwitcher
              parent={parent}
              students={parent?.children as StudentType[]}
              selectedChild={selectedChild}
              handleSelectChild={handleSelectChild}
            />
          </div>
          <h1 className="text-3xl font-bold text-white">
            {`🚀 Exclusive Learning Packages: An Unveiling of Value 🚀`}
          </h1>
          <p className="w-full max-w-[56rem] text-sm text-center text-white mt-6">
            {`We hope this newsletter finds you well. At The Umonics Method, we're
          delighted to share some exciting news that will shape your child's
          educational journey like never before!`}
          </p>
        </header>
        <SubscriptionMain />;
      </section>
    );

  return (
    <section className="flex flex-col w-full h-screen overflow-y-auto bg-white">
      <div className="flex items-center justify-between w-full p-10 py-5">
        <h2 className="text-3xl font-bold tracking-tight text-main-500">
          Dashboard
        </h2>
        <ChildSwitcher
          parent={parent}
          students={parent?.children as StudentType[]}
          selectedChild={selectedChild}
          handleSelectChild={handleSelectChild}
        />
      </div>
      <StudentAcceptedScetion userInfo={parent} selectedChild={selectedChild} />
    </section>
  );
};

export default ParentMain;
