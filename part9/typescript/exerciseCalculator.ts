const exerciseCalculator = (dailyHours: number[], target: number): Object => {
    let hours = 0;
    let trainingDays = 0;

    for (let i = 0; i < dailyHours.length; i++) {
        hours += dailyHours[i];
        if (dailyHours[i] > 0) {
            trainingDays++;
        }
    }

    let average = hours / dailyHours.length

    if (average < target - 1) {
        return {
            periodLength: dailyHours.length,
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
            periodLength: dailyHours.length,
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
            periodLength: dailyHours.length,
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
    const result =exerciseCalculator([3, 0, 2, 4.5, 0, 3, 1], 3);
    console.log(result);
} catch (error: unknown) {
    let errorMessage = 'Something went wrong: '
    if (error instanceof Error) {
        errorMessage += error.message;
    }
    console.log(errorMessage);
}
