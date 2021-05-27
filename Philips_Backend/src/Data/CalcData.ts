import "reflect-metadata";
import { getRepository } from "typeorm";
import {Calc} from "../entity/Calc";

export const AddCalcToDatabase = async (calc: Calc) =>{
    const calcRepo = getRepository(Calc);
    await calcRepo.save(calc).catch((err) => {
        console.log(err);
    });
    console.log("calc added with id = " + calc.Id);
}