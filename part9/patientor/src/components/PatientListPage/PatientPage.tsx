import { useEffect, useState } from "react";
import { 
    Patient, 
    BaseEntry, 
    DiagnosisEntry,
    Diagnosis, 
    } 
    from "../../types";
import patientService from "../../services/patients";
import { useParams } from "react-router-dom";

import HealthCheck from "./HealthCheck";
import OccupationalHealthcare from "./OccupationalHealth";
import Hospital from "./Hospital";
import { Alert, Box, Button, Stack } from "@mui/material";
import EntryForm from "../EntryForm";   

const PatientPage = ({diagnoses}: {diagnoses: Diagnosis[]}) => {
    const { id } = useParams();
    const [patient, setPatient] = useState<Patient | null>(null);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        if (id) {
          const fetchPatient = async () => {
            const patient = await patientService.findById(id);
            setPatient(patient);
          };
          void fetchPatient();
        }
      }, [id]);

      if (!patient) {
        return <div>Loading patient information...</div>;
    }

    const assertNever = (value: never): never => {
        throw new Error(
            `Unhandled discriminated union member: ${JSON.stringify(value)}`
        );
    };

    const getEntryDetails: React.FC<{ entry: DiagnosisEntry }> = ({ entry }) => {
        switch(entry.type) {
            case "Hospital":
                return <Hospital entry={entry} diagnoses={diagnoses} />;
            case "HealthCheck":
                return <HealthCheck entry={entry} diagnoses={diagnoses} />;
            case "OccupationalHealthcare":
                return <OccupationalHealthcare entry={entry} diagnoses={diagnoses} />;
            default:
                return assertNever(entry);
        }
    };

    const genderIcon = patient.gender === "male" ? "♂" : "♀";

    return (
        <div>
            <div>
                <h1><strong>{patient.name} {genderIcon} </strong></h1>
                <p></p>
                <br></br>
                <p>SSN: {patient.ssn}</p>
                <p>Occupation: {patient.occupation}</p>
                <EntryForm
                    showForm={showForm}
                    diagnoses={diagnoses}
                    onAddEntry={async (entry) => {
                        try {
                            const addedEntry = await patientService.addEntry(patient.id, entry);
                            setPatient({ ...patient, entries: [...patient.entries, addedEntry] });
                            setShowForm(false);
                        } catch (error) {
                            <Stack sx={{ width: '100%' }} spacing={2}>
                                <Alert severity="error">error</Alert>
                            </Stack>;
                        }
                    }}
                />
            </div>
            <div>
                <h2>Entries</h2>
                {patient.entries.map((entry: BaseEntry) => (
                    <Box key={entry.id} sx={{ p: 1, border: '1px black solid', marginBottom: 1, marginTop: 1, borderRadius: '25px' }}>
                    {getEntryDetails({ entry: entry as DiagnosisEntry })}
                    </Box>
                ))}
            </div>
            <Button variant="contained" onClick={() => setShowForm(!showForm)}>
                {showForm ? "Cancel" : "Add New Entry"}
            </Button>
        </div>
    );
};

export default PatientPage;