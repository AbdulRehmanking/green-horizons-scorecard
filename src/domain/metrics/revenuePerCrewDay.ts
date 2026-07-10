import { Repository } from "../../data/repositories/ServiceRepository";
import { snapToCanonicalWeek, getAllWeekStarts } from "../../lib/dateUtils";
import { computeWeeklyRevenue } from "./weeklyRevenue";

export function computeRevenuePerCrewDay(repo: Repository) {
  const weeklyRevenueData = computeWeeklyRevenue(repo);
  const revenueByWeek = new Map<string, number>(
    weeklyRevenueData.map((r: { weekStart: string; revenue: number }) => [r.weekStart, r.revenue])
  );
  
  const crewDayCounts = new Map<string, number>();
  getAllWeekStarts().forEach((w: string) => crewDayCounts.set(w, 0));

  for (const route of repo.scheduledRoutes) {
    if (!route.DateScheduled) continue;
    const week = snapToCanonicalWeek(route.DateScheduled);
    if (!week || !crewDayCounts.has(week)) continue;
    
    const hasCrew = [route.Crew1, route.Crew2, route.Crew3, route.Crew4].some((c: string) => c);
    if (!hasCrew) continue;
    
    crewDayCounts.set(week, (crewDayCounts.get(week) ?? 0) + 1);
  }

  return getAllWeekStarts().map((weekStart: string) => {
    const revenue = revenueByWeek.get(weekStart) ?? 0;
    const crewDays = crewDayCounts.get(weekStart) ?? 0;
    return {
      weekStart,
      revenuePerCrewDay: crewDays > 0 ? revenue / crewDays : 0
    };
  });
}