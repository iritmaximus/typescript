export interface exerciseData {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

export const calculateExercises = (days: number[], targetHoursPerDay: number): exerciseData => {
    const periodLength = days.length;
    const trainingDays = countTrainingDays(days);
    const success = checkSuccess(days, targetHoursPerDay);
    const { rating, ratingDescription } = calculateRating(days, targetHoursPerDay);
    const target = targetHoursPerDay;
    const average = calculateAverage(days);

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    };
};

const countTrainingDays = (days: number[]): number =>  {
    let sum = 0;
    days.forEach(day => {
        if (day !== 0) {
            sum++;
        }
    });
    return sum;
};

const checkSuccess = (days: number[], targetHoursPerDay: number): boolean => {
    const average = calculateAverage(days);
    return (average >= targetHoursPerDay) ? true : false;
};

const calculateAverage = (days: number[]): number => {
    let sum = 0;
    days.forEach(day => sum += day);

    return sum / days.length;
};

type Rating = {
    rating: number,
    ratingDescription: string
};

const calculateRating = (days: number[], targetHoursPerDay: number): Rating => {
    const average = calculateAverage(days);
    const ratingScore = average / targetHoursPerDay;
    if (ratingScore > 1.0) {
        // did more than required
        return { rating: 3, ratingDescription: "You overdid yourself"};
    } else if (ratingScore <= 1.0 && ratingScore > 0.9) {
        // did the required (or close to it)
        return { rating: 2, ratingDescription: "You did what you needed to do!"};
    } else {
        // did less
        return { rating: 1, ratingDescription: "Next time..."};
    }
};

const parseArgsExercises = (): [number, number[]] => {
    const targetValue: string = process.argv[2];
    const daysValue: string[] = process.argv.splice(3, process.argv.length);

    try {
        if (!targetValue || !daysValue) {
            throw Error("No values given");
        }
        const target: number = parseInt(targetValue);
        const days: number[] = daysValue.map(day => {
            return parseInt(day);
        });
        return [target, days];
    } catch (e) {
        console.warn("No values given, defaulting to set values");
        return [2, [3, 0, 2, 4.5, 0, 3, 1]];
    }
};

const args = parseArgsExercises();
console.log(calculateExercises(args[1], args[0]));
