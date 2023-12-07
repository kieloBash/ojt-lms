import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CalendarClock, UserCheck2Icon } from "lucide-react";
import ClassesCheckboxes from "./classes-checkboxes";
import ChildrenCheckboxes from "./children-checkboxes";

const CalendarSelections = () => {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>
          <div className="flex w-full gap-2">
            <CalendarClock className="w-5 h-5" />
            <span className="text-sm font-medium">Grade Level</span>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <ClassesCheckboxes />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>
          <div className="flex w-full gap-2">
            <UserCheck2Icon className="w-5 h-5" />
            <span className="text-sm font-medium">Children</span>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <ChildrenCheckboxes />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default CalendarSelections;
