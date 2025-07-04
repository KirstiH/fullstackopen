import { z } from "zod";
import { newDiagnosisEntrySchema, newEntrySchema } from "./utils";


export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

// export enum EntryType {
//   HealthCheck = "HealthCheck",
//   OccupationalHealthcare = "OccupationalHealthcare",
//   Hospital = "Hospital"
// }

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: {
    startDate: string,
    endDate: string
  };
}

export interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: {
    date: string,
    criteria: string
  };
}

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export type DiagnosisEntry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
// Define Entry without the 'id' property
export type EntryWithoutId = UnionOmit<DiagnosisEntry, 'id'>;

export type NewDiagnosisEntry = z.infer<typeof newDiagnosisEntrySchema>;

export type NewPatientEntry = z.infer<typeof newEntrySchema>; 

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;

export type PatientEntry = Omit<Patient, "entries">;

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: DiagnosisEntry[];
}

