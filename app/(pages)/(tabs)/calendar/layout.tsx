import MainSidebarCalendar from "@/components/pages/calendar/main-sidebar";
import CalendarTopBar from "@/components/pages/calendar/topbar";
import CalendarProvider from "@/components/providers/CalendarProvider";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import React from "react";

const layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="flex flex-1 w-full h-full bg-slate-100">
      <CalendarProvider>
        <div className="flex flex-col flex-1 w-full">
          <CalendarTopBar />
          <Separator />
          <div className="flex flex-1 bg-white">
            <ScrollArea className="w-full min-h-[calc(100vh-82px)] bg-white">
              <article className="w-full h-[calc(100vh-82px)]">
                {children}
              </article>
            </ScrollArea>
          </div>
        </div>
      </CalendarProvider>
    </section>
  );
};

export default layout;
