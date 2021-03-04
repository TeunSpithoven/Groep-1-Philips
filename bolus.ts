// function for calculating the insuline units to take after a meal based on the meal and the patiënts weight
function BolusCalculation(weight: number, carbsOfMeal: number):number{

    // checking if inputs are legitimate
    if (weight > 450 || weight < 0.25 || carbsOfMeal < 1){
        error();
	}
	
    else{
        //calculate the total daily needed insuline intake base on weight
        let insulineTotal: number = weight * 0.55;
        //console.log("Total daily insuline needed = " + insulineTotal" + ".")

        // the basal dose is 50% of the daily intake, this will be printed to the console
        let basalDose: number = insulineTotal / 2;
        //console.log(basalDose);

        // calculates the amount of carbs per insuline unit
        let ratio: number = 500  /  insulineTotal;
        
        // the insuline needed to be taken after the meal round off to 2 decimals
		let insulineDose: number = carbsOfMeal / ratio;
        return insulineDose;
    }
}

function error() : void{
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

const button = document.querySelector("button");
const bolusOutput = document.getElementById("bolusOutput");

// button.addEventListener("click", function() {
//     let weight = document.getElementById("weight");
//     let carbs = document.getElementById("carbs");
//     console.log(BolusCalculation(weight.value, carbs.value));
	
//     let bolusOutput.value = BolusCalculation(weight.value, carbs.value);
//   });
  
button.addEventListener("click", function() {
    let weight = (<HTMLInputElement>document.getElementById("weight")).value;
    let carbs = (<HTMLInputElement>document.getElementById("carbs")).value;
    let returnBolus: number = BolusCalculation(parseFloat(weight), parseFloat(carbs));
    console.log(returnBolus.toFixed(2));

    var bolusOutputFormula = BolusCalculation(parseFloat(weight), parseFloat(carbs));

});