import { Repository } from "../../data/repositories/ServiceRepository";
import { snapToCanonicalWeek, getAllWeekStarts } from "../../lib/dateUtils";
import { CustomerLocation } from "../../lib/types";

export function computeSignups(repo: Repository) {
  const firstActivationByCustomer = new Map<string, string>();

  for (const ls of repo.locationServices) {
    if (!ls.Serv_DateActivated) continue;
    const loc = repo.customerLocations.find((cl: CustomerLocation) => cl.LocationID === ls.LocationID);
    if (!loc) continue;
    const custId = loc.CustomerID;
    const existing = firstActivationByCustomer.get(custId);
    if (!existing || ls.Serv_DateActivated < existing) {
      firstActivationByCustomer.set(custId, ls.Serv_DateActivated);
    }
  }

  const counts = new Map<string, number>();
  getAllWeekStarts().forEach((w: string) => counts.set(w, 0));

  for (const date of firstActivationByCustomer.values()) {
    const week = snapToCanonicalWeek(date);
    if (week && counts.has(week)) {
      counts.set(week, (counts.get(week) ?? 0) + 1);
    }
  }

  return getAllWeekStarts().map((weekStart: string) => ({
    weekStart,
    signups: counts.get(weekStart) ?? 0
  }));
}