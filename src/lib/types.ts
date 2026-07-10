export interface CompletedService {
  CSID: string;
  LocServID: string;
  DateCompleted: string;
  Serv_Hourly: number;
  TotalTime: number;
  FirstHourChargeRate: number;
  Serv_HourlyRate: number;
  Serv_CallCharge: number;
}

export interface ScheduledService {
  ScheduledServiceID: string;
  ScheduledRouteID: string;
  Status: string;
  LocServID: string;
}

export interface ScheduledRoute {
  ScheduledRouteID: string;
  DateScheduled: string;
  Crew1: string;
  Crew2: string;
  Crew3: string;
  Crew4: string;
}

export interface LocationService {
  LocServID: string;
  LocationID: string;
  Serv_DateActivated: string;
  Serv_TotalCalls: number;
  Serv_CallCharge: number;
}

export interface Customer {
  CustomerID: string;
  Name: string;
}

export interface CustomerLocation {
  LocationID: string;
  CustomerID: string;
}

export interface Employee {
  EmployeeID: string;
  Name: string;
}