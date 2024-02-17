"use client";
import React from "react";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
import TooltipButton from "./TooltipButton";
import { signOut } from "next-auth/react";
import { useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const SignOutButton = () => {
  const { signOut } = useClerk();
  const router = useRouter();

  const handleSignOut = () => {
    signOut().then(() => {
      router.push("/auth/sign-in");
    });
  };
  return (
    <TooltipButton tooltip="Sign Out">
      <Button
        variant={"ghost"}
        className="w-10 h-10 p-2 rounded-full hover:bg-primary/50 group"
        onClick={handleSignOut}
      >
        <LogOut className="w-full h-full transition text-slate-400 group-hover:text-white" />
      </Button>
    </TooltipButton>
  );
};

export default SignOutButton;
