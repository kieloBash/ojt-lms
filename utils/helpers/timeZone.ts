export type TimezoneType = "Asia/Manila" | "Asia/Tokyo";
export function FormattedLocaleString(timeZone: string, date: Date) {
  return date.toLocaleString("en-US", { timeZone });
}

export function FormattedTimeLocaleString(
  timeZone: keyof typeof timeZones,
  currDate: Date,
  timeString: string
) {
  let time: Date = currDate;
  let [hours, minutes]: string[] = timeString.split(":");
  time.setHours(Number(hours), Number(minutes));
  return time.toLocaleString("en-US", {
    timeZone: "America/New_York",
    hour: "numeric",
    minute: "numeric",
  });
}

export function convertToTimeZone(
  inputDate: Date,
  timeZoneAbbreviation: keyof typeof timeZoneOffsets
) {
  const inputDateCopy = inputDate;
  const timeZoneOffset = timeZoneOffsets[timeZoneAbbreviation];
  console.log(inputDateCopy.getHours(), timeZoneAbbreviation);
  inputDateCopy.setHours(inputDateCopy.getHours() + timeZoneOffset);
  return inputDateCopy.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
  });
}

export const timeZoneOffsets = {
  ET: -5,
  CT: -6,
  MT: -7,
  PT: -8,
  EET: 2,
  CET: 1,
  AEST: 10,
  IST: 5.5,
  JST: 9,
  SGT: 8, // Added Singapore Time offset
};

const timeZones = {
  ET: "America/New_York",
  IST: "Asia/Kolkata",
  HKT: "Asia/Hong_Kong",
};
