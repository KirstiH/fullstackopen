import { PatientEntry, PatientPreview, NewPatientEntry } from "../types";
import patients from "../../data/patients";
import { v1 as uuid } from 'uuid';

const getEntries = (): PatientEntry[] => {
    return patients;
};

const getPreviewEntries = (): PatientPreview[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const addPatient = ( entry: NewPatientEntry ): PatientEntry => {
 
  const newPatientEntry = {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    id: uuid(),
    ...entry
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

const findById = (id: string): PatientEntry | undefined => {
  const entry = patients.find(d => d.id === id);
  return entry;
};

export default {
    getEntries,
    addPatient,
    getPreviewEntries,
    findById
};