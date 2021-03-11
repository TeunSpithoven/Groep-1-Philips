var weight = document.getElementById("weight");
var carbs = document.getElementById("carbs");
var button = document.getElementById("button");
// export {BolusCalculation};
function BolusCalculation(weight, carbsOfMeal) {
    if (weight > 450 || weight < 0.25 || carbsOfMeal < 1) {
        return ("Are you sure you entered the right information?");
    }
    else {
        //calculate the total daily needed insuline intake base on weight
        var insulineTotal = weight * 0.55;
        // the basal dose is 50% of the daily intake
        var basalDose = insulineTotal / 2;
        // calculates the amount of carbs per insuline unit
        var ratio = 500 / insulineTotal;
        // the insuline needed to be taken after the meal round off to 2 decimals
        var insulineDose = carbsOfMeal / ratio;
        return insulineDose.toFixed(2);
    }
}
window.onload = function () {
    button.addEventListener("click", function () {
        console.log(BolusCalculation(parseFloat(weight.value), parseFloat(carbs.value)));
    });
};
