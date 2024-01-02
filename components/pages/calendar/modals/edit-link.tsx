"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateSingleClassLinkByID } from "@/lib/actions/class.action";
import { Pen } from "lucide-react";
import { FormEvent, useState } from "react";

export function EditLinkModal({ link, _id }: { link: string; _id: string }) {
  const [newLink, setNewLink] = useState(link);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    const res = await updateSingleClassLinkByID({ _id, zoomLink: newLink });
    if (res) {
      setIsLoading(false);
      window.location.reload();
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={"ghost"}
          type="button"
          className="w-7 h-7 p-1.5 rounded-full"
        >
          <Pen className="w-full h-full" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Class Link</DialogTitle>
          <DialogDescription>Make changes to the class link</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="link" className="text-right">
              Class Link
            </Label>
            <Input
              id="link"
              value={newLink}
              onChange={(e) => setNewLink(e.target.value)}
              className="col-span-3"
              placeholder="Enter Class Link"
            />
          </div>
          <DialogFooter>
            <Button disabled={isLoading} type="submit">
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
