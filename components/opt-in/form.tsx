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
import { toast } from "../ui/use-toast";
import Link from "next/link";

const OptInForm = () => {
  const [email, setEmail] = useState("");
  const [pending, setPending] = useState(false);
  const [pendingLoading, setPendingLoading] = useState(false);

  const { isLoaded, signUp, setActive } = useSignUp();

  async function onSubmit(e: FormEvent) {
    e.preventDefault();

    if (!isLoaded || email === "") {
      toast({
        description: "Please input your email first!",
        variant: "destructive",
      });
      return null;
    }

    try {
      console.log(email);
      setPendingLoading(true);
      await signUp.create({
        // username: "user",
        emailAddress: email,
        password: "Umonics1234",
      });
      window.location.assign("/onboarding");
      // const { startEmailLinkFlow, cancelEmailLinkFlow,  } =
      //   signUp.createEmailLinkFlow();

      // console.log("done");
      // setPending(true);
      // const res = await startEmailLinkFlow({
      //   redirectUrl: process.env.NEXT_PUBLIC_SITE_URL || "",
      // });

      // console.log(res);

      // if (res.status === "complete") {
      //   // sign up completed
      //   // console.log("complete");
      //   window.location.assign("/onboarding");
      // } else {
      //   // console.log("pending");
      //   setPendingLoading(false);

      //   // sign up still pending
      // }

      // // Cleanup
      // cancelEmailLinkFlow();
    } catch (error: any) {
      console.log(error);
      setPendingLoading(false);
      setPending(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col relative lg:mt-5 -mt-14 w-full max-w-lg"
    >
      <Input
        className="w-full h-12 border-4 border-green-600 rounded-lg shadow-md text-xl placeholder:text-green-600 text-center"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        name="email"
        type="email"
      />
      <Button
        type="submit"
        disabled={pendingLoading}
        className="bg-green-600 hover:bg-green-500 h-14 w-full text-2xl font-bold"
      >
        Get My $154 Voucher!{" "}
        {pendingLoading && <Loader2 className="w-8 h-8 ml-2 animate-spin" />}
      </Button>
      <Link
        href={""}
        className="hover:underline underline-offset-2 text-muted-foreground text-xs text-center mt-1"
      >
        *View Terms and Conditions
      </Link>
    </form>
  );
};

export default OptInForm;
