import { Repository } from "../../data/repositories/ServiceRepository";
import { snapToCanonicalWeek, getAllWeekStarts } from "../../lib/dateUtils";

export function computeCancellationRate(repo: Repository) {
  const resolved = new Map<string, number>();
  const skipped = new Map<string, number>();
  getAllWeekStarts().forEach((w: string) => { resolved.set(w, 0); skipped.set(w, 0); });

  for (const ss of repo.scheduledServices) {
    const route = repo.routeById.get(ss.ScheduledRouteID);
    if (!route || !route.DateScheduled) continue;

    const week = snapToCanonicalWeek(route.DateScheduled);
    if (!week || !resolved.has(week)) continue;

    if (!ss.Status || ss.Status.trim() === "") continue;
    if (ss.Status === "Pending") continue;

    resolved.set(week, (resolved.get(week) ?? 0) + 1);
    if (ss.Status === "Skipped") {
      skipped.set(week, (skipped.get(week) ?? 0) + 1);
    }
  }

  return getAllWeekStarts().map((weekStart: string) => {
    const r: number = resolved.get(weekStart) ?? 0;
    const s: number = skipped.get(weekStart) ?? 0;
    return {
      weekStart,
      cancellationRate: r > 0 ? s / r : 0,
      resolved: r,
      skipped: s
    };
  });
}