import express from 'express';
import qs from 'qs';
import calculateBmi from './bmiCalculator';
const app = express();


//http://localhost:3003/bmi?height=180&weight=72.

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

// app.get('/bmi', (_req, res) => {
//   res.send('you are too fat!');
// });

app.use('/bmi', (req, res, next) => {
  let query = req.originalUrl // /bmi?height=180&weight=72
  query = query.slice(query.indexOf('?') + 1)
  const parsed = qs.parse(query);

  // should inform user that parameters are missing
  if (isNaN(Number(parsed.height)) || isNaN(Number(parsed.weight)) || !parsed.height || !parsed.weight) {
    res.status(400).send({ error: 'malformatted parameters' });
  } else {
    let height = Number(parsed.height);
    let weight = Number(parsed.weight);
    const result = calculateBmi(height, weight);
    res.send(result);
    next()
  }
  
})

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});