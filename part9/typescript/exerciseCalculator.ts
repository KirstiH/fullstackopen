interface exerciceValues {
  value1: number;
  value2: number[];
}

const parseArguments2 = (args: string[]): exerciceValues => {
  if (args.length < 4) throw new Error('Not enough arguments');

  let target = 0;
  let numbers = [];

  if (isNaN(Number(args[2]))) {
    throw new Error('Provided values were not numbers!');
  }
  else {
    target = Number(args[2]);
  }

  console.log('args length', args.length);
  for (let i = 3; i < args.length; i++) {
    console.log('i', i);
    if (isNaN(Number(args[i]))) {
      throw new Error('Provided values were not numbers!');
    }
    else {
      numbers.push(Number(args[i]));
    }
  } 

    console.log('target', target);
    console.log('numbers', numbers);

    return {
        value1: target,
        value2: numbers
    }

}


const exerciseCalculator = (target : number, numbers: number[]): Object => {
    let hours = 0;
    let trainingDays = 0;

    for (let i = 0; i < numbers.length; i++) {
        hours += numbers[i];
        if (numbers[i] > 0) {
            trainingDays++;
        }
    }

    let average = hours / numbers.length

    if (average < target - 1) {
        return {
            periodLength: numbers.length,
            trainingDays: trainingDays,
            success: false,
            rating: 1,
            ratingDescription: 'should have been better',
            target: target,
            average: average
        }
    }
    else if (average < target) {
        return {
            periodLength: numbers.length,
            trainingDays: trainingDays,
            success: false,
            rating: 2,
            ratingDescription: 'not too bad but could be better',
            target: target,
            average: average
        }
    }
    else {
        return {
            periodLength: numbers.length,
            trainingDays: trainingDays,
            success: true,
            rating: 3,
            ratingDescription: 'well done',
            target: target,
            average: average
        }
    }
}


try {
    const { value1, value2 } = parseArguments2(process.argv);
    const result = exerciseCalculator(value1, value2);
    console.log(result);
} catch (error: unknown) {
    let errorMessage = 'Something went wrong: '
    if (error instanceof Error) {
        errorMessage += error.message;
    }
    console.log(errorMessage);
}

// try {
//   const { value1, value2 } = parseArguments(process.argv);
//   const result = calculateBmi(value1, value2);
//   console.log(result);
// } catch (error: unknown) {
//   let errorMessage = 'Something bad happened.'
//   if (error instanceof Error) {
//     errorMessage += ' Error: ' + error.message;
//   }
//   console.log(errorMessage);
// }
