var calculateExcercises = function (days, targetHoursPerDay) {
    var periodLength = days.length;
    var trainingDays = countTrainingDays(days);
    var success = checkSuccess(days, targetHoursPerDay);
    var _a = calculateRating(days, targetHoursPerDay), rating = _a.rating, ratingDescription = _a.ratingDescription;
    var target = targetHoursPerDay;
    var average = calculateAverage(days);
    return {
        periodLength: periodLength,
        trainingDays: trainingDays,
        success: success,
        rating: rating,
        ratingDescription: ratingDescription,
        target: target,
        average: average
    };
};
var countTrainingDays = function (days) {
    var sum = 0;
    days.forEach(function (day) {
        if (day !== 0) {
            sum++;
        }
    });
    return sum;
};
var checkSuccess = function (days, targetHoursPerDay) {
    var average = calculateAverage(days);
    return (average >= targetHoursPerDay) ? true : false;
};
var calculateAverage = function (days) {
    var sum = 0;
    days.forEach(function (day) { return sum += day; });
    return sum / days.length;
};
var calculateRating = function (days, targetHoursPerDay) {
    var average = calculateAverage(days);
    var ratingScore = average / targetHoursPerDay;
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
var parseArgsExcercises = function () {
    var targetValue = process.argv[2];
    var daysValue = process.argv.splice(3, process.argv.length);
    console.log(targetValue, daysValue);
    try {
        if (!targetValue || !daysValue) {
            throw Error("No values given");
        }
        var target = parseInt(targetValue);
        var days = daysValue.map(function (day) {
            return parseInt(day);
        });
        return [target, days];
    }
    catch (e) {
        console.warn("No values given, defaulting to set values");
        return [2, [3, 0, 2, 4.5, 0, 3, 1]];
    }
};
var args = parseArgsExcercises();
console.log(calculateExcercises(args[1], args[0]));
