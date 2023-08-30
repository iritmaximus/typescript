var calculateBmi = function (values) {
    var bmi = values.weigth / (Math.pow((values.heigth / 100), 2));
    var category;
    if (bmi < 18.4) {
        category = "Underweight (unhealty weight)";
    }
    else if (bmi >= 18.5 && bmi < 24.9) {
        category = "Normal (healthy weight)";
    }
    else if (bmi > 25) {
        category = "Overweight (unhealty weight)";
    }
    return category;
};
var parseArgs = function () {
    var heigth = process.argv[2];
    var weigth = process.argv[3];
    try {
        if (!heigth || !weigth) {
            throw Error("No values given");
        }
        return { heigth: parseInt(heigth), weigth: parseInt(weigth) };
    }
    catch (e) {
        console.warn("No values given, defaulting to the given ones");
        return { heigth: 180, weigth: 74 };
    }
};
console.log(calculateBmi(parseArgs()));
