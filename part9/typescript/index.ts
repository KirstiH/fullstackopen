import express from 'express';
import qs from 'qs';
import calculateBmi from './bmiCalculator';
import { exerciseCalculator } from './exerciseCalculator';
const app = express();

app.use(express.json());


app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});


app.use('/bmi', (req, res, next) => {
  let query = req.originalUrl; // /bmi?height=180&weight=72
  query = query.slice(query.indexOf('?') + 1);
  const parsed = qs.parse(query);

  // should inform user that parameters are malformatted
  if (isNaN(Number(parsed.height)) || isNaN(Number(parsed.weight)) || !parsed.height || !parsed.weight) {
    res.status(400).send({ error: 'malformatted parameters' });
  } else {
    const height = Number(parsed.height);
    const weight = Number(parsed.weight);
    const result = calculateBmi(height, weight);
    res.send(result);
    next();
  }
  
});

// {
  // "daily_exercises": [1, 0, 2, 0, 3, 0, 2.5],
  // "target": 2.5
// }
app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body as {
    daily_exercises: number[];
    target: number;
  };

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (!daily_exercises || !target) {
    res.status(400).send({ error: 'parameters missing' });
    return;
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (isNaN(Number(target))) {
    res.status(400).send({ error: 'malformatted parameters' });
    return;
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  for (let i = 0; i < daily_exercises.length; i++) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (isNaN(Number(daily_exercises[i]))) {
      res.status(400).send({ error: 'malformatted parameters' });
      return;
    }
  }
  

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const result = exerciseCalculator(
    target, daily_exercises
  );

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  res.send({ result });
  return;

});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});