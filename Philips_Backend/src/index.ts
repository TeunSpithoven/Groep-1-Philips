import express from "express";
import * as boluscalc from "./boluscalculation";
import "reflect-metadata";
import {Calc} from "./entity/Calc";
import { AddCalcToDatabase } from "./DatabaseHandler";
import { createConnection } from "typeorm";



const app = express();

app.get('/', (req, res) => {
  res.send('Hello from express and typescript')
});

app.get('/jsontest', (req, res) => {
  var Name = Boolean(true);
  res.send(JSON.stringify({"firstName":`${Name}`, "lastName":"Doe"}));
});


app.get('/bolus/', async function (req, res) {

  var weight = (req.query.weight);
  var carbsOfMeal = (req.query.carbsOfMeal);

  var weightNum = Number(weight);
  var carbsOfMealNum = Number(carbsOfMeal);
  var valid: boolean;

  //log the inputs that the backend recived
  console.log(weight);
  console.log(carbsOfMeal);

  //calculate the total daily needed insuline intake base on weight
  let insulineTotal = boluscalc.InsulineTotalCalculation(weightNum);

  // calculates the amount of carbs per insuline unit
  let ratio =  boluscalc.RatioCalculation(weightNum);

  // the insuline needed to be taken after the meal round off to 2 decimals
  let insulineDose = boluscalc.InsulineDoseCalculation(weightNum, carbsOfMealNum);

  var returnInsuline = Math.round(insulineDose);

  if (boluscalc.ValidateInput(weightNum, carbsOfMealNum)){
    const calc = new Calc();
    calc.Weight = weightNum;
    calc.CarbsOfMeal = carbsOfMealNum;
    calc.InsulineDose = returnInsuline;
    valid = true;
    AddCalcToDatabase(calc);
  }
  res.send(JSON.stringify({"insulineDose":`${returnInsuline}`, "valid":`${valid}` }));
});

createConnection().then(async connection => {
      
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`App listening on PORT ${port}`));

}).catch(error => console.log(error));
