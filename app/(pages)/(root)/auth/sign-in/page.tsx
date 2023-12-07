import LoginComponent from "@/components/pages/login/login-component";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import React from "react";

const SignInPage = async () => {
  const session = await getServerSession(authOptions);
  console.log(session);
  return (
    <main className="">
      <LoginComponent />
    </main>
  );
};

export default SignInPage;
