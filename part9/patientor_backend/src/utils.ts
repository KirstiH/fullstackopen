import { NewPatientEntry, 
  Gender, 
  Diagnosis, 
  HealthCheckRating, 
  EntryWithoutId } from './types';
import { z } from 'zod';

export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  return newEntrySchema.parse(object);
};

export const toNewDiagnosisEntry = (object: unknown): EntryWithoutId => {
  return newDiagnosisEntrySchema.parse(object);
};


export const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> =>  {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis['code']>;
  }

  return object.diagnosisCodes as Array<Diagnosis['code']>;
};


export const newEntrySchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().date(),
  ssn: z.string(),
  gender: z.nativeEnum(Gender),
  occupation: z.string(),
});

// export const newDiagnosisEntrySchema = z.object({
//   date: z.string().date(),
//   specialist: z.string(),
//   description: z.string(),
//   diagnosisCodes: z.array(z.string()).optional(),
//   healthRating: z.nativeEnum(HealthCheckRating).optional(),
//   type: z.enum(['OccupationalHealthcare', 'HealthCheck', 'Hospital']),
//   employerName: z.string().optional(),
//   sickLeave: z.object({
//     startDate: z.string().date(),
//     endDate: z.string().date()
//   }).optional(),
//   discharge: z.object({
//     date: z.string().date(),
//     criteria: z.string()
//   }).optional()
// });

const baseEntry = z.object({
  description: z.string(),
  date: z.string().date(),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()).optional()
});

const healthCheckEntry = baseEntry.extend({
  type: z.literal("HealthCheck"),
  healthCheckRating: z.nativeEnum(HealthCheckRating)
});

const hospitalEntry = baseEntry.extend({
  type: z.literal("Hospital"),
  discharge: z.object({
    date: z.string().date(),
    criteria: z.string()
  })
});

const occupationalEntry = baseEntry.extend({
  type: z.literal("OccupationalHealthcare"),
  employerName: z.string(),
  sickLeave: z.object({
    startDate: z.string().date(),
    endDate: z.string().date()
  }).optional()
});

export const newDiagnosisEntrySchema = z.discriminatedUnion("type", [
  healthCheckEntry,
  hospitalEntry,
  occupationalEntry
]);


/**
 * 
 * entries: [
      {
        id: 'b4f4eca1-2aa7-4b13-9a18-4a5535c3c8da',
        date: '2019-10-20',
        specialist: 'MD House',
        type: 'HealthCheck',
        description: 'Yearly control visit. Cholesterol levels back to normal.',
        healthCheckRating: 0,
      },
      {
        id: 'fcd59fa6-c4b4-4fec-ac4d-df4fe1f85f62',
        date: '2019-09-10',
        specialist: 'MD House',
        type: 'OccupationalHealthcare',
        employerName: 'FBI',
        description: 'Prescriptions renewed.',
      }
 */


// const toNewPatientEntry = (object: unknown): NewPatientEntry => {
//   if ( !object || typeof object !== 'object' ) {
//     throw new Error('Incorrect or missing data');
//   }

//   if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object)  {    
//     const newEntry: NewPatientEntry = {
//         name: parseName(object.name),
//         dateOfBirth: parseDateOfBirth(object.dateOfBirth),
//         ssn: parseSsn(object.ssn),
//         gender: parseGender(object.gender),
//         occupation: parseOccupation(object.occupation)
//     };

//     return newEntry;
//   }

//   throw new Error('Incorrect data: some fields are missing');
//   };

// const parseName = (name: unknown): string => {
//   if (!name || !isString(name)) {
//     throw new Error('Incorrect or missing name');
//   }

//   return name;
// };

// const parseOccupation = (occupation: unknown): string => {
//   if (!occupation || !isString(occupation)) {
//     throw new Error('Incorrect or missing occupation');
//   }

//   return occupation;
// };

// const parseSsn = (ssn: unknown): string => {
//   if (!ssn || !isString(ssn)) {
//     throw new Error('Incorrect or missing ssn');
//   }

//   if (ssn.indexOf('-') !== 6) {
//     throw new Error('Incorrect or missing ssn');
//   }

//   return ssn;
// };

// const parseDateOfBirth = (dateofBirth: unknown): string => {
//   if (!dateofBirth || !isString(dateofBirth) || !isDate(dateofBirth)) {
//       throw new Error('Incorrect or missing date: ' + dateofBirth);
//   }
//   return dateofBirth;
// };

// const parseGender = (gender: unknown): Gender => {
//   if (!gender || !isString(gender) || !isGender(gender)) {
//       throw new Error('Incorrect or missing gender: ' + gender);
//   }
//   return gender;
// };

// const isGender = (param: string): param is Gender => {
//   return Object.values(Gender).map(v => v.toString()).includes(param);
// };

// const isString = (text: unknown): text is string => {
//   return typeof text === 'string' || text instanceof String;
// };

// const isDate = (date: string): boolean => {
//   return Boolean(Date.parse(date));
// };



export default toNewPatientEntry;

/**
 * import { NewDiaryEntry, Weather, Visibility } from './types';

const toNewDiaryEntry = (object: unknown): NewDiaryEntry => {
  if ( !object || typeof object !== 'object' ) {
    throw new Error('Incorrect or missing data');
  }

  if ('comment' in object && 'date' in object && 'weather' in object && 'visibility' in object)  {
    const newEntry: NewDiaryEntry = {
      weather: parseWeather(object.weather),
      visibility: parseVisibility(object.visibility),
      date: parseDate(object.date),
      comment: parseComment(object.comment)
    };

    return newEntry;
  }

  throw new Error('Incorrect data: some fields are missing');
};

const parseComment = (comment: unknown): string => {
  if (!comment || !isString(comment)) {
    throw new Error('Incorrect or missing comment');
  }

  return comment;
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
      throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const parseWeather = (weather: unknown): Weather => {
  if (!weather || !isString(weather) || !isWeather(weather)) {
      throw new Error('Incorrect or missing weather: ' + weather);
  }
  return weather;
};

const isWeather = (param: string): param is Weather => {
  return Object.values(Weather).map(v => v.toString()).includes(param);
};

const isVisibility = (param: string): param is Visibility => {
  return Object.values(Visibility).map(v => v.toString()).includes(param);
};

const parseVisibility = (visibility: unknown): Visibility => {
  // check !visibility removed:
  if (!isString(visibility) || !isVisibility(visibility)) {
      throw new Error('Incorrect visibility: ' + visibility);
  }
  return visibility;
};

export default toNewDiaryEntry;
 */