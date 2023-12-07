import { ParentType } from "@/lib/interfaces/parent.interface";
import { StudentType } from "@/lib/interfaces/student.interface";
import React from "react";

const AcceptedSection = ({
  userInfo,
  selectedChild,
}: {
  userInfo: ParentType;
  selectedChild: StudentType;
}) => {
  return (
    <>
      <section className="flex items-center justify-center flex-1 w-full">
        <span className="">Waiting for Payment</span>
      </section>
    </>
  );
};

export default AcceptedSection;
