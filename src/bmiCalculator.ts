type bmiValues = { heigth: number, weigth: number }

const calculateBmi = (values: bmiValues): String => {
    const bmi: number = values.weigth / ((values.heigth / 100) ** 2);

    let category: String;
    if (bmi < 18.4) {
        category = "Underweight (unhealty weight)";
    } else if (bmi >= 18.5 && bmi < 24.9 ) {
        category = "Normal (healthy weight)";
    } else if ( bmi > 25) {
        category = "Overweight (unhealty weight)";
    }

    return category;
}


const parseArgs = (): bmiValues => {
    const heigth = process.argv[2];
    const weigth = process.argv[3];

    try {
        if (!heigth || !weigth) {
            throw Error("No values given")
        }
        return { heigth: parseInt(heigth), weigth: parseInt(weigth) };
    } catch (e) {
        console.warn("No values given, defaulting to the given ones");
        return { heigth: 180, weigth: 74 };
    }

}

console.log(calculateBmi(parseArgs()));
