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

export function classUpcomingChecker({ attDate }: { attDate: dayjs.Dayjs }) {
  const today = dayjs();

  const closed = today.get("date") > attDate.get("date");

  return closed;
}
