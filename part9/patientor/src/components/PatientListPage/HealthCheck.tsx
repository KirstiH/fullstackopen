
import { HealthCheckEntry } from "../../types";
import { Diagnosis } from "../../types";
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import FavoriteIcon from '@mui/icons-material/Favorite';


const HealthCheck = ({ entry, diagnoses }: { entry: HealthCheckEntry, diagnoses: Diagnosis[] }) => {

    const healthRating = () => {
        if (entry.healthCheckRating === 0)
            return <FavoriteIcon sx={{color: "green"}} />;
        if (entry.healthCheckRating === 1)
            return <FavoriteIcon sx={{color: "yellow"}} />;
        if (entry.healthCheckRating === 2)
            return <FavoriteIcon sx={{color: "orange"}} />;
        else
            return <FavoriteIcon sx={{color: "red"}} />;
    };

    return (
        <div>
            <p>{entry.date} <MedicalInformationIcon /></p>
            <p>{entry.description}</p>
            <p>{healthRating()}</p>
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

export default HealthCheck;