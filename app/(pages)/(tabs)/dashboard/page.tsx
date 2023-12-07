import LoadingPage from "@/components/loading";
import { ParentType } from "@/lib/interfaces/parent.interface";
import { UserType } from "@/lib/interfaces/user.interface";
import { authOptions } from "@/utils/authOptions";
import { isParent } from "@/utils/helpers/isParent";
import { getServerSession } from "next-auth";
import React from "react";

const DashboardPage = async () => {
  const session = await getServerSession(authOptions);
  const userInfo: UserType | ParentType = session?.user as UserType;
  if (!userInfo) return <LoadingPage />;

  console.log(userInfo);

  return (
    <section className="flex items-center justify-center flex-1">
      <h1 className="">
        Welcome, {userInfo.email} |{" "}
        {isParent(userInfo) ? "Parent" : userInfo.role}
      </h1>
    </section>
  );
};

export default DashboardPage;
