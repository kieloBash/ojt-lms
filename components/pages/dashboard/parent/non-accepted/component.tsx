"use client";
import React from "react";

// BACKEND
import { ParentType } from "@/lib/interfaces/parent.interface";
import { StudentType } from "@/lib/interfaces/student.interface";
import useForYouClasses from "../hook/useForYouClasses";
import NonAcceptedBody from "./body";
import NonAcceptedHeader from "./header";

const NotAcceptedComponent = ({
  userInfo,
  selectedChild,
}: {
  userInfo: ParentType;
  selectedChild: StudentType;
}) => {
  const ForYou = useForYouClasses(
    selectedChild._id as string,
    selectedChild.gradeLevel
  );

  if (!userInfo?.children) return null;
  if (ForYou.isLoading) return null;

  return (
    <>
      <section className="flex flex-col flex-1">
        <NonAcceptedHeader />
        {ForYou.data && <NonAcceptedBody AllClassCourses={ForYou.data} />}
      </section>
    </>
  );
};

export default NotAcceptedComponent;
