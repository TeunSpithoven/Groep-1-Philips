import express from "express";
import * as boluscalc from "./boluscalculation";
import "reflect-metadata";
import {createConnection} from "typeorm";
import {Calc} from "./entity/Calc";

const app = express();

app.get('/', (req, res) => {
  res.send('Hello from express and typescript')
})

app.get('/bolus/', async function (req, res) {

  var weight = (req.query.weight);
  var carbsOfMeal = (req.query.carbsOfMeal);

  var weightNum = Number(weight);
  var carbsOfMealNum = Number(carbsOfMeal);

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
    res.send(returnInsuline.toString());
  }
  else res.send("error")
  
});

createConnection().then(async connection => {

  console.log("Inserting a new user into the database...");
  const calc = new Calc();
  calc.weight = 80;
  calc.carbsOfMeal = 100;
  calc.date = 2;

  await connection.manager.save(calc);
  console.log("Saved a new user with id: " + calc.id);

  console.log("Loading users from the database...");
  //const calcs = await connection.manager.find(calc);
  console.log("Loaded users: ", calc);

  console.log("Here you can setup and run express/koa/any other framework.");

  const port = process.env.PORT || 3000;

  app.listen(port, () => console.log(`App listening on PORT ${port}`));

}).catch(error => console.log(error));