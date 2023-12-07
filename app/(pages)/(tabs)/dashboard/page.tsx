import ParentComponent from "@/components/pages/dashboard/parent/component";
import TeacherSection from "@/components/pages/dashboard/teacher/main";
import { PageProps } from "@/lib/interfaces/page.props";
import { UserType } from "@/lib/interfaces/user.interface";
import { authOptions } from "@/utils/authOptions";
import { isParent } from "@/utils/helpers/isParent";
import { getServerSession } from "next-auth";
import React from "react";

const DashboardPage = async ({ searchParams }: PageProps) => {
  const session = await getServerSession(authOptions);
  const user: UserType = session?.user as UserType;
  if (!user) return null;

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
