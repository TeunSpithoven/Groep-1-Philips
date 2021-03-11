let weight = ( < HTMLInputElement > document.getElementById("weight"));
let carbs = ( < HTMLInputElement > document.getElementById("carbs"));
const button = document.getElementById("button");
//export {InsulineDoseCalculation};



function ValidateInput(weight: number, carbsOfMeal: number) {
    if (weight > 450 || weight < 0.25 || carbsOfMeal < 1 || carbsOfMeal > 300) {
        return (false);
    } else {
        return (true);
    }
}

window.onload = function () {
    button.addEventListener("click", function () {

        let returnUnits: number = InsulineDoseCalculation(parseFloat(weight.value), parseFloat(carbs.value));
        let returnInsulineTotal: number = Math.round(InsulineTotalCalculation(parseFloat(weight.value)));
        let returnBasalDose: number = Math.round(BasalDoseCalculation(parseFloat(weight.value)));
        let returnRatio : number = Math.round(RatioCalculation(parseFloat(weight.value)));

        console.log("Het aantal units dat u nodig heeft is " + returnUnits);
        console.log("Het totaal insuline aantal wat u nodig heeft is " + returnInsulineTotal);
        console.log("Uw basale dosus is " + returnBasalDose);
        console.log(returnRatio);

    });
}



function InsulineTotalCalculation(weight: number): number {
    //calculate the total daily needed insuline intake base on weight
    let insulineTotal: number = weight * 0.55;
    return insulineTotal;
}

function BasalDoseCalculation(weight: number): number {
    // the basal dose is 50% of the daily intake
    let basalDose: number = InsulineTotalCalculation(weight) / 2;
    return basalDose;
}

function RatioCalculation(weight: number): number {
    // calculates the amount of carbs per insuline unit
    let ratio: number = 500 / InsulineTotalCalculation(weight);
    return ratio;
}

function InsulineDoseCalculation(weight: number, carbsOfMeal: number): number {
    // the insuline needed to be taken after the meal round off to 2 decimals
    let insulineDose: number = carbsOfMeal / RatioCalculation(weight);
    return Math.round(insulineDose);
}