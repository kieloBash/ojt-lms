import CalendarComponent from "@/components/pages/calendar/component";
import { authUserClerk } from "@/lib/actions/parent.action";

import { Loader2 } from "lucide-react";
import { Metadata } from "next";

import { redirect } from "next/navigation";
import React, { Suspense } from "react";

export const metadata: Metadata = {
  title: "Umonics LMS | Calendar",
  description: "Created by interns",
};

const page = async () => {
  const user = await authUserClerk();
  if (!user) return redirect("/");
  console.log(user);

  return (
    <div className="flex w-full h-full">
      <Suspense
        fallback={
          <div className="flex items-center justify-center w-full h-full">
            <Loader2 className="w-6 h-6 animate-spin" />
          </div>
        }
      >
        <CalendarComponent userInfo={user} />
      </Suspense>
    </div>
  );
};

export default page;
