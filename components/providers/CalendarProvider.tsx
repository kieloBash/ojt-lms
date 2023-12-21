"use client";
import dayjs from "dayjs";
import * as React from "react";
import Holidays, { HolidaysTypes } from "date-holidays";

export type CalendarContextType = {
  monthIndex: number;
  calendarType: "Week" | "Month";
  setMonthIndex: (temp: number) => void;
  setCalendarType: (temp: "Week" | "Month") => void;
  toggleSidebar: boolean;
  holidays: HolidaysTypes.Holiday[];
  setToggleSidebar: (temp: boolean) => void;
};

export const CalendarContext = React.createContext<CalendarContextType>({
  monthIndex: 0,
  calendarType: "Month",
  setMonthIndex: (index: number) => {},
  setCalendarType: (temp: "Week" | "Month") => {},
  toggleSidebar: true,
  holidays: [],
  setToggleSidebar: (temp: boolean) => {},
});

export const useCalendarContext = () => React.useContext(CalendarContext);

const CalendarProvider = ({ children }: { children: React.ReactNode }) => {
  const today = dayjs();
  const [monthIndex, setMonthIndex] = React.useState<number>(today.month());
  const [toggleSidebar, setToggleSidebar] = React.useState<boolean>(true);
  const [calendarType, setCalendarType] = React.useState<"Week" | "Month">(
    "Month"
  );

  var hd = new Holidays();
  hd.init("SG");
  var holidays = hd.getHolidays(dayjs().year());

  const upcomingHolidays = React.useMemo(() => {
    return holidays.filter(
      (h) =>
        dayjs(h.date).isAfter(dayjs()) && dayjs(h.date).month() === monthIndex
    );
  }, [holidays, monthIndex]);

  return (
    <CalendarContext.Provider
      value={{
        monthIndex,
        setMonthIndex,
        calendarType,
        setCalendarType,
        toggleSidebar,
        setToggleSidebar,
        holidays: upcomingHolidays,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};

export default CalendarProvider;
