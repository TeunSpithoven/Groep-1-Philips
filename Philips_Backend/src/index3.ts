import "reflect-metadata";
import {createConnection} from "typeorm";
import {Calc} from "./entity/Calc";

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

}).catch(error => console.log(error));
