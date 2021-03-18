var weight = document.getElementById("weight");
var carbs = document.getElementById("carbs");
var button = document.getElementById("button");
//export {InsulineDoseCalculation};
function ValidateInput(weight, carbsOfMeal) {
    if (weight > 450 || weight < 0.25 || carbsOfMeal < 1 || carbsOfMeal > 300) {
        return (null);
    }
    else {
    }
}

window.onload = function () {
    button.addEventListener("click", function () {
        console.log(InsulineDoseCalculation(parseFloat(weight.value), parseFloat(carbs.value)));
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
    return insulineDose.toFixed(0);
}
