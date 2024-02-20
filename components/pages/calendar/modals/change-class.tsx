"use client";
import React, { useState } from "react";

// UI
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Check,
  ChevronDownIcon,
  Delete,
  Edit,
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
import dayjs, { Dayjs } from "dayjs";
import { convertTime } from "@/utils/helpers/convertTime";
import { AttendanceType } from "@/lib/interfaces/attendance.interface";
import { useSelectedChild } from "@/components/global/context/useSelectedChild";
import {
  updateClassScheduleIndex,
  updateRemoveClass,
} from "@/lib/actions/attendance.action";
import { classClosedChecker } from "@/utils/helpers/calendar/helpers";
import useAttendancePerWeek from "../hooks/useAttendancePerWeek";
import useNewFetchWeekly from "../hooks/new/useNewFetchWeekly";

const ChangeClassModal = ({
  index: indexMonth,
  attendance,
  selectedWeek,
}: {
  index: number;
  attendance: AttendanceType;
  selectedWeek:
    | {
        start: Dayjs;
        end: Dayjs;
      }
    | undefined;
}) => {
  const { selectedChild } = useSelectedChild();
  const [show, setShow] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [selectedAttendance, setSelectedAttendance] =
    React.useState<string>("");
  const [isLoading, setisLoading] = useState(false);

  async function handleAddClassSchedule() {
    if (selectedAttendance === "" && !selectedChild) return null;
    setisLoading(true);

    const res = await updateClassScheduleIndex({
      childId: (selectedChild?._id as string) || "",
      newAttendanceId: selectedAttendance,
      pastAttendanceId: attendance._id as string,
    });

    if (res) {
      setShow(false);
      setisLoading(false);
      window.location.reload();
    }
  }
  const foundPresent = attendance?.studentsPresent?.find(
    (d) => d._id === selectedChild?._id
  );

  // NEW FOR ATTENDANCE OPTIONS
  const attendancesOptions = useNewFetchWeekly({ indexMonth, selectedWeek });
  const today = new Date();
  today.setHours(0, 0, 0, 0); // set the time to  00:00:00.000

  const filtered = attendancesOptions?.data?.filter((item) => {
    const itemDate = new Date(item.date);
    itemDate.setHours(0, 0, 0, 0);
    return itemDate >= today && item._id !== attendance._id;
  });

  return (
    <Dialog open={show} onOpenChange={setShow}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="secondary" className="px-3 shadow-none">
            <span className="">Edit</span>
            <Edit className="ml-2 w-4 h-4 text-secondary-foreground" />
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
                      // setSelectedIndexToChange(index + 1);
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
                <CommandItem
                  disabled={foundPresent ? true : false}
                  onSelect={async () => {
                    const res = await updateRemoveClass({
                      childId: selectedChild?._id as string,
                      oldAttendance: attendance?._id as string,
                    });

                    if (res) window.location.reload();
                  }}
                >
                  <div className="flex items-center justify-between w-full">
                    <div
                      className={`flex gap-2 ${
                        foundPresent && "text-muted-foreground"
                      }`}
                    >
                      <Delete className="w-5 h-5" />
                      Remove Class
                    </div>
                  </div>
                </CommandItem>
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
                You can only change class a day before the actual class.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-2 mb-4">
              <Label>Class</Label>
              <Select onValueChange={setSelectedAttendance}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="New Class" />
                </SelectTrigger>
                <SelectContent>
                  {attendancesOptions.isLoading ? (
                    <Label className="flex items-center justify-center w-full px-2 py-1">
                      <Loader2 className="w-5 h-5 animate-spin" />
                    </Label>
                  ) : (
                    <>
                      {filtered && filtered?.length > 0 ? (
                        <>
                          {filtered.map((a) => {
                            return (
                              <SelectItem key={a._id} value={a._id as string}>
                                {a.ageGroup} |{" "}
                                {dayjs(new Date(a.date)).format("dddd")} -{" "}
                                {dayjs(new Date(a.date)).format("MM/DD")} |{" "}
                                {convertTime(a.startTime, a.endTime)}
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
              <Button
                type="button"
                disabled={isLoading}
                onClick={handleAddClassSchedule}
              >
                Save changes{" "}
                {isLoading && <Loader2 className="w-6 h-6 animate-spin" />}
              </Button>
            </DialogFooter>
          </DialogContent>
        </>
      )}
    </Dialog>
  );
};

export default ChangeClassModal;
