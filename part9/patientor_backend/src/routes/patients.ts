import express from 'express';
import patientService from '../services/patientService';
import { PatientPreview } from '../types';
import { Response } from 'express';

const router = express.Router();

router.get('/', (_req, res: Response<PatientPreview[]>) => {
  res.send(patientService.getPreviewEntries());
});


router.post('/', (_req, res) => {
  res.send('Saving a patient!');
});

export default router;