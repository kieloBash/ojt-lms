"use client";
import React, { FormEvent, useState } from "react";

// UI
import { Input } from "../ui/input";
import { Button } from "../ui/button";

// CLERK
import { useSignUp } from "@clerk/nextjs";

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
      <form className="w-full mt-8 space-y-4" onSubmit={onSubmit}>
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          type="email"
          placeholder="Enter your email here"
          className="h-16 text-xl"
        />
        <Button type="submit" className="h-16 px-10 text-2xl font-bold">
          Sign Up Now!
        </Button>
      </form>
      {pending && (
        <p className="mt-2">Please check your email and verify your account!</p>
      )}
    </>
  );
};

export default OptInForm;
