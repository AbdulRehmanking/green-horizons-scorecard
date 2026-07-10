import { Repository } from "../../data/repositories/ServiceRepository";
import { snapToCanonicalWeek, getAllWeekStarts } from "../../lib/dateUtils";

export function computeActiveFieldStaff(repo: Repository) {
  const staffByWeek = new Map<string, Set<string>>();
  getAllWeekStarts().forEach((w: string) => staffByWeek.set(w, new Set<string>()));

  for (const route of repo.scheduledRoutes) {
    if (!route.DateScheduled) continue;
    const week = snapToCanonicalWeek(route.DateScheduled);
    if (!week || !staffByWeek.has(week)) continue;
    
    const set = staffByWeek.get(week);
    if (set) {
      [route.Crew1, route.Crew2, route.Crew3, route.Crew4].forEach((c: string) => {
        if (c) set.add(c);
      });
    }
  }

  return getAllWeekStarts().map((weekStart: string) => ({
    weekStart,
    activeStaff: staffByWeek.get(weekStart)?.size ?? 0,
  }));
}