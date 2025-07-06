import { Box, Button, Chip, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, OutlinedInput, Radio, RadioGroup, Select, SelectChangeEvent, TextField } from "@mui/material";
import { Diagnosis, EntryWithoutId } from "../types";
import { useState } from "react";
interface EntryFormProps {
  showForm: boolean;
  diagnoses: Diagnosis[];
  onAddEntry: (entry: EntryWithoutId) => void;
}

const EntryForm: React.FC<EntryFormProps> = ({ showForm, diagnoses, onAddEntry }) => {
    const [newDescription, setDescription] = useState('');
    const [newDate, setDate] = useState('');
    const [newSpecialist, setSpecialist] = useState('');
    const [newHealthCheckRating, setHealthCheckRating] = useState(0);
    const [newDiagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);

    if (!showForm) {
        return null;
    }

    const addEntry = (event: React.SyntheticEvent) => {
        event.preventDefault();

        const newEntry = {
            type: 'HealthCheck' as const,
            healthCheckRating: newHealthCheckRating,
            description: newDescription,
            date: newDate,
            specialist: newSpecialist,
            healthCheck: newHealthCheckRating,
            diagnosisCodes: newDiagnosisCodes
        };

        onAddEntry(newEntry);
        

        setDescription('');
        setDate('');
        setSpecialist('');
        setHealthCheckRating(0);
        setDiagnosisCodes([]);
    };

    const handleRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setHealthCheckRating(parseInt(event.target.value));
    };

    const handleDiagnosisChange = (event: SelectChangeEvent<typeof newDiagnosisCodes>) => {
        const {
            target: { value },
        } = event;
        setDiagnosisCodes(
            typeof value === 'string' ? value.split(',') : value,
        );
    };
    
    return (
        <form onSubmit={addEntry}>
        <div>
            <Box sx={{ p: 1, border: '1px black solid', marginBottom: 1, marginTop: 1, borderRadius: '25px', width: 600 }}>
                <h2>New HealthCheck Entry</h2>
                <br></br>
                <TextField 
                    id="filled-basic" 
                    label="Description" 
                    variant="filled"
                    type="text"
                    value={newDescription}
                    onChange={(event) => setDescription(event.target.value)}
                    placeholder="write visit description here"
                    style={{ width: 600 }}
                 />
                <TextField 
                    id="filled-basic" 
                    label="Date" 
                    type="date"
                    variant="filled" 
                    value={newDate}
                    onChange={(event) => setDate(event.target.value)}
                    style={{ width: 600 }}
                />
                <TextField 
                    id="filled-basic" 
                    label="Specialist" 
                    variant="filled" 
                    type="text"
                    value={newSpecialist}
                    onChange={(event) => setSpecialist(event.target.value)}
                    style={{ width: 600 }}
                />
                <FormControl sx={{ m: 1, width: 600 }}>
                    <FormLabel id="demo-radio-buttons-group-label">Health rating</FormLabel>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="Healthy"
                        name="radio-buttons-group"
                    >
                        <FormControlLabel value="0" control={<Radio onChange={handleRatingChange} />} label="Healthy" />
                        <FormControlLabel value="1" control={<Radio onChange={handleRatingChange} />} label="Low risk" />
                        <FormControlLabel value="2" control={<Radio onChange={handleRatingChange} />} label="High risk" />
                        <FormControlLabel value="3" control={<Radio onChange={handleRatingChange} />} label="Critical risk" />
                    </RadioGroup>
                </FormControl>
                <FormControl sx={{ m: 1, width: 600 }}>
                    <InputLabel id="demo-multiple-chip-label">Diagnosis codes</InputLabel>
                    <Select
                        labelId="demo-multiple-name-label"
                        id="demo-multiple-name"
                        multiple
                        value={newDiagnosisCodes}
                        onChange={handleDiagnosisChange}
                        input={<OutlinedInput id="select-multiple-chip" label="Diagnosis codes" />}
                        renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected.map((value) => (
                                    <Chip key={value} label={value} />
                                ))}
                            </Box>
                        )}
                    >
                        {diagnoses.map((diagnosis) => (
                            <MenuItem
                            key={diagnosis.code}
                            value={diagnosis.code}
                            >
                            {diagnosis.code}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Button variant="contained" type="submit">Add</Button>
            </Box>
            
        </div>
        </form>
    );
};

export default EntryForm;