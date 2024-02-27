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

export function getNextWeekDates(
  currentWeek: { start: Dayjs; end: Dayjs } | undefined
) {
  if (!currentWeek) return;

  const format = "MM-DD-YYYY || dddd";
  const currDate = currentWeek.start; // Use the start date of the current week
  const endOfMonth = currDate.endOf("month");

  // Calculate the start of the next week
  let nextWeekStart = currentWeek.end.add(1, "day");
  let nextWeekEnd = nextWeekStart.add(6, "days");

  // Check if the next week falls into the next month
  if (nextWeekEnd.isAfter(endOfMonth)) {
    // If it does, adjust the start and end dates to the next month
    const nextMonthStart = currDate.add(1, "month").startOf("month");
    nextWeekStart = nextMonthStart;
    nextWeekEnd = nextMonthStart.add(6, "days");
  }

  return {
    start: nextWeekStart,
    end: nextWeekEnd,
  };
}

export function getWeeklyDatesInAMonth(monthIndex: number) {
  const format = "MM-DD-YYYY || dddd";
  const currDate = dayjs().month(monthIndex); // Adjusted to use .month() method for setting the month
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
    let weekEnd = weekStart.add(6, "days");

    // Adjust weekEnd if it falls into the next month
    if (weekEnd.isAfter(endOfMonth)) {
      weekEnd = endOfMonth;
    }

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
