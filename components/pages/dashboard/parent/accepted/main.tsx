import React from "react";
import { ParentType } from "@/lib/interfaces/parent.interface";
import { StudentType } from "@/lib/interfaces/student.interface";

// UI
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CardGridSection from "./card-grid";
import CalendarAttendance from "./cards/calendar-attendance";

const StudentAcceptedScetion = ({
  userInfo,
  selectedChild,
}: {
  userInfo: ParentType;
  selectedChild: StudentType;
}) => {
  return (
    <div className="flex-1 p-8 pt-0 space-y-4">
      <div className="space-y-4">
        <div className="space-y-4">
          {/* <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <CardGridSection />
          </div> */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Calendar</CardTitle>
                <CardDescription>Upcoming Classes</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <CalendarAttendance selectedChild={selectedChild} />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Class Materials</CardTitle>
                <CardDescription>Class Materials for you</CardDescription>
              </CardHeader>
              <CardContent>{/* <RecentSales /> */}</CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentAcceptedScetion;
