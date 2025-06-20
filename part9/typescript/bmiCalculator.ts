interface bmiValues {
  value1: number;
  value2: number;
}

const parseArguments = (args: string[]): bmiValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3])
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

const calculateBmi = (height: number, mass: number) : object => {
  const heightInMeters = height / 100;
  const bmi = mass / (heightInMeters * heightInMeters);
  let result = '';

 
  if (bmi < 18.5) {
    result = 'Underweight';
  } else if (bmi < 25) {
    result = 'Normal range';
  } else {
    result = 'Overweight';
  }

  return {
    weight: mass,
    height: height,
    bmi: result
  };
};

try {
  if (require.main === module) {
    const { value1, value2 } = parseArguments(process.argv);
    const result = calculateBmi(value1, value2);
    console.log(result);
  }
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}

export default calculateBmi;