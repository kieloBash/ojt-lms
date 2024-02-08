"use client";
import React, { FormEvent, useState } from "react";

// UI
import { Input } from "../ui/input";
import { Button } from "../ui/button";

// CLERK
import { useSignUp } from "@clerk/nextjs";
import Image from "next/image";

import ARROW from "@/public/arrow1.png";
import { Loader2 } from "lucide-react";

const OptInForm = () => {
  const [email, setEmail] = useState("");
  const [pending, setPending] = useState(false);
  const [pendingLoading, setPendingLoading] = useState(false);

  const { isLoaded, signUp, setActive } = useSignUp();

  async function onSubmit(e: FormEvent) {
    e.preventDefault();

    if (!isLoaded || email === "") return null;

    try {
      setPendingLoading(true);
      await signUp.create({
        username: "user",
        emailAddress: email,
        password: "Umonics1234",
      });

      const { startEmailLinkFlow, cancelEmailLinkFlow,  } =
        signUp.createEmailLinkFlow();

      console.log("done");
      setPending(true);
      const res = await startEmailLinkFlow({
        redirectUrl: process.env.NEXT_PUBLIC_SITE_URL || "",
      });

      console.log(res);

      if (res.status === "complete") {
        // sign up completed
        // console.log("complete");
        window.location.assign("/onboarding");
      } else {
        // console.log("pending");
        setPendingLoading(false);

        // sign up still pending
      }

      // Cleanup
      cancelEmailLinkFlow();
    } catch (error: any) {
      console.log(error);
      setPendingLoading(false);
      setPending(false);
    }
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
            disabled={pendingLoading}
          >
            Sign Up Now!{" "}
            {pendingLoading && (
              <Loader2 className="w-8 h-8 ml-2 animate-spin" />
            )}
          </Button>
        </div>
      </form>
      {pending && (
        <p className="mt-2">
          {`Please check your email and verify your account! If no email hasn't been
          sent, please wait a few minutes or refresh this page.`}
        </p>
      )}
    </>
  );
};

export default OptInForm;
