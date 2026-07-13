import { getRepository } from "../../data/repositories/ServiceRepository";
import { computeWeeklyRevenue } from "../metrics/weeklyRevenue";
import { computeSignups } from "../metrics/signups";
import { computeCancellationRate } from "../metrics/cancellationRate";
import { computeRevenuePerCrewDay } from "../metrics/revenuePerCrewDay";
import { computeActiveFieldStaff } from "../metrics/activeFieldStaff";
import { getAllWeekStarts } from "../../lib/dateUtils";

export type ScorecardRow = {
  weekStart: string;
  revenue: number;
  signups: number;
  cancellationRate: number;
  revenuePerCrewDay: number;
  activeStaff: number;
};

export function getWeeklyScorecard(startDate?: string, endDate?: string): ScorecardRow[] {
  const repo = getRepository();
  let weeks: string[] = getAllWeekStarts();
  
  if (startDate && endDate) {
    weeks = weeks.filter((w: string) => w >= startDate && w <= endDate);
  } else if (startDate) {
    weeks = weeks.filter((w: string) => w >= startDate);
  } else if (endDate) {
    weeks = weeks.filter((w: string) => w <= endDate);
  }
  
  const revenueData = computeWeeklyRevenue(repo);
  const signupsData = computeSignups(repo);
  const cancellationData = computeCancellationRate(repo);
  const crewDayData = computeRevenuePerCrewDay(repo);
  const staffData = computeActiveFieldStaff(repo);
  
  const revenueMap = new Map<string, number>(
    revenueData.map((r: any) => [r.weekStart, r.revenue])
  );
  const signupsMap = new Map<string, number>(
    signupsData.map((r: any) => [r.weekStart, r.signups])
  );
  const cancellationMap = new Map<string, number>(
    cancellationData.map((r: any) => [r.weekStart, r.cancellationRate])
  );
  const crewDayMap = new Map<string, number>(
    crewDayData.map((r: any) => [r.weekStart, r.revenuePerCrewDay])
  );
  const staffMap = new Map<string, number>(
    staffData.map((r: any) => [r.weekStart, r.activeStaff])
  );
  
  return weeks.map((weekStart: string): ScorecardRow => ({
    weekStart,
    revenue: revenueMap.get(weekStart) ?? 0,
    signups: signupsMap.get(weekStart) ?? 0,
    cancellationRate: cancellationMap.get(weekStart) ?? 0,
    revenuePerCrewDay: crewDayMap.get(weekStart) ?? 0,
    activeStaff: staffMap.get(weekStart) ?? 0,
  }));
}
