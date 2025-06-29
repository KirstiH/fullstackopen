import { Patient, PatientEntry, NonSensitivePatient, NewPatientEntry } from "../types";
import patients from "../../data/patients";
import { v1 as uuid } from 'uuid';

const getEntries = (): Patient[] => {
    return patients;
};

const getPreviewEntries = (): NonSensitivePatient[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};

const addPatient = ( entry: NewPatientEntry ): PatientEntry => {
 
  const newPatientEntry = {
    id: uuid(),
    entries: [],
    ...entry
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

const findById = (id: string): Patient | undefined => {
  const entry = patients.find(d => d.id === id);
  return entry;
};

export default {
    getEntries,
    addPatient,
    getPreviewEntries,
    findById
};