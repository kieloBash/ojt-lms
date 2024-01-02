import ParentComponent from "@/components/pages/dashboard/parent/component";
import TeacherSection from "@/components/pages/dashboard/teacher/main";
import { authUserClerk } from "@/lib/actions/parent.action";
import { PageProps } from "@/lib/interfaces/page.props";
import { isParent } from "@/utils/helpers/isParent";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import React from "react";

export const metadata: Metadata = {
  title: "Umonics LMS | Dashboard",
  description: "Created by interns",
};

const DashboardPage = async ({ searchParams }: PageProps) => {
  const user = await authUserClerk();
  if (!user) return redirect("/");
  console.log(user);

  return (
    <>
      {isParent(user) ? (
        <>
          <ParentComponent userInfo={user} />
        </>
      ) : (
        <>
          <TeacherSection userInfo={user} />
        </>
      )}
    </>
  );
};
export default DashboardPage;
