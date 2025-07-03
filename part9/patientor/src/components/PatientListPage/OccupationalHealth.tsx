import { OccupationalHealthcareEntry, Diagnosis } from "../../types";
import WorkIcon from '@mui/icons-material/Work';


const OccupationalHealth = ({entry, diagnoses} : {entry: OccupationalHealthcareEntry, diagnoses: Diagnosis[]}) => {
    return (
        <div>
            <p> {entry.date} <WorkIcon /> Employer name: {entry.employerName}</p>
            <p>{entry.description}</p>  
            <p>Diagnose by: {entry.specialist}</p>
            {entry.diagnosisCodes?.map(code => { 
                         const diagnosis = diagnoses.find(d => d.code === code);
                        return (
                            <li key={code}>
                                {code} {diagnosis?.name}
                            </li>
                        );
            })}
        </div>
    );
};

export default OccupationalHealth;