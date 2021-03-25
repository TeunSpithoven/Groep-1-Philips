var weight = document.getElementById("weight2");
var carbs = document.getElementById("carbs2");
var HtmlError = document.getElementById("error");
var Htmlcorrect = document.getElementById("correct");
var outputLabel = document.getElementById("bolusOutputLabel");
var button = document.getElementById("button");
// for unit testing, uncomment below
// export {InsulineTotalCalculation};
// export {BasalDoseCalculation};
// export {RatioCalculation};
// export {InsulineDoseCalculation} hugu;
// export {ValidateInput}
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
        if (returnRatio == 0 || returnRatio == null) {
            HtmlError.style.display = "block";
            Htmlcorrect.style.display = "none";
        }
        else {
            Htmlcorrect.style.display = "block";
            HtmlError.style.display = "none";
            outputLabel.innerHTML = String(returnUnits);
        }
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
