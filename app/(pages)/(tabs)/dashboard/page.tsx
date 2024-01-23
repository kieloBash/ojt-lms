import ParentComponent from "@/components/pages/dashboard/parent/component";
import TeacherSection from "@/components/pages/dashboard/teacher/main";
import { authUserClerk } from "@/lib/actions/parent.action";
import { PageProps } from "@/lib/interfaces/page.props";
import { isParent } from "@/utils/helpers/isParent";
import { auth } from "@clerk/nextjs";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import React from "react";
import { NewUserPopup } from "./new-popup";

export const metadata: Metadata = {
  title: "Umonics LMS | Dashboard",
  description: "Created by interns",
};

const DashboardPage = async ({ searchParams }: PageProps) => {
  const user = await authUserClerk();
  const { userId: clerkId } = auth();

  // console.log(searchParams);

  if (!user && clerkId) redirect("/onboarding");
  if (!user) redirect("/");

  return (
    <>
      {isParent(user) ? (
        <>
          {searchParams?.new === "true" ? <NewUserPopup /> : null}
          <ParentComponent
            userInfo={user}
            manage_link={""}
            sessionId={(searchParams.session_id as string) || ""}
            status={
              searchParams.success ? true : searchParams.fail ? false : false
            }
            studentId={(searchParams.studentId as string) || ""}
          />
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
