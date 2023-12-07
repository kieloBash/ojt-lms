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
import { useState } from "react";
import { updateClassSchedule } from "@/lib/actions/attendance.action";
import { useSelectedChild } from "@/components/global/context/useSelectedChild";
import { Loader2 } from "lucide-react";

export function AddClassScheduleModal({
  indexMonth,
  open,
  setOpen,
}: {
  indexMonth: number;
  open: boolean;
  setOpen: (bol: boolean) => void;
}) {
  const format = "MM/DD";

  const WeekAttendance = useWeeklyAttendance(indexMonth);
  const [selectedAttendance, setSelectedAttendance] = useState<string>("");
  const { selectedChild } = useSelectedChild();

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

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Class Schedule</DialogTitle>
          <DialogDescription>
            Add a class for the week to your class schedule here. Click save
            when you're done.
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
                        {dayjs(a.date).format("dddd")} - {dayjs(a.date).format(format)} - {a.class.class} -{" "}
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
