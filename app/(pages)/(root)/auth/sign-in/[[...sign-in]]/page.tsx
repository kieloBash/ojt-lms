// import LoginComponent from "@/components/pages/login/component";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";
import LoginForm from "../form";

const SignInPage = async () => {
  const { userId } = auth();
  // console.log(userId);

  if (userId) redirect("/dashboard");

  return (
    <main className="">
      <LoginForm />
      {/* <LoginComponent /> */}
    </main>
  );
};

export default SignInPage;
