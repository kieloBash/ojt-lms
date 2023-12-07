import CalendarComponent from "@/components/pages/calendar/component";
import { ParentType } from "@/lib/interfaces/parent.interface";
import { UserType } from "@/lib/interfaces/user.interface";
import { authOptions } from "@/utils/authOptions";
import { Loader2 } from "lucide-react";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import React, { Suspense } from "react";

export const metadata: Metadata = {
  title: "Umonics LMS | Calendar",
  description: "Created by interns",
};

const page = async () => {
  const session = await getServerSession(authOptions);
  const userInfo = session?.user as UserType | ParentType;

  if (!userInfo) return null;

  return (
    <div className="flex w-full h-full px-4">
      <Suspense
        fallback={
          <div className="flex items-center justify-center w-full h-full">
            <Loader2 className="w-6 h-6 animate-spin" />
          </div>
        }
      >
        <CalendarComponent userInfo={userInfo} />
      </Suspense>
    </div>
  );
};

export default page;
