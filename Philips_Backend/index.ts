import express from "express";
import * as boluscalc from "./boluscalculation";

const app = express();

app.get('/', (req, res) => {
  res.send('Hello from express and typescript')
})

function ValidateInput(weight: number, carbsOfMeal: number) {
  if (weight > 450 || weight < 0.25 || carbsOfMeal < 1 || carbsOfMeal > 300) {
    return (false);
  } else {
    if (weight >= 0.25 && carbsOfMeal > 1) {
      return (true);
    }
    else {
      return (false);
    }

  }
}

app.get('/bolus/', async function (req, res) {

  var weight = (req.query.weight);
  var carbsOfMeal = (req.query.carbsOfMeal);

  var weightNum = Number(weight);
  var carbsOfMealNum = Number(carbsOfMeal);

  console.log(weight);
  console.log(carbsOfMeal);

  // res.send(weight +" + "+ carbsOfMeal);

  //calculate the total daily needed insuline intake base on weight
  let insulineTotal: number = weightNum * 0.55;

  // calculates the amount of carbs per insuline unit
  let ratio: number = 500 / insulineTotal;

  // the insuline needed to be taken after the meal round off to 2 decimals
  let insulineDose: number = carbsOfMealNum / ratio;

  var returnInsuline = Math.round(insulineDose);

  if (ValidateInput(weightNum, carbsOfMealNum)){
    res.send(returnInsuline.toString());
  }
  else res.send("error")
  
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`App listening on PORT ${port}`));