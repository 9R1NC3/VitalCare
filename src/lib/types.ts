export const PATIENT_STATUSES = [
  "ADMITTED",
  "TEMP_PENDING",
  "READY_FOR_DOCTOR",
  "UNDER_REVIEW",
  "READY_FOR_DISCHARGE",
  "DISCHARGED",
] as const;

export type PatientStatus = (typeof PATIENT_STATUSES)[number];

export type UserRole = "NURSE" | "DOCTOR" | "ADMIN";

export type TemperatureLog = {
  date: string;
  temperature: number;
};

export type Patient = {
  id: string;
  name: string;
  roomNumber: string;
  temperatureLogs: TemperatureLog[];
  feverFreeStreak: number;
  status: PatientStatus;
  doctorVisitedToday: boolean;
  createdAt?: string;
  dischargedAt?: string;
};
