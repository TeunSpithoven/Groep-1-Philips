let weight = (<HTMLInputElement>document.getElementById("weight"));
let carbs = (<HTMLInputElement>document.getElementById("carbs"));
const button = document.getElementById("button");
//export {InsulineDoseCalculation};



function ValidateInput(weight: number, carbsOfMeal: number){
    if (weight > 450 || weight < 0.25 || carbsOfMeal < 1 || carbsOfMeal > 300){
        return (false);
	}

    else{
        return (true);
    }
}

window.onload=function(){
    button.addEventListener("click", function() {
        console.log("Het aantal units dat u nodig heeft is " + InsulineDoseCalculation(parseFloat(weight.value), parseFloat(carbs.value)));
        console.log("Het totaal insuline aantal wat u nodig heeft is " + InsulineTotalCalculation(parseFloat(weight.value)));
        });
  }



function InsulineTotalCalculation(weight: number){
        //calculate the total daily needed insuline intake base on weight
        let insulineTotal: number = weight * 0.55;
        return insulineTotal.toFixed(1);
}

function BasalDoseCalculation(weight: number){
        // the basal dose is 50% of the daily intake
        let basalDose: number = InsulineTotalCalculation(weight) / 2;
        return basalDose;
}

function RatioCalculation(weight: number){
        // calculates the amount of carbs per insuline unit
        let ratio: number = 500  /  InsulineTotalCalculation(weight);
        return ratio;
}

function InsulineDoseCalculation(weight: number, carbsOfMeal: number){
        // the insuline needed to be taken after the meal round off to 2 decimals
		let insulineDose: number = carbsOfMeal / RatioCalculation(weight);
        return insulineDose.toFixed(0);
}

  

  
