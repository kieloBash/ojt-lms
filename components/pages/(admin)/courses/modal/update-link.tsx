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
import { ClassesType } from "@/lib/interfaces/class.interface";
import { convertTime } from "@/utils/helpers/convertTime";
import { Loader2 } from "lucide-react";
import { FormEvent, useState } from "react";
import { updateClassLink } from "../actions/update";

export function UpdateLinkModal({
  selected,
  open,
  setOpen,
  handleClose,
}: {
  selected: ClassesType;
  open: boolean;
  setOpen: (e: boolean) => void;
  handleClose: () => void;
}) {
  const [link, setLink] = useState(selected.zoomLink || "");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    const res = await updateClassLink({
      _id: selected._id as string,
      zoomLink: link,
    });

    if (res) {
      handleClose();
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Course Link</DialogTitle>
          <DialogDescription>
            Make changes to the class at {selected.day},{" "}
            {convertTime(selected.startTime, selected.endTime)}
          </DialogDescription>
        </DialogHeader>
        <form className="" onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="link" className="text-right">
                Link
              </Label>
              <Input
                value={link}
                onChange={(e) => setLink(e.target.value)}
                id="link"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isLoading}>
              Save changes{" "}
              {isLoading && <Loader2 className="w-6 h-6 ml-2 animate-spin" />}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
