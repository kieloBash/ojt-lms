import { ProfileForm } from "@/components/pages/settings/form";
import { Separator } from "@/components/ui/separator";
import { authUserClerk } from "@/lib/actions/parent.action";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Umonics LMS | Settings",
  description: "Created by interns",
};

const SettingsPage = async () => {
  const userInfo = await authUserClerk();
  if (!userInfo) return null;
  console.log(userInfo);

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
