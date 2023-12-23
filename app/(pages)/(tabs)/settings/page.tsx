import { ProfileForm } from "@/components/pages/settings/form";
import { Separator } from "@/components/ui/separator";
import { ParentType } from "@/lib/interfaces/parent.interface";
import { UserType } from "@/lib/interfaces/user.interface";
import { authOptions } from "@/utils/authOptions";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import React from "react";

export const metadata: Metadata = {
  title: "Umonics LMS | Settings",
  description: "Created by interns",
};

const SettingsPage = async () => {
  const session = await getServerSession(authOptions);
  const userInfo = session?.user as UserType | ParentType;

  return (
    <div className="flex flex-col flex-1 h-full p-8 space-y-8 bg-white">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-main-500">
            Settings
          </h2>
          <p className="text-muted-foreground">
            {`Manage your account settings here`}
          </p>
        </div>
      </div>
      <Separator className="space-y-4" />
      <div className="flex-1 space-y-6">
        <ProfileForm userInfo={userInfo} />
      </div>
    </div>
  );
};

export default SettingsPage;
