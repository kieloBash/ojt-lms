"use client";

// UI
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import useWeeklyAttendance from "../hooks/useWeeklyAttendance";
import { convertTime } from "@/utils/helpers/convertTime";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { updateClassSchedule } from "@/lib/actions/attendance.action";
import { useSelectedChild } from "@/components/global/context/useSelectedChild";
import { Loader2 } from "lucide-react";

export function AddClassScheduleModal({
  indexMonth,
  open,
  setOpen,
  prevDateAttendance,
}: {
  indexMonth: number;
  open: boolean;
  setOpen: (bol: boolean) => void;
  prevDateAttendance: Date | undefined;
}) {
  const format = "MM/DD";
  const [weekIndex, setWeekIndex] = useState<number>(indexMonth);
  const [dateAttendance, setDateAttendance] = useState<Date | undefined>(
    prevDateAttendance
  );
  console.log(prevDateAttendance?.toDateString());
  console.log(dateAttendance?.toDateString());

  console.log(weekIndex, indexMonth);
  const WeekAttendance = useWeeklyAttendance(weekIndex, dateAttendance);
  console.log(WeekAttendance.data);
  const [selectedAttendance, setSelectedAttendance] = useState<string>("");
  const { selectedChild } = useSelectedChild();

  useEffect(() => {
    if (indexMonth >= 0) setWeekIndex(indexMonth);
  }, [indexMonth]);

  async function handleAddClassSchedule() {
    if (selectedAttendance === "" && !selectedChild) return null;

    const res = await updateClassSchedule({
      childId: (selectedChild?._id as string) || "",
      newAttendanceId: selectedAttendance,
    });

    if (res) {
      setOpen(false);
      window.location.reload();
    }
  }

  if (WeekAttendance.isLoading)
    return (
      <div className="fixed inset-0 z-10 flex flex-col items-center justify-center gap-2 bg-white">
        <Loader2 className="w-5 h-5 animate-spin" />
        <h1 className="text-4xl font-bold">Loading</h1>
      </div>
    );

  if (WeekAttendance.data?.length === 0)
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Class Schedule</DialogTitle>
            <DialogDescription>
              <>{`No more available classes to enroll for this week, please enroll for the next week instead.`}</>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="button"
              onClick={() => {
                // setWeekIndex((prev) => prev + 1);
                if (dateAttendance) {
                  // const newDate = prevDateAttendance.setDate(prevDateAttendance.getDate()+7)
                  console.log(
                    dayjs(dateAttendance)
                      .set("date", dayjs(dateAttendance).get("date") + 7)
                      .toDate()
                      .toDateString()
                  );
                  setDateAttendance(
                    dayjs(dateAttendance)
                      .set("date", dayjs(dateAttendance).get("date") + 7)
                      .toDate()
                  );
                }
              }}
            >
              Enroll for Next Week
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  else
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Class Schedule</DialogTitle>
            <DialogDescription>
              {`Add a class for the week to your class schedule here. Click save
              when you're done.`}
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-2 mb-4">
            <Label>Class</Label>
            <Select onValueChange={setSelectedAttendance}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="New Class" />
              </SelectTrigger>
              <SelectContent>
                {WeekAttendance.data && WeekAttendance.data?.length > 0 ? (
                  <>
                    {WeekAttendance.data.map((a) => {
                      return (
                        <SelectItem key={a._id} value={a._id as string}>
                          {dayjs(a.date).format("dddd")} -{" "}
                          {dayjs(a.date).format(format)} - {a.class.class} -{" "}
                          {convertTime(a.startTime, a.endTime)}
                        </SelectItem>
                      );
                    })}
                  </>
                ) : (
                  <>No available classes for the week</>
                )}
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button
              variant={"outline"}
              type="button"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="button" onClick={handleAddClassSchedule}>
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
}
