import { NewPatientEntry, Gender } from './types';
import { z } from 'zod';

export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  return newEntrySchema.parse(object);
};

export const newEntrySchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().date(),
  ssn: z.string(),
  gender: z.nativeEnum(Gender),
  occupation: z.string(),
});

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