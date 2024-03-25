"use client";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const BackButton = () => {
  const router = useRouter();
  return (
    <Button
      variant={"ghost"}
      className="block w-10 h-10 p-1 text-white lg:hidden xl:hidden md:hidden"
      onClick={() => {
        router.back();
      }}
    >
      <ChevronLeft className="w-full h-full" />
    </Button>
  );
};

export default BackButton;
