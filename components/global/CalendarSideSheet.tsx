"use client";
import React from "react";

// BACKEND
import {
  updateStudentNo,
  updateStudentYes,
} from "@/lib/actions/attendance.action";
import { AttendanceType } from "@/lib/interfaces/attendance.interface";
import { StudentType } from "@/lib/interfaces/student.interface";
import { convertToTimeZone } from "@/utils/helpers/timeZone";
import { useQueryClient } from "@tanstack/react-query";

// UI
import {
  Check,
  CheckCircle,
  CheckCircle2,
  Info,
  Pen,
  X,
  XCircle,
  XCircleIcon,
} from "lucide-react";
import { toast } from "../ui/use-toast";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useSelectedChild } from "./context/useSelectedChild";
import dayjs from "dayjs";
import { EditLinkModal } from "../pages/calendar/modals/edit-link";
import Link from "next/link";
import { Tooltip } from "../ui/tooltip";
import TooltipButton from "./TooltipButton";

export function CalendarSheet({
  trigger,
  isParent,
  setTrigger,
  selectedAttendance,
}: {
  trigger: boolean;
  isParent: boolean;
  setTrigger: (col: boolean) => void;
  selectedAttendance: AttendanceType;
}) {
  let startDateTime: Date = new Date(selectedAttendance.date);
  let endDateTime: Date = new Date(selectedAttendance.date);
  let [hours, minutes]: string[] = [];
  [hours, minutes] = selectedAttendance.startTime.split(":");
  startDateTime.setHours(Number(hours), Number(minutes));
  [hours, minutes] = selectedAttendance.endTime.split(":");
  endDateTime.setHours(Number(hours), Number(minutes));

  console.log(selectedAttendance);
  const queryClient = useQueryClient();
  const { selectedChild } = useSelectedChild();
  let foundPresent = false;
  if (selectedChild) {
    foundPresent = selectedAttendance.studentsPresent?.find((present) => {
      const temp: any = present;
      return temp._id === selectedChild._id;
    })
      ? true
      : false;
  }
  const today = dayjs();
  const time = selectedAttendance.endTime.split(":");
  const endTime = dayjs(selectedAttendance.date)
    .set("hour", Number(time[0]))
    .set("minute", Number(time[1]));

  const closedAttendance = today.isAfter(endTime);

  async function handleUpdateAttendance(
    sel: StudentType,
    type: "Present" | "Not Present"
  ) {
    if (type === "Present") {
      const res = await updateStudentYes({
        attendanceId: selectedAttendance._id as string,
        studentId: sel._id as string,
      });

      if (res) {
        queryClient.invalidateQueries({
          queryKey: [`attendances:${selectedAttendance._id}`],
        });
        const currDate = selectedAttendance.date;
        queryClient.invalidateQueries({
          queryKey: [
            `attendance:${currDate.getFullYear()}:${currDate.getMonth()}`,
          ],
        });
        queryClient.invalidateQueries({
          queryKey: [`attendance:selected-${selectedAttendance._id}`],
        });
        setTrigger(false);
        toast({
          title: "Successfully Updated Attendance",
          // variant: "success",
        });
      }
    } else {
      const twoDaysFromNow = dayjs().set("date", today.get("date") + 2);
      const invalid =
        twoDaysFromNow.isSame(dayjs(selectedAttendance.date)) ||
        twoDaysFromNow.isAfter(dayjs(selectedAttendance.date));
      if (invalid) {
        toast({
          title:
            "Can not cancel class anymore. You can only cancel class 3 days before the scheduled class. Thank you!",
          variant: "destructive",
        });
        return;
      }
      const res = await updateStudentNo({
        attendanceId: selectedAttendance._id as string,
        studentId: sel._id as string,
      });

      if (res) {
        queryClient.invalidateQueries({
          queryKey: [`attendances:${selectedAttendance._id}`],
        });
        const currDate = selectedAttendance.date;
        queryClient.invalidateQueries({
          queryKey: [
            `attendance:${currDate.getFullYear()}:${currDate.getMonth()}`,
          ],
        });
        queryClient.invalidateQueries({
          queryKey: [`attendance:selected-${selectedAttendance._id}`],
        });
        setTrigger(false);
        toast({
          title: "Successfully Updated Attendance",
          // variant: "success",
        });
      }
    }
    window.location.reload();
  }

  console.log(selectedAttendance.materials);

  // TIMEZONE
  // Convert to Singapore time
  // Convert to Singapore time
  const singaporeOptions: Intl.DateTimeFormatOptions = {
    timeZone: "Asia/Singapore",
    hour: "2-digit",
    minute: "2-digit",
  };
  const singaporeFormatter = new Intl.DateTimeFormat("en-US", singaporeOptions);
  const singaporeTimeStart = singaporeFormatter.format(startDateTime);
  const singaporeTimeEnd = singaporeFormatter.format(endDateTime);
  // Convert to India time
  const indiaOptions: Intl.DateTimeFormatOptions = {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
  };
  const indiaFormatter = new Intl.DateTimeFormat("en-US", indiaOptions);
  const indiaTimeStart = indiaFormatter.format(startDateTime);
  const indiaTimeEnd = indiaFormatter.format(endDateTime);

  return (
    <Sheet open={trigger} onOpenChange={setTrigger}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Class Details</SheetTitle>
          <SheetDescription>
            Details for the class on {selectedAttendance?.date.toDateString()}
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-start">
              <span className="font-medium text-left">Link</span>
              {selectedChild === undefined && (
                <EditLinkModal
                  link={selectedAttendance?.class.zoomLink || ""}
                  _id={selectedAttendance?.class?._id as string}
                />
              )}
            </div>
            <div className="flex items-center justify-start overflow-hidden">
              <Link
                href={
                  selectedAttendance?.class.zoomLink ||
                  "https://umonicsplus.com"
                }
                target="_blank"
                className="overflow-hidden transition hover:underline line-clamp-1"
              >
                {selectedAttendance?.class.zoomLink ||
                  "https://umonicsplus.com"}
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-medium text-left">Time Zones</span>
            {selectedAttendance && (
              <ul className="flex flex-col gap-2">
                <li className="">
                  <span className="mr-2 text-lg font-medium">SGT</span>
                  {singaporeTimeStart} - {singaporeTimeEnd}{" "}
                </li>
                <li className="">
                  <span className="mr-2 text-lg font-medium">IST</span>
                  {indiaTimeStart} - {indiaTimeEnd}{" "}
                </li>
                {/* {Array(2)
                  .fill(["SGT", "IST"])
                  .map((tz, index) => {
                    return (
                      <li className="" key={index}>
                        <span className="mr-2 text-lg font-medium">
                          {tz[index]}
                        </span>
                        {convertToTimeZone(startDateTime, tz[index])} -{" "}
                        {convertToTimeZone(endDateTime, tz[index])}{" "}
                      </li>
                    );
                  })} */}
              </ul>
            )}
          </div>
          {isParent ? (
            <>
              <div className="grid items-center w-full grid-cols-6 gap-4">
                <span className="font-medium text-left">Going?</span>
                <span className="col-span-5" />
                <p className="col-span-6 -mt-4 text-sm text-muted-foreground">
                  By clicking no, your class will be canceled.
                </p>
                <div className="flex items-center justify-start col-span-6 gap-2">
                  <Button
                    disabled={foundPresent || closedAttendance}
                    variant={"outline"}
                    onClick={() => {
                      handleUpdateAttendance(
                        selectedChild as StudentType,
                        "Present"
                      );
                    }}
                    className={`${
                      foundPresent
                        ? "text-green-800 border-green-800 bg-green-200"
                        : ""
                    }`}
                  >
                    <Check className="w-5 h-5 mr-2" />
                    Yes
                  </Button>
                  <Button
                    disabled={!foundPresent || closedAttendance}
                    variant={"outline"}
                    onClick={() => {
                      handleUpdateAttendance(
                        selectedChild as StudentType,
                        "Not Present"
                      );
                    }}
                    className={`${
                      foundPresent
                        ? ""
                        : "text-red-800 border-red-800 bg-red-200"
                    }`}
                  >
                    <X className="w-5 h-5 mr-2" />
                    No
                  </Button>
                </div>
              </div>
              {foundPresent && (
                <div className="flex flex-col w-full">
                  <div className="flex items-center justify-start w-full gap-2">
                    <div className="pb-2 font-medium text-left">Materials</div>
                    {selectedChild?.package !== "Ultimate" && (
                      <TooltipButton
                        tooltip={`Upgrade your package to 'Ultimate' get materials for the class`}
                      >
                        <Info className="w-4 h-4 -mt-2 cursor-pointer" />
                      </TooltipButton>
                    )}
                  </div>
                  {selectedChild?.package === "Ultimate" && (
                    <>
                      {selectedAttendance?.materials?.map((material) => {
                        const locked = selectedChild?.package === "Discover";

                        if (material.available)
                          return (
                            <>
                              {locked ? (
                                <>
                                  <div
                                    key={material._id}
                                    className="flex-1 cursor-default text-muted-foreground"
                                  >
                                    {material.filename}
                                  </div>
                                </>
                              ) : (
                                <>
                                  <Link
                                    href={material.url}
                                    target="_blank"
                                    className="flex items-center justify-start w-full gap-2 pb-2 hover:underline"
                                    key={material._id}
                                  >
                                    <div className="flex-1">
                                      {material.filename}
                                    </div>
                                  </Link>
                                </>
                              )}
                            </>
                          );
                      })}
                    </>
                  )}
                </div>
              )}
            </>
          ) : (
            <>
              <div className="grid items-center grid-cols-6 gap-4">
                <span className="font-medium text-left">Participants</span>
                <span className="col-span-5" />

                {selectedAttendance &&
                selectedAttendance?.classParticipants &&
                selectedAttendance?.classParticipants?.length > 0 ? (
                  <div className="flex items-center justify-start col-span-6 gap-2">
                    {selectedAttendance?.classParticipants?.map((student) => {
                      const found = selectedAttendance.studentsPresent?.find(
                        (present) => {
                          const temp: any = present;
                          return temp._id === student._id;
                        }
                      );

                      if (!found) {
                        return (
                          <React.Fragment key={student._id}>
                            <span className="flex items-center justify-end">
                              <Button
                                variant={"ghost"}
                                className="p-1 rounded-full w-7 h-7"
                                onClick={() => {
                                  handleUpdateAttendance(student, "Present");
                                }}
                              >
                                <XCircle className="w-full h-full text-red-600" />
                              </Button>
                            </span>
                            <span className="col-span-5">{student.name}</span>
                          </React.Fragment>
                        );
                      } else {
                        return (
                          <React.Fragment key={student._id}>
                            <span className="flex items-center justify-end">
                              <Button
                                variant={"ghost"}
                                className="p-1 rounded-full w-7 h-7"
                                onClick={() => {
                                  handleUpdateAttendance(
                                    student,
                                    "Not Present"
                                  );
                                }}
                              >
                                <CheckCircle className="w-full h-full text-green-600" />
                              </Button>
                            </span>
                            <span className="col-span-5">{student.name}</span>
                          </React.Fragment>
                        );
                      }
                    })}
                  </div>
                ) : (
                  <span className="col-span-6 text-center">
                    No Participants
                  </span>
                )}
              </div>
              <div className="flex flex-col">
                <span className="pb-2 font-medium text-left">Materials</span>
                {selectedAttendance?.materials?.map((material) => {
                  return (
                    <Link
                      href={material.url}
                      target="_blank"
                      className="flex items-center justify-start gap-2 pb-2 hover:underline"
                      key={material._id}
                    >
                      {material.available ? (
                        <CheckCircle2 className="w-6 h-6" />
                      ) : (
                        <XCircleIcon className="w-6 h-6" />
                      )}{" "}
                      <div className="flex-1">{material.filename}</div>
                    </Link>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
