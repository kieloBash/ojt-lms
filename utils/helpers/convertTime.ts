export function convertTime(start: string, end: string) {
  let startTime = new Date(`1970-01-01T${start}:00`);
  let endTime = new Date(`1970-01-01T${end}:00`);

  let startTimeAMPM = startTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  let endTimeAMPM = endTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  let timeAMPM = `${startTimeAMPM} - ${endTimeAMPM}`;
  return timeAMPM;
}
