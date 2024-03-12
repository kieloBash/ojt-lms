import React from "react";
import NavButtons from "./NavButtons";
import SignOutButton from "./SignOutButton";
import { authUserClerk } from "@/lib/actions/parent.action";

const LeftSidebar = async () => {
  const user = await authUserClerk();
  if (!user) return null;
  // console.log(user);
  return (
    <article className="fixed top-0 left-0 z-10 flex flex-col items-center justify-between flex-1 w-16 h-screen py-4 bg-main-700">
      <NavButtons user={user} />
      <SignOutButton />
    </article>
  );
};

export default LeftSidebar;
