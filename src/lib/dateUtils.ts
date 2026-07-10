// Buckets a date into its Monday-start week, for the Mar 2 – Jul 5 2026 window
export function getWeekStart(dateStr: string): string {
  const d = new Date(dateStr);
  const day = d.getDay(); // 0 = Sunday
  const diff = day === 0 ? -6 : 1 - day; // shift back to Monday
  const monday = new Date(d);
  monday.setDate(d.getDate() + diff);
  return monday.toISOString().slice(0, 10);
}

export function isInSeasonWindow(dateStr: string): boolean {
  const d = new Date(dateStr);
  return d >= new Date("2026-03-02") && d <= new Date("2026-07-05");
}