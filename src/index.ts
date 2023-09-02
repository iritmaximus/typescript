import express from "express";

import { calculateBmi, bmiValues } from "./bmiCalculator";
import { calculateExercises, exerciseData } from "./calculateExercises";

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get("/", (_req, res) => {
  res.send("Hello Fullstack");
});

app.get("/bmi", (req, res) => {
  const { height, weight } = req.query;
  if (!height || !weight) {
    res.send("No parameters given");
    return;
  }

  if (typeof height === "string"  && typeof weight === "string") {
    try {
      const bmi: bmiValues = { 
        height: parseInt(height), 
        weight: parseInt(weight) 
      };
      const result = calculateBmi(bmi);
      res.send({
        height,
        weight,
        result
      });
      return;
    } catch (e) {
      res.status(404).send("Malformatted parameters");
      return;
    }
  }
});

type exerciseBody = {
    daily_exercises: number[],
    target: number
};

app.post("/exercises", (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const body: exerciseBody = req.body; 

    if (!body) {
        console.error(body);
        res.status(404).json({"error": "No body given" });
        return;
    }

    if (!body.daily_exercises || !body.target) {
        res.status(404).json({"error": "Incorrect parameters"});
    }

    try {
        const exerciseResult: exerciseData = calculateExercises(body.daily_exercises, body.target);
        res.send(exerciseResult);
    } catch (e) {
        res.status(404).json({"error": "malformatted data"});
    }

});

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
