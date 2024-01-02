import React from "react";
import NavButtons from "./NavButtons";
import SignOutButton from "./SignOutButton";
import { authUserClerk } from "@/lib/actions/parent.action";

const LeftSidebar = async () => {
  const user = await authUserClerk();
  if (!user) return null;
  console.log(user);

  return (
    <article className="flex flex-col items-center justify-between flex-1 py-4 bg-main-700">
      <NavButtons user={user} />
      <SignOutButton />
    </article>
  );
};

export default LeftSidebar;
