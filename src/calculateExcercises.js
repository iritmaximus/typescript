"use strict";
const calculateExcercises = (days, targetHoursPerDay) => {
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
const countTrainingDays = (days) => {
    let sum = 0;
    days.forEach(day => {
        if (day !== 0) {
            sum++;
        }
    });
    return sum;
};
const checkSuccess = (days, targetHoursPerDay) => {
    const average = calculateAverage(days);
    return (average >= targetHoursPerDay) ? true : false;
};
const calculateAverage = (days) => {
    let sum = 0;
    days.forEach(day => sum += day);
    return sum / days.length;
};
const calculateRating = (days, targetHoursPerDay) => {
    const average = calculateAverage(days);
    const ratingScore = average / targetHoursPerDay;
    if (ratingScore > 1.0) {
        // did more than required
        return { rating: 3, ratingDescription: "You overdid yourself" };
    }
    else if (ratingScore <= 1.0 && ratingScore > 0.9) {
        // did the required (or close to it)
        return { rating: 2, ratingDescription: "You did what you needed to do!" };
    }
    else {
        // did less
        return { rating: 1, ratingDescription: "Next time..." };
    }
};
const parseArgsExcercises = () => {
    const targetValue = process.argv[2];
    const daysValue = process.argv.splice(3, process.argv.length);
    console.log(targetValue, daysValue);
    try {
        if (!targetValue || !daysValue) {
            throw Error("No values given");
        }
        const target = parseInt(targetValue);
        const days = daysValue.map(day => {
            return parseInt(day);
        });
        return [target, days];
    }
    catch (e) {
        console.warn("No values given, defaulting to set values");
        return [2, [3, 0, 2, 4.5, 0, 3, 1]];
    }
};
const args = parseArgsExcercises();
console.log(calculateExcercises(args[1], args[0]));
