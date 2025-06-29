import { z } from "zod";
import { newEntrySchema } from "./utils";

export interface DiagnosisEntry {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

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

