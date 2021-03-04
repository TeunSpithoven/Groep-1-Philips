// function for calculating the insuline units to take after a meal based on the meal and the patiënts weight
function BolusCalculation(weight, carbsOfMeal) {
    // checking if inputs are legitimate
    if (weight > 450 || weight < 0.25 || carbsOfMeal < 1) {
        error();
    }
    else {
        //calculate the total daily needed insuline intake base on weight
        var insulineTotal = weight * 0.55;
        //console.log("Total daily insuline needed = " + insulineTotal" + ".")
        // the basal dose is 50% of the daily intake, this will be printed to the console
        var basalDose = insulineTotal / 2;
        //console.log(basalDose);
        // calculates the amount of carbs per insuline unit
        var ratio = 500 / insulineTotal;
        // the insuline needed to be taken after the meal round off to 2 decimals
        var insulineDose = carbsOfMeal / ratio;
        return insulineDose;
    }
}
function error() {
    return console.log("Are you sure you entered the right information?");
}
// function for 
/*function TakeInputsAndRunFunction(){
    let weight = document.getElementById("weight");
    let carbs = document.getElementById("carbs");
    BolusCalculation(weight, carbs);
    
} */
// button.addEventListener("click", BolusCalculation);
// define the elements on the html page and run the function when the button is pressed
var button = document.querySelector("button");
var bolusOutput = document.getElementById("bolusOutput");
// button.addEventListener("click", function() {
//     let weight = document.getElementById("weight");
//     let carbs = document.getElementById("carbs");
//     console.log(BolusCalculation(weight.value, carbs.value));
//     let bolusOutput.value = BolusCalculation(weight.value, carbs.value);
//   });
button.addEventListener("click", function () {
    var weight = document.getElementById("weight").value;
    var carbs = document.getElementById("carbs").value;
    var returnBolus = BolusCalculation(parseFloat(weight), parseFloat(carbs));
    console.log(returnBolus.toFixed(2));
    var bolusOutputFormula = BolusCalculation(parseFloat(weight), parseFloat(carbs));
});
