"use client";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle, X } from "lucide-react";

export function NewUserPopup() {
  const [open, setOpen] = useState(true);

  if (open)
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
        <div className="relative w-full max-w-lg px-6 py-8 bg-white border shadow rounded-xl">
          <button
            onClick={() => setOpen(false)}
            className="absolute p-0 top-4 right-4"
            type="button"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center justify-center mt-4">
            <CheckCircle className="w-20 h-20 text-green-500" />
          </div>
          <h1 className="mt-4 text-4xl font-semibold text-center text-green-500">
            Paid Successfully!
          </h1>
          <p className="mt-2 text-center">
            You have successfully paid your subscription package. Please enroll
            to a class schedule to start your learning experience!
          </p>
          <p className="mt-6 text-sm text-center text-muted-foreground">
            You can either go to the calendar tab on the left or click on the
            button below!
          </p>
          <div className="flex items-center justify-end w-full mt-2">
            <Link href={"/calendar"}>
              <Button type="button">Go to Calendar</Button>
            </Link>
          </div>
        </div>
      </div>
    );

  return null;
}
