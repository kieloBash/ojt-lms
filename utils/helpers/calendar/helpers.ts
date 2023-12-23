import dayjs from "dayjs";

export function getMatrixMonth(month = dayjs().month()) {
  const year = dayjs().year();
  const firstDayOTMonth = dayjs(new Date(year, month, 1)).day();
  let currMonthCount = 0 - firstDayOTMonth;
  const daysMatrix = new Array(5).fill([]).map(() => {
    return new Array(7).fill(null).map(() => {
      currMonthCount++;
      return dayjs(new Date(year, month, currMonthCount));
    });
  });
  return daysMatrix;
}

export function classClosedChecker({
  dayLimit,
  attDate,
}: {
  dayLimit: number;
  attDate: dayjs.Dayjs;
}) {
  const format = "MMMM DD YYYY";
  const today = dayjs();

  const closed =
    today.set("date", today.date() + dayLimit).format(format) ===
      attDate.format(format) ||
    today.isAfter(attDate) ||
    today.format(format) === attDate.format(format);

  return closed;
}

export function classUpcomingChecker({
  attDate,
  startTime,
  endTime,
}: {
  attDate: dayjs.Dayjs;
  startTime: string;
  endTime: string;
}) {
  const today = dayjs();
  const time = endTime.split(":");

  const closed =
    (Number(today.format("HH")) > Number(time[0]) &&
      today.format("MM/DD/YYYY") === attDate.format("MM/DD/YYYY")) ||
    (today.get("date") > attDate.get("date") &&
      today.get("month") === attDate.get("month") &&
      today.get("year") === attDate.get("year")) ||
    (today.get("month") > attDate.get("month") &&
      today.get("year") === attDate.get("year")) ||
    today.get("year") > attDate.get("year");

  return closed;
}
