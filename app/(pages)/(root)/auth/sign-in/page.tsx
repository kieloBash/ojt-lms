import LoginComponent from "@/components/pages/login/component";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

const SignInPage = async () => {
  const { userId } = auth();
  console.log(userId);

  if (userId) redirect("/dashboard");

  return (
    <main className="">
      <LoginComponent />
    </main>
  );
};

export default SignInPage;
