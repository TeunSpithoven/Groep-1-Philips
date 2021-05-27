export class CalcModel {
    Id: number;
    Weight: number;
    CarbsOfMeal: number;
    InsulineDose: number;
    Date: Date;

    constructor(id: number, weight: number, carbsOfMeal: number, insulineDose: number, date: Date) {
        this.Id = id;
        this.Weight = weight;
        this.CarbsOfMeal = carbsOfMeal;
        this.InsulineDose = insulineDose;
        this.Date = date;
      }
}