import express from "express";
import * as boluscalc from "./boluscalculation";
import "reflect-metadata";
import { Calc } from "./entity/Calc";
import * as CalcData from "./Data/CalcData";
import * as UserData from "./Data/UserData";
import { createConnection } from "typeorm";
import { getRepository } from "typeorm";
import { User } from "./entity/User";

const app = express();

app.get('/', (req, res) => {
  res.send('Hello from express and typescript')
});

app.get('/GetCalc', async function (req, res) {
  var userId = String(req.query.userId);
  console.log(userId);
  const calcRepo = getRepository(Calc);
  const calcs = await calcRepo.find({ where: { UserId: userId }});
  //console.log(calcs);
  res.send(calcs);
})

app.get('/bolus/', async function (req, res) {

  var weight = (req.query.weight);
  var carbsOfMeal = (req.query.carbsOfMeal);
  var userId = String(req.query.userId);

  var weightNum = Number(weight);
  var carbsOfMealNum = Number(carbsOfMeal);
  var valid: boolean = true;

  //log the inputs that the backend recived
  console.log(weight);
  console.log(carbsOfMeal);

  // the insuline needed to be taken after the meal round off to 2 decimals
  let insulineDose = boluscalc.InsulineDoseCalculation(weightNum, carbsOfMealNum);

  var returnInsuline = Math.round(insulineDose);

  if (boluscalc.ValidateInput(weightNum, carbsOfMealNum)) {
    const calc = new Calc();
    calc.Weight = weightNum;
    calc.CarbsOfMeal = carbsOfMealNum;
    calc.InsulineDose = returnInsuline;
    calc.UserId = userId;
    valid = true;
    CalcData.AddCalcToDatabase(calc);
  }
  else {
    valid = false;
  }
  res.send(JSON.stringify({ "insulineDose": `${returnInsuline}`, "valid": `${valid}` }));
});

app.get('/Register/', async function (req, res) {
  var valid: boolean = false;
  var role = (req.query.role);
  var username = (req.query.name);
  var password = (req.query.password);

  var roleNumber = Number(role);
  var usernameString = String(username);
  var passwordString = String(password);

  // CHECK IF THE USERNAME IS ALREADY IN USE

  const user = new User();
  user.Username = usernameString;
  user.Password = passwordString;
  user.Role = roleNumber;
  UserData.AddUserToDatabase(user);
  valid = true;

  res.send(JSON.stringify({ "valid": `${valid}` }));
});

app.get('/Login/', async function (req, res) {
  // in: username, password
  var _username = (req.query.name);
  var _password = (req.query.password);
  var username = String(_username);
  var password = String(_password);
  var valid: boolean = false;

  const userRepo = getRepository(User);
  const users = await userRepo.find({ where: [{ Username: username }, { Password: password }] });
  // out: id, username, password
  var user = users[0];
  if (user != undefined) {
    if (user.Password == password) {
      valid = true;
      res.send(JSON.stringify({ "valid": `${valid}`, "Id": `${user.Id}`, "Username": `${user.Username}`, "Role": `${user.Role}`, }));
    }
  }
  else {
    res.send(JSON.stringify({ "valid": `${valid}` }));
  }
});

createConnection().then(async connection => {

  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`App listening on PORT ${port}`));

}).catch(error => console.log(error));
