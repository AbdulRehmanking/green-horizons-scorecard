import { describe, it, expect } from "vitest";
import { calculateVisitRevenue } from "@/domain/pricing/calculateVisitRevenue";

describe("calculateVisitRevenue", () => {
  it("computes hourly billing correctly", () => {
    const visit = {
      Serv_Hourly: 1,
      FirstHourChargeRate: 75,
      Serv_HourlyRate: 50,
      TotalTime: 2.5,
      Serv_CallCharge: 0,
    } as any;
    // 75 + (1.5 * 50) = 150
    expect(calculateVisitRevenue(visit, undefined).revenue).toBe(150);
  });

  it("computes prepaid per-visit value from location_services", () => {
    const visit = { Serv_Hourly: 0, Serv_CallCharge: 0 } as any;
    const locService = { Serv_CallCharge: 600, Serv_TotalCalls: 12 } as any;
    // 600 / 12 = 50
    expect(calculateVisitRevenue(visit, locService).revenue).toBe(50);
  });

  it("guards against Serv_TotalCalls = 0", () => {
    const visit = { Serv_Hourly: 0, Serv_CallCharge: 0 } as any;
    const locService = { Serv_CallCharge: 600, Serv_TotalCalls: 0 } as any;
    const result = calculateVisitRevenue(visit, locService);
    expect(result.revenue).toBe(0);
    expect(result.flag).toBeDefined();
  });

  it("uses standard call charge when non-zero and non-hourly", () => {
    const visit = { Serv_Hourly: 0, Serv_CallCharge: 85 } as any;
    expect(calculateVisitRevenue(visit, undefined).revenue).toBe(85);
  });
});