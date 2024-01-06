import React from "react";
import { ParentType } from "@/lib/interfaces/parent.interface";
import { StudentType } from "@/lib/interfaces/student.interface";

// UI
import LOGO from "@/public/logo-2.svg";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CardGridSection from "./card-grid";
import CalendarAttendance from "./cards/calendar-attendance";
import dayjs from "dayjs";
import Image from "next/image";
import MaterialsTable from "./cards/materials-table";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";

const StudentAcceptedScetion = ({
  userInfo,
  selectedChild,
  billingLink,
}: {
  userInfo: ParentType;
  selectedChild: StudentType;
  billingLink: string;
}) => {
  return (
    <div className="flex-1 p-8 pt-0 space-y-4">
      <div className="space-y-4">
        <div className="space-y-4">
          {/* <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <CardGridSection />
          </div> */}
          {selectedChild.package !== "Discover" ? (
            <>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>Progress Tracker</CardTitle>
                    <CardDescription>
                      Here are the classes you have signed up for the month of{" "}
                      {dayjs().format("MMMM")}.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <CalendarAttendance selectedChild={selectedChild} />
                  </CardContent>
                </Card>
                {selectedChild.package === "Ultimate" && (
                  <Card className="col-span-3">
                    <CardHeader>
                      <CardTitle>Class Materials</CardTitle>
                      <CardDescription>Class Materials for you</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <MaterialsTable selectedChild={selectedChild} />
                    </CardContent>
                  </Card>
                )}
              </div>
            </>
          ) : (
            <div className="absolute flex flex-col items-center justify-center overflow-hidden -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
              <Image src={LOGO} alt="Umonics Logo" width={900} />
              <Link href={billingLink}>
                <Button>
                  <ShoppingBag className="w-6 h-6 mr-2" /> Upgrade Plan
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentAcceptedScetion;
