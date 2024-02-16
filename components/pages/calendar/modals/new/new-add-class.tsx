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
import { isDateInWeek } from "@/utils/helpers/getWeeksInMonth";
import useNewFetchWeekly from "../../hooks/new/useNewFetchWeekly";
import { convertTime } from "@/utils/helpers/convertTime";
import { useSelectedChild } from "@/components/global/context/useSelectedChild";
import { updateClassSchedule } from "@/lib/actions/attendance.action";

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

  // ATTENDANCES
  const attendancesOptions = useNewFetchWeekly({ indexMonth, selectedWeek });
  const [selectedAttendance, setSelectedAttendance] = useState<string>("");

  // STUDENT
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

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            Add Class Schedule (
            {selectedWeek?.start.format(format) +
              " - " +
              selectedWeek?.end.format(format)}
            )
          </DialogTitle>
          <DialogDescription>
            <>{`Please enroll to only of one the choices. Week starts on Saturdays and ends on Fridays`}</>
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2 mb-4">
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
          <Button
            type="button"
            onClick={handleAddClassSchedule}
            disabled={selectedAttendance === ""}
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewAddClassModal;
