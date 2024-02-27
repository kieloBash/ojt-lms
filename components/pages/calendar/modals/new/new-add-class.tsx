"use client";
import dayjs, { Dayjs } from "dayjs";
import React, { useState } from "react";

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
import {
  getNextWeekDates,
  isDateInWeek,
} from "@/utils/helpers/getWeeksInMonth";
import useNewFetchWeekly from "../../hooks/new/useNewFetchWeekly";
import { convertTime } from "@/utils/helpers/convertTime";
import { useSelectedChild } from "@/components/global/context/useSelectedChild";
import { updateClassSchedule } from "@/lib/actions/attendance.action";
import { Loader2 } from "lucide-react";
import { CLASSES_BY_LEVEL } from "@/utils/constants/ClassesByLevel";

const NewAddClassModal = ({
  indexMonth,
  open,
  setOpen,
  selectedWeek,
}: {
  indexMonth: number;
  open: boolean;
  setOpen: (bol: boolean) => void;
  selectedWeek:
    | {
        start: Dayjs;
        end: Dayjs;
      }
    | undefined;
}) => {
  const format = "MM/DD";
  const [chosenWeek, setChosenWeek] = useState(selectedWeek);

  // ATTENDANCES
  const attendancesOptions = useNewFetchWeekly({
    indexMonth,
    selectedWeek: chosenWeek,
  });
  const [selectedAttendance, setSelectedAttendance] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  // STUDENT
  const { selectedChild } = useSelectedChild();

  async function handleAddClassSchedule() {
    if (selectedAttendance === "" && !selectedChild) return null;
    setIsLoading(true);

    const res = await updateClassSchedule({
      childId: (selectedChild?._id as string) || "",
      newAttendanceId: selectedAttendance,
    });

    if (res) {
      setOpen(false);
      window.location.reload();
      setIsLoading(false);
    }
  }

  const info = CLASSES_BY_LEVEL[selectedChild?.gradeLevel || "N1"];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            Add Class Schedule (
            {chosenWeek?.start.format(format) +
              " - " +
              chosenWeek?.end.format(format)}
            )
          </DialogTitle>
          <DialogDescription>
            <>{`Please enroll to only of one the choices. Week starts on Saturdays and ends on Fridays`}</>
          </DialogDescription>
        </DialogHeader>
        {attendancesOptions.isLoading ? (
          <div className="flex items-center justify-center w-full h-20">
            <Loader2 className="w-6 h-6 animate-spin" />
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-2 mb-4">
              {attendancesOptions.data &&
              attendancesOptions.data?.length === 0 ? (
                <>
                  <p className="text-sm">{`There are no more available meetings to schedule for this week. Please try to enroll for the next week's class.`}</p>
                  <div className="flex flex-col items-center justify-center gap-2 mt-6">
                    <Label>
                      {selectedChild?.gradeLevel} Weekly Class Schedule
                    </Label>
                    <ul className="flex flex-col items-center justify-center">
                      {info?.map((cl, index) => {
                        return (
                          <li
                            className="grid w-full grid-cols-2 gap-8 text-sm text-left"
                            key={index}
                          >
                            <span className="font-bold text-left">
                              {cl.day}
                            </span>
                            <p className="text-right">{cl.time}</p>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </>
              ) : (
                <>
                  <Label>Class</Label>
                  <Select onValueChange={setSelectedAttendance}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="New Class" />
                    </SelectTrigger>
                    <SelectContent>
                      {attendancesOptions.data &&
                      attendancesOptions.data?.length > 0 ? (
                        <>
                          {attendancesOptions.data.map((a) => {
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
                        <>No available classes for the week</>
                      )}
                    </SelectContent>
                  </Select>
                </>
              )}
            </div>
          </>
        )}
        <DialogFooter>
          {attendancesOptions.data && attendancesOptions.data?.length > 0 ? (
            <>
              <Button
                variant={"outline"}
                type="button"
                onClick={() => setOpen(false)}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={handleAddClassSchedule}
                disabled={selectedAttendance === "" || isLoading}
              >
                Save changes{" "}
                {isLoading && <Loader2 className="w-5 h-5 ml-2 animate-spin" />}
              </Button>
            </>
          ) : (
            <>
              <Button
                variant={"outline"}
                type="button"
                onClick={() => setOpen(false)}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={() => {
                  const nextWeek = getNextWeekDates(selectedWeek);
                  if (!nextWeek) return;
                  setChosenWeek(nextWeek);
                }}
                // onClick={handleAddClassSchedule}
                disabled={isLoading}
              >
                Enroll for Next Week{" "}
                {isLoading && <Loader2 className="w-5 h-5 ml-2 animate-spin" />}
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewAddClassModal;
