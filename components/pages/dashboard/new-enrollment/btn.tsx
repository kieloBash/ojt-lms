"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowUpRightSquareIcon } from "lucide-react";
import axios from "axios";
import { usePathname } from "next/navigation";
import Link from "next/link";

const StripeButton = ({ classId }: { classId: string }) => {
  const pathname = usePathname();
  async function handleSubscribe() {
    // try {
    //   const res = await axios.post(`/api/classes/${classId}/checkout`);
    //   window.location.assign(res.data.url);
    // } catch (error) {
    //   console.log(error);
    // }
  }
  return (
    <Link href={`${pathname}/subscription`} className="w-full">
      <Button className="w-full py-8 text-2xl font-bold" onClick={handleSubscribe}>
        Enroll Now <ArrowUpRightSquareIcon className="ml-2" />
      </Button>
    </Link>
  );
};

export default StripeButton;
