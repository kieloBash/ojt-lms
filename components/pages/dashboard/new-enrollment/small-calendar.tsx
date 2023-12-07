"use client";
import React, { useEffect, useState } from "react";

// BACKEND
import dayjs from "dayjs";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

// UI
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getMatrixMonth } from "@/utils/helpers/calendar/helpers";

const SmallCalendar = ({ repeatedDays }: { repeatedDays: string[] }) => {
  const [currMonthIdx, setCurrMonthIdx] = useState<number>(dayjs().month());
  const [currMonth, setCurrMonth] = useState<dayjs.Dayjs[][]>(getMatrixMonth());
  const format = "DD-MM-YY";
  const today = dayjs().format(format);

  //   HELPER
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const repeatedDaysIndex = repeatedDays.map((d) => daysOfWeek.indexOf(d));

  useEffect(() => {
    setCurrMonth(getMatrixMonth(currMonthIdx));
  }, [currMonthIdx]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Class Calendar</CardTitle>
      </CardHeader>
      <CardContent className="">
        <div className="px-4">
          <header className="flex items-center justify-between mb-4">
            <p className="font-bold text-muted-foreground">
              {dayjs(new Date(dayjs().year(), currMonthIdx)).format(
                "MMMM YYYY"
              )}
            </p>
            <div className="flex gap-4">
              <Button
                variant={"ghost"}
                size={"icon"}
                onClick={() => setCurrMonthIdx((prev) => prev - 1)}
              >
                <ChevronLeft />
              </Button>
              <Button
                variant={"ghost"}
                size={"icon"}
                onClick={() => setCurrMonthIdx((prev) => prev + 1)}
              >
                <ChevronRight />
              </Button>
            </div>
          </header>
          <div className="grid grid-cols-7 grid-rows-6">
            {currMonth[0].map((day, i) => {
              return (
                <span key={i} className="text-sm font-medium text-center">
                  {day.format("dd").charAt(0)}
                </span>
              );
            })}
            {currMonth.map((row, i) => {
              return (
                <React.Fragment key={i}>
                  {row.map((day, idx) => {
                    const currDay = day.format(format);
                    const dayClass =
                      today === currDay && "bg-main-500 text-white";

                    return (
                      <div
                        key={idx}
                        className="flex flex-col items-center justify-center w-10 h-10"
                      >
                        <button
                          className={`${dayClass} w-8 h-8 hover:bg-main-200 rounded-full transition-colors`}
                        >
                          <span className="text-xs">{day.format("D")}</span>
                        </button>
                        <div className="flex flex-wrap items-center flex-1 w-full justify-evenly">
                          {repeatedDaysIndex.includes(day.day()) && (
                            <>
                              <div className="w-[6px] h-[6px] rounded-full bg-main-500"></div>
                            </>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SmallCalendar;
