import { UserType } from "@/lib/interfaces/user.interface";
import React from "react";

// UI
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

const AdminMain = ({ userInfo }: { userInfo: UserType }) => {
  return (
    <main className="flex-1 w-full h-full bg-white">
      <div className="block w-full">
        <div className="border-t">
          <div className="bg-background">
            <div className="grid lg:grid-cols-5">
              <div className="col-span-3 lg:col-span-5 lg:border-l">
                <div className="h-full px-4 py-6 lg:px-8">
                  <div className="h-full space-y-6">
                    <div className="p-0 border-none outline-none">
                      <div className="flex items-center justify-between w-full">
                        <div className="space-y-1">
                          <h2 className="text-2xl font-semibold tracking-tight">
                            Welcome!
                          </h2>
                          <p className="text-sm text-muted-foreground">
                            Here are the admin tools you can use.
                          </p>
                        </div>
                      </div>
                      <Separator className="my-4" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AdminMain;
