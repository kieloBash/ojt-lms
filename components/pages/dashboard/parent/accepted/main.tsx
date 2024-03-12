"use client";
import React from "react";
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
import CalendarAttendance from "./cards/calendar-attendance";
import dayjs from "dayjs";
import Image from "next/image";
import MaterialsTable from "./cards/materials-table";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";

import IntroComponent from "../../help/intro";
import Announcemment from "../../announcement/announcement";

const StudentAcceptedScetion = ({
  selectedChild,
  billingLink,
}: {
  selectedChild: StudentType;
  billingLink: string;
}) => {
  return (
    <>
      {/* MOBILE */}
      <div className="flex flex-col px-4 py-8 pt-0 space-y-4 lg:hidden xl:hidden md:hidden">
        <IntroComponent />
        {selectedChild.package !== "Discover" ? (
          <>
            <div className="flex flex-col w-full max-w-[20rem] gap-4">
              <Card className="">
                <CardHeader>
                  <CardTitle>Progress Tracker</CardTitle>
                  <CardDescription>
                    Here you can view all the classes you have enrolled in for
                    the month of {dayjs().format("MMMM")}.
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
                    <CardDescription>
                      Here you can view all the materials made available for you
                      whenever you attended the class.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <MaterialsTable selectedChild={selectedChild} />
                  </CardContent>
                </Card>
              )}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center w-full h-screen">
            <Image src={LOGO} alt="Umonics Logo" width={900} />
            <Link href={billingLink}>
              <Button>
                <ShoppingBag className="w-6 h-6 mr-2" /> Upgrade Plan
              </Button>
            </Link>
          </div>
        )}
      </div>
      {/* DESKTOP */}
      <div className="min-h-[calc(100vh-6rem)] p-8 pt-0 space-y-4 lg:flex xl:flex md:flex hidden flex-col">
        {/* <Announcemment /> */}
        <IntroComponent />
        <div className="pb-4 space-y-4 ">
          <div className="space-y-4">
            {selectedChild.package !== "Discover" ? (
              <>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                  <Card className="col-span-4">
                    <CardHeader>
                      <CardTitle>Progress Tracker</CardTitle>
                      <CardDescription>
                        Here you can view all the classes you have enrolled in
                        for the month of {dayjs().format("MMMM")}.
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
                        <CardDescription>
                          Here you can view all the materials made available for
                          you whenever you attended the class.
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <MaterialsTable selectedChild={selectedChild} />
                      </CardContent>
                    </Card>
                  )}
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center w-full h-screen">
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
    </>
  );
};

export default StudentAcceptedScetion;
