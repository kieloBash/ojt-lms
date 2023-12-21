import dayjs from "dayjs";

export function getWeek(presentDate: Date) {
  let today = dayjs(presentDate);
  let firstOfWeek = dayjs(today).startOf("week");
  let endOfWeek = dayjs(today).endOf("week");
  firstOfWeek = firstOfWeek.set("date", firstOfWeek.get("date") - 1);
  endOfWeek = endOfWeek.set("date", endOfWeek.get("date") - 1);

  return {
    start: firstOfWeek.format("MM/DD/YYYY"),
    end: endOfWeek.format("MM/DD/YYYY"),
  };
}
