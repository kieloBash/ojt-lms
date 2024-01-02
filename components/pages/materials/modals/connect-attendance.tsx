"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useMaterialsContext } from "../context/useSelectedChild";
import MiniCalendarCard from "../card/mini-calendar";
import useAvailAttendances from "../hook/useAvailAttendances";
import { Loader2 } from "lucide-react";
import { FormEvent, useState } from "react";
import { AttendanceType } from "@/lib/interfaces/attendance.interface";
import dayjs from "dayjs";
import { updateAttendanceConnection } from "@/lib/actions/materials.action";

export function ConnectAttendanceModal() {
  const [isLoading, setIsLoading] = useState(false);
  const { toggleEdit, setToggleEdit, selected } = useMaterialsContext();
  const data = useAvailAttendances(
    selected && selected.gradeLevel ? (selected.gradeLevel[0] as any) : "N1"
  );
  const [attendanceToChange, setAttendanceToChange] = useState<
    AttendanceType | undefined
  >();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    const res = await updateAttendanceConnection({
      materialId: selected?._id as string,
      attendanceId: attendanceToChange?._id as string,
    });
    if (res) {
      setIsLoading(false);
      window.location.reload();
    }
  }

  return (
    <Dialog open={toggleEdit} onOpenChange={setToggleEdit}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Connect Material to Attendance</DialogTitle>
          <DialogDescription>
            Make changes and connect the materials to the attendance to let the
            valid students view the materials.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center w-full h-full"
        >
          {data.isLoading ? (
            <>
              <Loader2 className="w-6 h-6 animate-spin" />
            </>
          ) : (
            <>
              <MiniCalendarCard
                selected={data.data || []}
                attendanceToChange={attendanceToChange}
                setAttendanceToChange={(e: any) => setAttendanceToChange(e)}
              />
            </>
          )}
          <DialogFooter className="flex items-center justify-between w-full mt-4">
            <p className="flex-1">
              {dayjs(attendanceToChange?.date).format("MMMM DD")}
            </p>
            <Button type="submit" disabled={!attendanceToChange || isLoading}>
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
