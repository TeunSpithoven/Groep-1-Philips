export function InsulineTotalCalculation(weight: number): number {
    //calculate the total daily needed insuline intake base on weight
    let insulineTotal: number = weight * 0.55;
    return insulineTotal;
  }
  
  export function BasalDoseCalculation(weight: number): number {
    // the basal dose is 50% of the daily intake
    let basalDose: number = InsulineTotalCalculation(weight) / 2;
    return basalDose;
  }
  
  export function RatioCalculation(weight: number): number {
    // calculates the amount of carbs per insuline unit
    let ratio: number = 500 / InsulineTotalCalculation(weight);
    ratio = Math.round((ratio + Number.EPSILON) * 100) / 100;
    return ratio;
  }
  
  export function InsulineDoseCalculation(weight: number, carbsOfMeal: number): number {
    // the insuline needed to be taken after the meal round off to 2 decimals
    let insulineDose: number = carbsOfMeal / RatioCalculation(weight);
    return Math.round(insulineDose);
  }

  export function ValidateInput(weight: number, carbsOfMeal: number) {
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