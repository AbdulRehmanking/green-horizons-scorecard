import { loadCsv } from "../loaders/csvLoader";
import {
  CompletedService,
  ScheduledService,
  ScheduledRoute,
  LocationService,
  Customer,
  CustomerLocation,
  Employee,
} from "../../lib/types";

export function getRepository() {
  const completedServices = loadCsv<CompletedService>("completed_services.csv");
  const scheduledServices = loadCsv<ScheduledService>("scheduled_services.csv");
  const scheduledRoutes = loadCsv<ScheduledRoute>("scheduled_routes.csv");
  const locationServices = loadCsv<LocationService>("location_services.csv");
  const customers = loadCsv<Customer>("customers.csv");
  const customerLocations = loadCsv<CustomerLocation>("customer_locations.csv");
  const employees = loadCsv<Employee>("employees.csv");

  const routeById = new Map<string, ScheduledRoute>(
    scheduledRoutes.map((r: ScheduledRoute) => [r.ScheduledRouteID, r])
  );
  const locServById = new Map<string, LocationService>(
    locationServices.map((l: LocationService) => [l.LocServID, l])
  );

  return {
    completedServices,
    scheduledServices,
    scheduledRoutes,
    locationServices,
    customers,
    customerLocations,
    employees,
    routeById,
    locServById,
  };
}

export type Repository = ReturnType<typeof getRepository>;