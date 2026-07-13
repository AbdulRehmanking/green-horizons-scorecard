import { CompletedService, LocationService } from "../../lib/types";

export function calculateVisitRevenue(
  visit: CompletedService,
  locationService: LocationService | undefined
): { revenue: number; flag?: string } {
  if (visit.Serv_Hourly === 1) {
    const extraHours = Math.max(0, (visit.TotalTime ?? 0) - 1);
    return { revenue: visit.FirstHourChargeRate + extraHours * visit.Serv_HourlyRate };
  }
  if (!visit.Serv_CallCharge || visit.Serv_CallCharge === 0) {
    if (!locationService) return { revenue: 0, flag: "zero-charge, no location_service match" };
    if (!locationService.Serv_TotalCalls) return { revenue: 0, flag: "zero-charge, Serv_TotalCalls is 0" };
    return { revenue: locationService.Serv_CallCharge / locationService.Serv_TotalCalls };
  }
  return { revenue: visit.Serv_CallCharge };
}
