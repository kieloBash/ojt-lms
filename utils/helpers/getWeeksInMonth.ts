import dayjs, { Dayjs } from "dayjs";
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

export function getWeeklyDatesInAMonth(monthIndex: number) {
  const format = "MM-DD-YYYY || dddd";
  const currDate = dayjs().set("month", monthIndex); // Current date
  const startOfMonth = currDate.startOf("month");
  const endOfMonth = currDate.endOf("month");

  // Find the first Saturday of the month
  let firstSaturday = startOfMonth.day(6);
  if (firstSaturday.isBefore(startOfMonth)) {
    firstSaturday = firstSaturday.add(7, "days");
  }

  // Calculate the number of weeks by counting Saturdays until the end of the month
  let weekCount = 0;
  let currentSaturday = firstSaturday;
  while (currentSaturday.isBefore(endOfMonth)) {
    weekCount++;
    currentSaturday = currentSaturday.add(7, "days");
  }

  const weeklyDates = [];
  for (let i = 0; i < weekCount; i++) {
    const weekStart = firstSaturday.add(i * 7, "days");
    const weekEnd = weekStart.add(6, "days");
    weeklyDates.push({
      start: weekStart,
      end: weekEnd,
    });
  }

  return weeklyDates;
}

export function isDateInWeek(
  dateToCheck: Dayjs,
  weekStart: Dayjs,
  weekEnd: Dayjs
) {
  if (!dayjs.isDayjs(dateToCheck)) {
    console.log("Invalid date format");
    return false;
  }

  return (
    dateToCheck.isSame(weekStart) ||
    (dateToCheck.isAfter(weekStart) && dateToCheck.isBefore(weekEnd)) ||
    dateToCheck.isSame(weekEnd)
  );
}

export function isDateAfterWeekEnd(dateToCheck: Dayjs, weekEnd: Dayjs) {
  // Ensure dateToCheck and weekEnd are Day.js objects
  if (!dayjs.isDayjs(dateToCheck) || !dayjs.isDayjs(weekEnd)) {
    console.log("Invalid date format");
    return false;
  }

  // Check if the dateToCheck is after the weekEnd
  return dateToCheck.isAfter(weekEnd);
}
