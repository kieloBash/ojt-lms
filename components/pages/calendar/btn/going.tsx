"use client";
import { useSelectedChild } from "@/components/global/context/useSelectedChild";
import { Button } from "@/components/ui/button";
import {
  updateStudentNo,
  updateStudentYes,
} from "@/lib/actions/attendance.action";
import { AttendanceType } from "@/lib/interfaces/attendance.interface";
import { classClosedChecker } from "@/utils/helpers/calendar/helpers";
import dayjs from "dayjs";
import { Check } from "lucide-react";
import React from "react";

const GoingBtn = ({ attendance }: { attendance: AttendanceType }) => {
  const { selectedChild } = useSelectedChild();
  const going = attendance.studentsPresent?.find(
    (a) => a._id === selectedChild?._id
  )
    ? true
    : false;
  const goingClassName = going && "text-green-500";
  async function handlePresent() {
    const res = await updateStudentYes({
      studentId: selectedChild?._id as string,
      attendanceId: attendance?._id as string,
    });

    if (res) {
      //   console.log(res);
      window.location.reload();
    }
  }
  async function handleRemove() {
    const res = await updateStudentNo({
      studentId: selectedChild?._id as string,
      attendanceId: attendance?._id as string,
    });

    if (res) {
      //   console.log(res);
      window.location.reload();
    }
  }

  return (
    <Button
      type="button"
      disabled={classClosedChecker({
        dayLimit: 1,
        attDate: dayjs(attendance.date),
      })}
      onClick={() => {
        if (
          classClosedChecker({ dayLimit: 1, attDate: dayjs(attendance.date) })
        )
          return null;

        if (!going) handlePresent();
        else handleRemove();
      }}
      variant="secondary"
      className={`${goingClassName} flex items-center justify-center px-2 shadow-none`}
    >
      {going ? (
        <>
          <Check className="w-3 h-3 mr-2" />
        </>
      ) : (
        <></>
      )}
      <span className="text-xs">Going?</span>
    </Button>
  );
};

export default GoingBtn;
