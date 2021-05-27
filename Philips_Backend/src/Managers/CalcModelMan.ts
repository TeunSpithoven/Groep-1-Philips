import { AddCalcToDatabase } from "../Data/CalcData";
import { Calc } from "../entity/Calc";

export class CalcModelMan{
    Create(calc: Calc){
        AddCalcToDatabase(calc);
    }
}