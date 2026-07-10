export function getAllWeekStarts(): string[] {
  const weeks: string[] = [];
  let cursor = new Date(Date.UTC(2026, 2, 2)); // Mar 2, 2026
  const end = new Date(Date.UTC(2026, 6, 5));  // Jul 5, 2026
  while (cursor <= end) {
    weeks.push(cursor.toISOString().slice(0, 10));
    cursor.setUTCDate(cursor.getUTCDate() + 7);
  }
  return weeks;
}

const CANONICAL_WEEKS = new Set(getAllWeekStarts());

// Takes a raw date string like "2026-03-01 05:00:00" and safely extracts
// just the date part, ignoring the time, so no timezone guessing happens.
export function snapToCanonicalWeek(dateStr: string | null | undefined): string | null {
  if (!dateStr) return null;
  const datePart = String(dateStr).split(" ")[0]; // "2026-03-01"
  const [y, m, d] = datePart.split("-").map(Number);
  if (!y || !m || !d) return null;

  const date = new Date(Date.UTC(y, m - 1, d));
  if (isNaN(date.getTime())) return null;

  const day = date.getUTCDay();
  const diff = day === 0 ? -6 : 1 - day;
  const monday = new Date(Date.UTC(y, m - 1, d + diff));
  const weekStart = monday.toISOString().slice(0, 10);

  return CANONICAL_WEEKS.has(weekStart) ? weekStart : null;
}