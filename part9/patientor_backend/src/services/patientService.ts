import { PatientEntry, PatientPreview } from "../types";
import patients from "../../data/patients";

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

const addPatient = () => {
    return null;
};

export default {
    getEntries,
    addPatient,
    getPreviewEntries
};