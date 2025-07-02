import { useEffect, useState } from "react";
import { Patient } from "../../types";
import patientService from "../../services/patients";
import { useParams } from "react-router-dom";

const PatientPage = () => {
    const { id } = useParams();
    const [patient, setPatient] = useState<Patient | null>(null);

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

    const genderIcon = patient.gender === "male" ? "♂" : "♀";

    return (
        <div>
            <h1><strong>{patient.name} {genderIcon} </strong></h1>
            <p></p>
            <br></br>
            <p>SSN: {patient.ssn}</p>
            <p>Occupation: {patient.occupation}</p>
        </div>
    );
};

export default PatientPage;