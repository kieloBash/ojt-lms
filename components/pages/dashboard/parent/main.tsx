"use client";
import React, { useEffect, useState } from "react";
import { ParentType } from "@/lib/interfaces/parent.interface";
import { StudentType } from "@/lib/interfaces/student.interface";
import { useSelected } from "./non-accepted/context/useSelected";

// UI
import ChildSwitcher from "./child-switcher";
import NotAcceptedComponent from "./non-accepted/component";
import { useSelectedChild } from "@/components/global/context/useSelectedChild";
import StudentAcceptedScetion from "./accepted/main";
import SubscriptionMain from "../subscription/component";

const ParentMain = ({ parent }: { parent: ParentType }) => {
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

  if (selectedChild.status === "Enrolling") return <SubscriptionMain />;

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
