"use client";

// UI
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Check,
  ChevronDownIcon,
  CircleIcon,
  Loader2,
  Lock,
  Replace,
} from "lucide-react";
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
  CommandSeparator,
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
import { AttendanceType } from "@/lib/interfaces/attendance.interface";
import { convertTime } from "@/utils/helpers/convertTime";
import dayjs from "dayjs";
import React, { useMemo } from "react";
import useWeeklyAttendance from "../hooks/useWeeklyAttendance";
import { useSelectedChild } from "@/components/global/context/useSelectedChild";
import {
  updateClassSchedule,
  updateClassScheduleIndex,
} from "@/lib/actions/attendance.action";

export function NextClassCard({
  attendance,
  index,
}: {
  index: number;
  attendance: AttendanceType;
}) {
  const [open, setOpen] = React.useState(false);
  const [show, setShow] = React.useState(false);

  const WeekAttendance = useWeeklyAttendance(index);
  const [selectedAttendance, setSelectedAttendance] =
    React.useState<string>("");

  const format = "MM/DD";
  const today = dayjs();
  const time = attendance.endTime.split(":");
  const attDate = dayjs(attendance.date)
    .set("hour", Number(time[0]))
    .set("minute", Number(time[1]));

  const closed =
    today.isAfter(attDate.set("date", attDate.date() + 3)) ||
    today.isAfter(attDate);

  const { selectedChild } = useSelectedChild();
  async function handleAddClassSchedule() {
    if (selectedAttendance === "" && !selectedChild) return null;

    const res = await updateClassScheduleIndex({
      childId: (selectedChild?._id as string) || "",
      newAttendanceId: selectedAttendance,
      pastAttendanceId: attendance._id as string,
    });

    if (res) {
      setShow(false);
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

  const filtered = WeekAttendance?.data?.filter(
    (d) => d._id !== attendance._id
  );

  return (
    <Card className="w-full max-w-xs">
      <CardHeader className="grid grid-cols-[1fr_110px] items-start gap-4 space-y-0">
        <div className="space-y-1">
          <CardTitle>{dayjs(attendance.date).format("dddd")}</CardTitle>
          <CardDescription className="text-xs">
            {convertTime(attendance.startTime, attendance.endTime)}
          </CardDescription>
        </div>
        <div className="flex items-center space-x-1 rounded-md bg-secondary text-secondary-foreground">
          <Button
            variant="secondary"
            className="flex items-center justify-center px-2 shadow-none"
          >
            <Check className="w-3 h-3 mr-2" />
            <span className="text-xs">Going?</span>
          </Button>
          <Separator orientation="vertical" className="h-[20px]" />
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
                    {filtered && filtered?.length > 0 ? (
                      <>
                        {filtered.map((a) => {
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
                      <>No other available classes for the week</>
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
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between w-full space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            <CircleIcon className="w-3 h-3 mr-1 fill-main-400 text-main-400" />
            {attendance.class.class} ({attendance.ageGroup})
          </div>

          <div>{attendance.date.toDateString()}</div>
        </div>
      </CardContent>
    </Card>
  );
}
