const formatter = new Intl.DateTimeFormat("zh-TW", {
  weekday: "long",
  month: "2-digit",
  day: "2-digit",
});

export default function dateFormatter(isoString, pattern = "MMDD") {
  const date = new Date(isoString);
  const parts = formatter.formatToParts(date);
  const weekday = parts.find((part) => part.type === "weekday")?.value;
  const month = parts.find((part) => part.type === "month")?.value;
  const day = parts.find((part) => part.type === "day")?.value;

  if (pattern === "month/day(weekday)") {
    return `${month}/${day} (${weekday})`;
  }

  if (pattern === "weekday(month/day)") {
    return `${weekday} (${month}/${day})`;
  }

  if (pattern === "weekday") {
    return `${weekday}`;
  }
}
