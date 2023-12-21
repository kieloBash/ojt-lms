"use client";
import React, { useMemo } from "react";
import dayjs from "dayjs";
import { AttendanceType } from "@/lib/interfaces/attendance.interface";

// UI
import { SelectedScheduleCard } from "../card/selected-schedule";
import MiniCalendarCard from "../card/mini-calendar";
import { ScrollArea } from "@/components/ui/scroll-area";
import ClassOptionCard from "../card/class-option";
import { useSelected } from "./context/useSelected";
import { getWeeksInAMonth } from "@/utils/helpers/getWeeksInMonth";

const NonAcceptedBody = ({
  AllClassCourses,
}: {
  AllClassCourses: AttendanceType[];
}) => {
  const {
    selected: selectedCourse,
    moveDown,
    moveUp,
    remove,
    addSelected,
  } = useSelected();
  const format = "DD-MM-YY";
  const weeks = [
    ...getWeeksInAMonth(dayjs().year(), dayjs().month()),
    // ...getWeeksInAMonth(dayjs().year(), dayjs().month() + 1),
  ];
  // console.log(weeks.length);

  const filteredOptions: AttendanceType[] = useMemo(() => {
    return AllClassCourses.filter((attendance) => {
      const attendanceDate = dayjs(attendance.date).format(format);

      if (weeks.length > selectedCourse.length)
        return weeks[selectedCourse.length].find(
          (date) => date.format(format) === attendanceDate
        );
    });
  }, [selectedCourse.length]);

  // console.log(filteredOptions);

  return (
    <div className="flex flex-1 gap-6 px-10 1">
      <div className="flex flex-col gap-2">
        <div className="flex items-start justify-start w-full gap-2">
          <SelectedScheduleCard
            classCourses={selectedCourse}
            moveUp={moveUp}
            moveDown={moveDown}
            remove={remove}
          />
          <MiniCalendarCard selected={selectedCourse} />
        </div>
      </div>
      <div className="flex flex-col flex-1 gap-4">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-lg font-medium tracking-tight">
              Add a class
            </h2>
            <p className="text-sm text-muted-foreground">
              Add a class schedule before you proceed to payments.
            </p>
          </div>
        </div>
        <ScrollArea className="flex-1">
          <div className="grid grid-flow-row grid-cols-3 gap-2">
            {filteredOptions?.length !== 0 && filteredOptions ? (
              <>
                {filteredOptions?.map((s) => {
                  return (
                    <ClassOptionCard
                      key={s._id}
                      d={s}
                      add={addSelected}
                      length={selectedCourse.length}
                    />
                  );
                })}
              </>
            ) : (
              <div className="items-center justify-center flex-1 col-span-3 text-center">
                No Classes Available
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default NonAcceptedBody;
