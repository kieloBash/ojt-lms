"use client";
import React, { useState } from "react";

// UI
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Check, ChevronDownIcon, Loader2, Lock, Replace } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// BACKEND
import dayjs from "dayjs";
import { convertTime } from "@/utils/helpers/convertTime";
import { AttendanceType } from "@/lib/interfaces/attendance.interface";
import { useSelectedChild } from "@/components/global/context/useSelectedChild";
import { updateClassScheduleIndex } from "@/lib/actions/attendance.action";
import { classClosedChecker } from "@/utils/helpers/calendar/helpers";
import useAttendancePerWeek from "../hooks/useAttendancePerWeek";

const ChangeClassModal = ({
  index,
  attendance,
}: {
  index: number;
  attendance: AttendanceType;
}) => {
  const format = "MM/DD";
  const { selectedChild } = useSelectedChild();
  const [show, setShow] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [selectedAttendance, setSelectedAttendance] =
    React.useState<string>("");

  // GET THE ATTENDANCE TIME DATE
  const [selectedIndexToChange, setSelectedIndexToChange] =
    useState<number>(-1);
  const WeekAttendance = useAttendancePerWeek(
    selectedIndexToChange,
    dayjs(attendance.date),
    attendance
  );

  const dayLimit = 3;
  const time = attendance.startTime.split(":");
  const attDate = dayjs(attendance.date)
    .set("hour", Number(time[0]))
    .set("minute", Number(time[1]));
  const closed = classClosedChecker({ dayLimit, attDate });

  async function handleAddClassSchedule() {
    if (selectedAttendance === "" && !selectedChild) return null;

    const res = await updateClassScheduleIndex({
      childId: (selectedChild?._id as string) || "",
      newAttendanceId: selectedAttendance,
      pastAttendanceId: attendance._id as string,
    });

    if (res) {
      setShow(false);
      setSelectedIndexToChange(-1);
      window.location.reload();
    }
  }
  const foundPresent = attendance?.studentsPresent?.find(
    (d) => d._id === selectedChild?._id
  );
  console.log(foundPresent);

  return (
    <Dialog open={show} onOpenChange={setShow}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="secondary" className="px-2 shadow-none">
            <ChevronDownIcon className="w-4 h-4 text-secondary-foreground" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[250px] p-0">
          <Command>
            <CommandList>
              <CommandGroup>
                <DialogTrigger asChild>
                  <CommandItem
                    onSelect={() => {
                      setOpen(false);
                      setShow(true);
                      setSelectedIndexToChange(index + 1);
                    }}
                    disabled={closed}
                  >
                    <div className="flex items-center justify-between w-full">
                      <div
                        className={`flex gap-2 ${
                          closed && "text-muted-foreground"
                        }`}
                      >
                        <Replace className="w-5 h-5" />
                        Change Class
                      </div>
                      {closed && (
                        <Lock className="w-5 h-5 ml-2 text-muted-foreground" />
                      )}
                    </div>
                  </CommandItem>
                </DialogTrigger>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {foundPresent ? (
        <>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Change your class</DialogTitle>
              <DialogDescription>
                Please remove your attendance first to proceed with changing
                your class schedule for the week.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant={"outline"}
                type="button"
                onClick={() => setShow(false)}
              >
                Cancel
              </Button>
            </DialogFooter>
          </DialogContent>
        </>
      ) : (
        <>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Change your class</DialogTitle>
              <DialogDescription>
                You can only change class 3 day before the actual class.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-2 mb-4">
              <Label>Class</Label>
              <Select onValueChange={setSelectedAttendance}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="New Class" />
                </SelectTrigger>
                <SelectContent>
                  {WeekAttendance.isLoading ? (
                    <Label className="flex items-center justify-center w-full px-2 py-1">
                      <Loader2 className="w-5 h-5 animate-spin" />
                    </Label>
                  ) : (
                    <>
                      {WeekAttendance.data &&
                      WeekAttendance.data?.length > 0 ? (
                        <>
                          {WeekAttendance.data.map((a) => {
                            return (
                              <SelectItem key={a._id} value={a._id as string}>
                                {dayjs(a.date).format("dddd")} -{" "}
                                {dayjs(a.date).format(format)} - {a.class.class}{" "}
                                - {convertTime(a.startTime, a.endTime)}
                              </SelectItem>
                            );
                          })}
                        </>
                      ) : (
                        <Label className="flex items-center justify-center w-full px-2 py-1">
                          No other available classes for the week
                        </Label>
                      )}
                    </>
                  )}
                </SelectContent>
              </Select>
            </div>
            <DialogFooter>
              <Button
                variant={"outline"}
                type="button"
                onClick={() => setShow(false)}
              >
                Cancel
              </Button>
              <Button type="button" onClick={handleAddClassSchedule}>
                Save changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </>
      )}
    </Dialog>
  );
};

export default ChangeClassModal;
