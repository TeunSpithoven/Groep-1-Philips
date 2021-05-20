import "reflect-metadata";
import { getRepository } from "typeorm";
import {Calc} from "./entity/Calc";


export const AddCalcToDatabase = async (calc: Calc) =>{
    const calcRepo = getRepository(Calc);
    await calcRepo.save(calc).catch((err) => {
        console.log(err);
    });
    console.log("calc added with id = " + calc.Id);
}
/*
export const function GetCalcFromDatabase: string{
    const calcRepo = getRepository(Calc);
    const calcs = calcRepo.find();
    //console.log(calcs);
    return JSON.stringify(calcs);
} */
export const GetCalcFromDatabase2 = async(): Promise<string> =>{
    const calcRepo = getRepository(Calc);
    const calcs = await calcRepo.find();
    //console.log(calcs);
    return JSON.stringify(calcs);
}