import axios from "axios";
import { Patient, PatientFormValues, EntryWithoutId, DiagnosisEntry } from "../types";
import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`
  );

  return data;
};

const findById = async (id: string) => {
  const { data } = await axios.get<Patient>(
    `${apiBaseUrl}/patients/${id}`
  );

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  );

  return data;
};


// const entryData = (entry: EntryWithoutId ): DiagnosisEntry => {
//   const newEntry = {
//     id: uuid(),
//     ...entry,
//   };

//   return newEntry;
// };

// router.post('/:id/entries', (req, res) => {
//     const patient = patientService.findById(req.params.id);

//     try {
//       const newEntry = entryData(req.body as EntryWithoutId);
//       patient?.entries.push(newEntry);
//       res.json(newEntry);
//     } catch (e) {
//         console.error(e);
//     }
// });

const addEntry = async (id: string, object: EntryWithoutId) => {
  const { data } = await axios.post<DiagnosisEntry>(
    `${apiBaseUrl}/patients/${id}/entries`,
    object
  );

  return data;
};

export default {
  getAll, create, findById, addEntry
};

