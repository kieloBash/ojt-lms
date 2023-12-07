import dayjs from "dayjs";
function getFirstDayOfMonth(year: number, month: number) {
  return dayjs().year(year).month(month).startOf("month");
}
function getLastDayOfMonth(year: number, month: number) {
  return dayjs().year(year).month(month).endOf("month");
}
function getWeekInMonth(startDate: string, month: number) {
  let currentDay = dayjs(startDate);
  let currentDayOfWeek = currentDay.day();
  let daysUntilEndOfWeek = 6 - currentDayOfWeek;

  let week: dayjs.Dayjs[] = [];
  for (let i = 0; i <= daysUntilEndOfWeek; i++) {
    let day = currentDay.add(i, "day");
    if (day.month() === month) {
      week.push(day);
    }
  }

  return week;
}

export function getWeeksInAMonth(year: number, month: number) {
  let count = 0;
  let currDay = getFirstDayOfMonth(year, month);
  let endDay = getLastDayOfMonth(year, month);
  let weeks: dayjs.Dayjs[][] = [];

  while (!currDay.isAfter(endDay)) {
    let week = getWeekInMonth(currDay.toISOString(), month);
    weeks.push(week);
    if (count === 0) {
      currDay = currDay.add(7 - getFirstDayOfMonth(year, month).day(), "day"); // Move to the next week
    } else {
      currDay = currDay.add(7, "day"); // Move to the next week
    }
    count++;
  }

  return weeks;
}
