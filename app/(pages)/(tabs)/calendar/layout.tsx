import CalendarTopBar from "@/components/pages/calendar/topbar";
import CalendarProvider from "@/components/providers/CalendarProvider";
import { ScrollArea } from "@/components/ui/scroll-area";
import React from "react";

const layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="flex flex-1 w-full h-full bg-slate-100">
      <CalendarProvider>
        {/* <CalendarSideBar userInfo={userInfo} /> */}
        <div className="flex flex-col flex-1 w-full">
          <CalendarTopBar />
          <ScrollArea className="w-full min-h-[calc(100vh-112px)] bg-white">
            <article className="w-full h-[calc(100vh-112px)]">
              {children}
            </article>
          </ScrollArea>
        </div>
      </CalendarProvider>
    </section>
  );
};

export default layout;
