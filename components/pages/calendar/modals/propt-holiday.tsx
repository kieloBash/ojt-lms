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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import Holidays, { HolidaysTypes } from "date-holidays";
import dayjs from "dayjs";
import { Separator } from "@/components/ui/separator";

export function AlertHoliday({
  toggle,
  holidays,
}: {
  toggle: boolean;
  holidays: HolidaysTypes.Holiday[];
}) {
  const [open, setOpen] = useState<boolean>(toggle);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Notice</DialogTitle>
          <DialogDescription>
            There is an upcoming holiday for the month, please be aware of the
            dates for there will be no classes. Thank you for your
            considerations!
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {holidays.map((h, index) => {
            return (
              <div key={index} className="flex flex-col">
                <div className="grid items-center grid-cols-4 gap-4 ">
                  <Label className="col-span-2 text-xl text-right">
                    {h.name}
                  </Label>
                  <Label className="col-span-2 text-xl">
                    {dayjs(h.date).format("MMMM DD")}
                  </Label>
                </div>
                <Separator />
              </div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
