var weight = document.getElementById("weight");
var carbs = document.getElementById("carbs");
var button = document.getElementById("button");
//export {InsulineDoseCalculation};
function ValidateInput(weight, carbsOfMeal) {
    if (weight > 450 || weight < 0.25 || carbsOfMeal < 1 || carbsOfMeal > 300) {
        return (false);
    }
    else {
        return (true);
    }
}
window.onload = function () {
    button.addEventListener("click", function () {
        var returnUnits = InsulineDoseCalculation(parseFloat(weight.value), parseFloat(carbs.value));
        var returnInsulineTotal = Math.round(InsulineTotalCalculation(parseFloat(weight.value)));
        var returnBasalDose = Math.round(BasalDoseCalculation(parseFloat(weight.value)));
        var returnRatio = Math.round(RatioCalculation(parseFloat(weight.value)));
        console.log("Het aantal units dat u nodig heeft is " + returnUnits);
        console.log("Het totaal insuline aantal wat u nodig heeft is " + returnInsulineTotal);
        console.log("Uw basale dosus is " + returnBasalDose);
        console.log(returnRatio);
    });
};
function InsulineTotalCalculation(weight) {
    //calculate the total daily needed insuline intake base on weight
    var insulineTotal = weight * 0.55;
    return insulineTotal;
}
function BasalDoseCalculation(weight) {
    // the basal dose is 50% of the daily intake
    var basalDose = InsulineTotalCalculation(weight) / 2;
    return basalDose;
}
function RatioCalculation(weight) {
    // calculates the amount of carbs per insuline unit
    var ratio = 500 / InsulineTotalCalculation(weight);
    return ratio;
}
function InsulineDoseCalculation(weight, carbsOfMeal) {
    // the insuline needed to be taken after the meal round off to 2 decimals
    var insulineDose = carbsOfMeal / RatioCalculation(weight);
    return Math.round(insulineDose);
}
