"use client";
import React, { FormEvent, useState } from "react";

// UI
import { Input } from "../ui/input";
import { Button } from "../ui/button";

// CLERK
import { useSignUp } from "@clerk/nextjs";
import Image from "next/image";

import ARROW from "@/public/arrow1.png";

const OptInForm = () => {
  const [email, setEmail] = useState("");
  const [pending, setPending] = useState(false);

  const { isLoaded, signUp, setActive } = useSignUp();

  async function onSubmit(e: FormEvent) {
    e.preventDefault();

    if (!isLoaded) return null;

    // console.log(email);

    try {
      setPending(true);
      await signUp.create({
        username: "User",
        emailAddress: email,
        password: "Umonics1234",
      });

      const { startEmailLinkFlow, cancelEmailLinkFlow } =
        signUp.createEmailLinkFlow();

      const res = await startEmailLinkFlow({
        redirectUrl: process.env.NEXT_PUBLIC_SITE_URL || "",
      });

      console.log(res);

      if (res.status === "complete") {
        // sign up completed
        console.log("complete");
        window.location.assign("/onboarding");
      } else {
        console.log("pending");
        // sign up still pending
      }

      // Cleanup
      cancelEmailLinkFlow();

      console.log(signUp);
    } catch (error: any) {}
  }

  return (
    <>
      <form className="relative w-full mt-10 space-y-4" onSubmit={onSubmit}>
        <div className="absolute -right-40 rotate-[-45deg] h-[8rem] w-64 -top-20">
          <Image src={ARROW} alt="arrow" fill objectFit={"cover"} />
        </div>

        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          type="email"
          placeholder="Enter your email here"
          className="h-16 text-xl border-4 shadow-md border-main-500"
        />
        <div className="flex items-center justify-start w-full gap-8">
          <Button
            type="submit"
            className="h-20 px-10 text-3xl font-bold shadow-md"
          >
            Sign Up Now!
          </Button>
        </div>
      </form>
      {pending && (
        <p className="mt-2">Please check your email and verify your account!</p>
      )}
    </>
  );
};

export default OptInForm;
