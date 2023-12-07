import LoginComponent from "@/components/pages/login/component";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

const SignInPage = async () => {
  const session = await getServerSession(authOptions);
  console.log(session);

  if (session?.user) redirect("/dashboard");
  
  return (
    <main className="">
      <LoginComponent />
    </main>
  );
};

export default SignInPage;
