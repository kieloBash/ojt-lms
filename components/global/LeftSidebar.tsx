import React from "react";
import NavButtons from "./NavButtons";
import SignOutButton from "./SignOutButton";
import { fetchSingleParentId } from "@/lib/actions/parent.action";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import { UserType } from "@/lib/interfaces/user.interface";
import { ParentType } from "@/lib/interfaces/parent.interface";
import { isParent } from "@/utils/helpers/isParent";

const LeftSidebar = async () => {
  const session = await getServerSession(authOptions);
  const user = session?.user as UserType | ParentType;
  console.log(user);
  let userInfo = user;

  if (isParent(user))
    userInfo = await fetchSingleParentId({ _id: user._id as string });

  if (!userInfo) return null;

  console.log(userInfo);

  return (
    <article className="flex flex-col items-center justify-between flex-1 py-4 bg-main-700">
      <NavButtons user={userInfo} />
      <SignOutButton />
    </article>
  );
};

export default LeftSidebar;
