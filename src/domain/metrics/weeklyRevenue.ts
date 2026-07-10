import { Repository } from "../../data/repositories/ServiceRepository";
import { calculateVisitRevenue } from "../pricing/calculateVisitRevenue";
import { snapToCanonicalWeek, getAllWeekStarts } from "../../lib/dateUtils";

export function computeWeeklyRevenue(repo: Repository) {
  const totals = new Map<string, number>();
  getAllWeekStarts().forEach((w: string) => totals.set(w, 0));

  for (const visit of repo.completedServices) {
    const week = snapToCanonicalWeek(visit.DateCompleted);
    if (!week) continue;
    const locServ = repo.locServById.get(visit.LocServID);
    const { revenue } = calculateVisitRevenue(visit, locServ);
    totals.set(week, (totals.get(week) ?? 0) + revenue);
  }

  return getAllWeekStarts().map((weekStart: string) => ({
    weekStart,
    revenue: totals.get(weekStart) ?? 0
  }));
}