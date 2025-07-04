import express from 'express';
import patientService from '../services/patientService';
import { NonSensitivePatient } from '../types';
import { Response } from 'express';
import {toNewPatientEntry} from '../utils';
import { z } from 'zod';
import { DiagnosisEntry } from '../types';
import { EntryWithoutId } from '../types';
import { v1 as uuid } from 'uuid';
//import { toNewDiagnosisEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
  res.send(patientService.getPreviewEntries());
});

router.get('/:id', (req, res) => {
  const patient = patientService.findById(req.params.id);

  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

const entryData = (entry: EntryWithoutId ): DiagnosisEntry => {
  const newEntry = {
    id: uuid(),
    ...entry,
  };

  return newEntry;
};

router.post('/:id/entries', (req, res) => {
    const patient = patientService.findById(req.params.id);

    try {
      const newEntry = entryData(req.body as EntryWithoutId);
      patient?.entries.push(newEntry);
      res.json(newEntry);
    } catch (e) {
        console.error(e);
    }
});


router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedEntry = patientService.addPatient(newPatientEntry);
    res.json(addedEntry);
   } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).send({ error: error.issues });
    } else {
      res.status(400).send({ error: 'unknown error' });
    }
  }
});

export default router;

