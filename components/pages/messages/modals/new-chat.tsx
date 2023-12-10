"use client";

// UI
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PenBox, Send } from "lucide-react";
import { UserOptionsComboBox } from "./user-options";
import { useState } from "react";

// BACKEND

export function NewChatModal({ blank = false }: { blank?: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {blank ? (
          <Button type="button" className="h-10 px-4 py-2">
            <span className="text-2xl">Start</span>
            <Send className="w-full h-full ml-2 text-white" />
          </Button>
        ) : (
          <Button type="button" variant={"ghost"} className="w-6 h-6 p-0">
            <PenBox className="w-full h-full text-main-500" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create new chat</DialogTitle>
          <DialogDescription>
            Create new chat with other people.
          </DialogDescription>
        </DialogHeader>
        <UserOptionsComboBox onChange={setOpen} />
      </DialogContent>
    </Dialog>
  );
}
