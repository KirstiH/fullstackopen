
import { HospitalEntry } from "../../types";
import { Diagnosis } from "../../types";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

const Hospital = ({ entry, diagnoses }: { entry: HospitalEntry, diagnoses: Diagnosis[] }) => {
    return (
        <div>
            <p>{entry.date} <LocalHospitalIcon /></p>
            <p>{entry.description}</p>
            <p>Discharge criteria: {entry.discharge.criteria}</p>
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

export default Hospital;