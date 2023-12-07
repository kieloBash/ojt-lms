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
