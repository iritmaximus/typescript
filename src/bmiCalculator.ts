export type bmiValues = { height: number, weight: number };

export const calculateBmi = (values: bmiValues): string => {
    const bmi: number = values.weight / ((values.height / 100) ** 2);

    let category: string;
    if (bmi < 18.4) {
        category = "Underweight (unhealty weight)";
    } else if (bmi >= 18.5 && bmi < 24.9 ) {
        category = "Normal (healthy weight)";
    } else {
        category = "Overweight (unhealty weight)";
    }

    return category;
};


const parseArgs = (): bmiValues => {
    const height = process.argv[2];
    const weight = process.argv[3];

    try {
        if (!height || !weight) {
            throw Error("No values given");
        }
        return { height: parseInt(height), weight: parseInt(weight) };
    } catch (e) {
        console.warn("No values given, defaulting to the given ones");
        return { height: 180, weight: 74 };
    }
};

console.log(calculateBmi(parseArgs()));
