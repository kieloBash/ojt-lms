"use client";
import React from "react";

// BACKEND
import useRelatedClasses from "./hooks/useRelatedClasses";
import { AgeGroupType, ClassesType } from "@/lib/interfaces/class.interface";

// UI
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { convertTime } from "@/utils/helpers/convertTime";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const RelatedClasses = ({
  ageGroup,
  classId,
}: {
  ageGroup: AgeGroupType;
  classId: string;
}) => {
  const relatedClasses = useRelatedClasses(ageGroup, classId);
  if (relatedClasses.isLoading) return null;
  return (
    <Card>
      <CardHeader>
        <CardTitle>Other {ageGroup} Classes</CardTitle>
        <CardDescription>
          {`Here's some related classes you may like`}
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        {relatedClasses.data ? (
          <>
            {relatedClasses.data.map((course: any) => {
              const classTime = convertTime(course.startTime, course.endTime);

              return (
                <Link
                  key={course._id as string}
                  href={`/dashboard/new-enrollment/${course._id}`}
                  className="transition-all border border-transparent rounded-lg hover:border-slate-300 hover:bg-slate-50"
                >
                  <div className="flex items-center justify-between space-x-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-32 h-24 rounded-lg shadow-sm bg-main-300"></div>
                      <div>
                        <p className="text-base font-medium leading-none uppercase">
                          {course.class} CLASS
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {course.repeatedDays?.join(", ")}
                        </p>
                        <p className="mt-2 text-xs font-medium text-muted-foreground">
                          {classTime}
                        </p>
                        <Badge variant={"outline"} className="mt-2">
                          {course.participants?.length} Student/s Enrolled
                        </Badge>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </>
        ) : (
          <div>No related classes found</div>
        )}
      </CardContent>
    </Card>
  );
};

export default RelatedClasses;
