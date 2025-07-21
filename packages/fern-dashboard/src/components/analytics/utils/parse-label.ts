export function parseLabel(dateStr: string): string {
  const date = new Date(dateStr);
  const weekday = date.toLocaleString("en-US", { weekday: "long" });
  const month = date.toLocaleString("en-US", { month: "long" });
  const day = date.getDate();

  return `${weekday.slice(0, 3)}, ${month.slice(0, 3)} ${day}`;
}
