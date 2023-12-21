"use client";
import React from "react";

// UI
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const CloseButton = ({ close }: { close: (e: string) => void }) => {
  return (
    <Button
      type="button"
      onClick={() => close("close")}
      variant={"ghost"}
      size={"icon"}
      className="absolute rounded-full top-4 right-4"
    >
      <X />
    </Button>
  );
};

export default CloseButton;
