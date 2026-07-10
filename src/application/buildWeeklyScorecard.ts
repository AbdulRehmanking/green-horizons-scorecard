import { getRepository } from "@/data/repositories/ServiceRepository";
import { computeWeeklyRevenue } from "@/domain/metrics/weeklyRevenue";
import { computeSignups } from "@/domain/metrics/signups";
import { computeCancellationRate } from "@/domain/metrics/cancellationRate";
import { computeRevenuePerCrewDay } from "@/domain/metrics/revenuePerCrewDay";
import { computeActiveFieldStaff } from "@/domain/metrics/activeFieldStaff";
import { getAllWeekStarts } from "@/lib/dateUtils";

export function buildWeeklyScorecard() {
  const repo = getRepository();

  const revenueMap = new Map(computeWeeklyRevenue(repo).map(r => [r.weekStart, r.revenue]));
  const signupsMap = new Map(computeSignups(repo).map(r => [r.weekStart, r.signups]));
  const cancellationMap = new Map(computeCancellationRate(repo).map(r => [r.weekStart, r.cancellationRate]));
  const crewDayMap = new Map(computeRevenuePerCrewDay(repo).map(r => [r.weekStart, r.revenuePerCrewDay]));
  const staffMap = new Map(computeActiveFieldStaff(repo).map(r => [r.weekStart, r.activeStaff]));

  return getAllWeekStarts().map(weekStart => ({
    weekStart,
    revenue: revenueMap.get(weekStart) ?? 0,
    signups: signupsMap.get(weekStart) ?? 0,
    cancellationRate: cancellationMap.get(weekStart) ?? 0,
    revenuePerCrewDay: crewDayMap.get(weekStart) ?? 0,
    activeStaff: staffMap.get(weekStart) ?? 0,
  }));
}