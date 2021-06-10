import express from "express";
import * as boluscalc from "./boluscalculation";
import "reflect-metadata";
import { Calc } from "./entity/Calc";
import * as CalcData from "./Data/CalcData";
import * as UserData from "./Data/UserData";
import { createConnection, createQueryBuilder } from "typeorm";
import { getRepository } from "typeorm";
import { User } from "./entity/User";
import cors from "cors"

const app = express();
app.use(cors());

app.get('/', (req, res) => {
  res.send('Proftaak groep 1 API')
});

app.get('/GetCalc', async function (req, res) {
  var userId = String(req.query.userId);
  const calcRepo = getRepository(Calc);
  const calcs = await calcRepo.find({ where: { UserId: userId } });
  res.send(calcs);
})

app.get('/bolus/', async function (req, res) {

  var weight = (req.query.weight);
  var carbsOfMeal = (req.query.carbsOfMeal);
  var userId = String(req.query.userId);

  var weightNum = Number(weight);
  var carbsOfMealNum = Number(carbsOfMeal);
  var valid: boolean = true;

  // the insuline needed to be taken after the meal round off to 2 decimals
  let insulineDose = boluscalc.InsulineDoseCalculation(weightNum, carbsOfMealNum);

  var returnInsuline = Math.round(insulineDose);

  if (boluscalc.ValidateInput(weightNum, carbsOfMealNum)) {
    const calc = new Calc();
    calc.Weight = weightNum;
    calc.CarbsOfMeal = carbsOfMealNum;
    calc.InsulineDose = returnInsuline;
    calc.UserId = userId;
    calc.date = new Date().toJSON().slice(0,10);
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
  
  var role = Number(req.query.role);
  var username = String(req.query.name);
  var password = String(req.query.password);

  const UserRepo = getRepository(User);
  var users = await UserRepo.find({ where: { Username: username } });

  if (users.length != 0 || username == "" || password == ""){
    valid = false;
  }
  else {
    const user = new User();
    user.Username = username;
    user.Password = password;
    user.Role = role;
    UserData.AddUserToDatabase(user);
    valid = true;
  }

  res.send(JSON.stringify({ "valid": `${valid}` }));
});

app.get('/Login/', async function (req, res) {
  // in: username, password
  var username = String(req.query.username);
  var password = String(req.query.password);
  var valid: boolean = false;

  const userRepo = getRepository(User)
  const users = await userRepo.find({ where: { Username: username} });
  const user = users[0];

  // dit hier onder kan korter namelijk: 
  if(user != undefined && user.Password == password){
    valid = true;
      res.send(JSON.stringify({ "valid": `${valid}`, "Id": `${user.Id}`, "Username": `${user.Username}`, "Role": `${user.Role}`, }));
  }else{
    res.send(JSON.stringify({ "valid": `${valid}` }));
  }
});

createConnection().then(async connection => {

  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`App listening on PORT ${port}`));

}).catch(error => console.log(error));
